import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function main() {
  console.log('Starting automation...');
}

main().catch(console.error);
