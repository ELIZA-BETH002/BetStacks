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


async function main() {
    console.log('Starting automation...');
}

main().catch(console.error);
