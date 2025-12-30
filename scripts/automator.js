import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function runCommand(command) {
    console.log(`Running: ${command}`);
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stdout) console.log(stdout.trim());
        if (stderr) console.error(stderr.trim());
        return stdout.trim();
    } catch (error) {
        console.error(`Error executing ${command}:`, error.message);
        throw error;
    }
}


async function processFeature(feature) {
    console.log(`Processing feature: ${feature.name}`);

    for (const branch of feature.branches) {
        console.log(`Processing branch: ${branch.name}`);

        // Checkout main and pull latest
        await runCommand('git checkout main');
        await runCommand('git pull origin main');

        // Create new branch
        await runCommand(`git checkout -b ${branch.name}`);

        for (const commit of branch.commits) {
            await processCommit(commit);
        }

        // Push branch
        await runCommand(`git push -u origin ${branch.name}`);

        // Create PR
        await createPR(branch);

        // Merge PR (optional, based on requirement "Auto-merge all PRs")
        await mergePR(branch);
    }
}

async function main() {
    const manifestPath = process.argv[2];
    if (!manifestPath) {
        console.error("Please provide a manifest file path");
        process.exit(1);
    }

    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);

    for (const feature of manifest.features) {
        await processFeature(feature);
    }
}

main().catch(console.error);
