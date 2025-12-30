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
                    message: `docs: create doc ${f}-${b}`
                },
                {
                    file: `docs/feature-${f}/doc-${b}.md`,
                    content: `Content details...\n`,
                    append: true,
                    message: `docs: add details to ${f}-${b}`
                }
            ],
            pr_title: `feat: Feature Set ${f} Branch ${b}`,
            pr_body: `Automated PR for feature set ${f} branch ${b}`
        });
    }
    manifest.features.push(feature);
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log('Manifest generated');
