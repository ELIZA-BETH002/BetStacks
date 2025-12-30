const fs = require('fs');

const manifest = {
    features: []
};

// Helper to create commits
function createCommitsForFile(filename, contentParts, messagePrefix) {
    return contentParts.map((part, index) => ({
        file: filename,
        content: part,
        append: index > 0,
        message: `${messagePrefix} part ${index + 1}`
    }));
}

// 1. Wallet Connect Feature
const walletConnectFeature = {
    name: "wallet-connect",
    branches: []
};

// Create 5 branches for wallet connect
for (let i = 1; i <= 5; i++) {
    walletConnectFeature.branches.push({
        name: `feat/wallet-connect-part-${i}`,
        commits: [
            {
                file: `src/wallet/config-${i}.ts`,
                content: `// Wallet connect config part ${i}\nexport const config${i} = {};`,
                message: `feat: add wallet config ${i}`
            },
            {
                file: `src/wallet/config-${i}.ts`,
                content: `\n// Additional settings`,
                append: true,
                message: `feat: update wallet config ${i}`
            }
        ],
        pr_title: `feat: Wallet Connect Part ${i}`,
        pr_body: `Implementation of wallet connect part ${i}`
    });
}
manifest.features.push(walletConnectFeature);

// 2. Add 80 features/branches total
for (let f = 1; f <= 10; f++) {
    const feature = {
        name: `feature-set-${f}`,
        branches: []
    };

    for (let b = 1; b <= 8; b++) {
        feature.branches.push({
            name: `feat/set-${f}-branch-${b}`,
            commits: [
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `# Documentation for Feature ${f} - Section ${b}\n`,
                    message: `docs: create file for ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `## Overview\nThis is the overview.\n`,
                    append: true,
                    message: `docs: add overview to ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `## Section 1\nDetails about section 1.\n`,
                    append: true,
                    message: `docs: add section 1 to ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `## Section 2\nDetails about section 2.\n`,
                    append: true,
                    message: `docs: add section 2 to ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `## Examples\n\`\`\`js\nconst x = 1;\n\`\`\`\n`,
                    append: true,
                    message: `docs: add examples to ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `![Diagram](diagram.png)\n`,
                    append: true,
                    message: `docs: add diagram placeholder to ${f}-${b}`
                },
                {
                    file: `tests/feature-${f}/test-${b}.test.ts`,
                    content: `import { describe, it, expect } from 'vitest';\n`,
                    message: `test: setup test file for ${f}-${b}`
                },
                {
                    file: `tests/feature-${f}/test-${b}.test.ts`,
                    content: `describe('Feature ${f} - ${b}', () => {\n`,
                    append: true,
                    message: `test: add describe block for ${f}-${b}`
                },
                {
                    file: `tests/feature-${f}/test-${b}.test.ts`,
                    content: `  it('should work', () => {\n    expect(true).toBe(true);\n  });\n});`,
                    append: true,
                    message: `test: add test case for ${f}-${b}`
                }
            ],
            pr_title: `feat: Feature Set ${f} Branch ${b}`,
            pr_body: `Automated PR with documentation and tests for feature set ${f} branch ${b}`
        });
    }
    manifest.features.push(feature);
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log('Manifest generated');
