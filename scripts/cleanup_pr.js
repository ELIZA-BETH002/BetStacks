import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runCommand(command, ignoreError = false) {
    try {
        const { stdout } = await execAsync(command);
        return stdout.trim();
    } catch (error) {
        if (!ignoreError) {
            console.error(`Error running ${command}: ${error.message}`);
        }
        return '';
    }
}

async function main() {
    console.log('Starting cleanup...');

    // Get all remote branches
    console.log('Fetching branches...');
    await runCommand('git fetch --all');
    const branchesOutput = await runCommand('git branch -r');

    const branches = branchesOutput.split('\n')
        .map(b => b.trim())
        .filter(b => b.startsWith('origin/') && !b.includes('origin/main') && !b.includes('HEAD'))
        .map(b => b.replace('origin/', ''));

    console.log(`Found ${branches.length} branches to process.`);

    for (const branch of branches) {
        console.log(`Processing ${branch}...`);

        // Check if PR exists
        // gh pr list --head branch --json state
        const prListOut = await runCommand(`gh pr list --head ${branch} --json state,number`, true);
        let prNumber = null;

        if (prListOut) {
            try {
                const json = JSON.parse(prListOut);
                if (json.length > 0) {
                    prNumber = json[0].number;
                    console.log(`Found existing PR #${prNumber} for ${branch}`);
                }
            } catch (e) {
                console.error('Error parsing PR list json', e);
            }
        }

        if (!prNumber) {
            console.log(`Creating PR for ${branch}...`);
            try {
                await runCommand(`gh pr create --title "feat: merge ${branch}" --body "Automated merge" --head ${branch} --base main`);
                // Get the new PR number
                const newPrParams = await runCommand(`gh pr list --head ${branch} --json number`, true);
                if (newPrParams) {
                    const json = JSON.parse(newPrParams);
                    if (json.length > 0) prNumber = json[0].number;
                }
            } catch (e) {
                console.log(`Failed to create PR for ${branch} (might already exist or be merged/closed): ${e.message}`);
            }
        }

        if (prNumber) {
            console.log(`Merging PR #${prNumber}...`);
            await runCommand(`gh pr merge ${prNumber} --merge --delete-branch`);
        } else {
            // If no PR number, maybe it was already merged or closed, try deleting the remote branch just in case it's lingering
            console.log(`No active PR found. Attempting to delete remote branch ${branch} directly if merged...`);
            await runCommand(`git push origin --delete ${branch}`, true);
        }
    }

    console.log('Cleanup complete.');
}

main().catch(console.error);
