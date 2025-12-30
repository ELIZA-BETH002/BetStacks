# Automation Scripts

This folder contains scripts to automate the generation of branches, commits, and PRs to reach high activity targets.

## Usage

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Manifest**:
   The manifest defines the work to be done.
   ```bash
   node scripts/generate_manifest.js
   ```
   This creates `manifest.json`.

3. **Run Automation**:
   ```bash
   node scripts/automator.js manifest.json
   ```
   This will execute the defined features, creating branches, pushes, PRs, and merges.

## Reaching 750+ Commits

The default `manifest.json` generates ~350 commits. To reach 750+:

1. Run the extra generator:
   ```bash
   node scripts/generate_manifest_extra.js
   ```
2. Run automation on the extra manifest:
   ```bash
   node scripts/automator.js manifest_extra.json
   ```

## Files
- `automator.js`: The main logic for git operations and GitHub CLI interaction.
- `generate_manifest.js`: Generates the initial set of features (Stacks, WalletConnect, UI, etc.).
- `generate_manifest_extra.js`: Generates additional dummy features for volume.
