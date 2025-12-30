import fs from 'fs';

const manifest = {
    features: []
};

function createBranch(name, commits) {
    return {
        name: name,
        commits: commits,
        pr_title: `feat: ${name}`,
        pr_body: `Automated PR for ${name}`
    };
}

// Generate 400 more commits (40 branches * 10 commits)
const extraFeatures = [];
for (let i = 1; i <= 40; i++) {
    const branchName = `feat/extra-optimization-${i}`;
    const commits = [];
    for (let c = 1; c <= 10; c++) {
        commits.push({
            file: `src/optimization/opt-${i}.ts`,
            content: `// Optimization ${i} step ${c}\n`,
            append: true,
            message: `perf: optimize step ${c} for part ${i}`
        });
    }

    manifest.features.push({
        name: `optimization-${i}`,
        branches: [createBranch(branchName, commits)]
    });
}

fs.writeFileSync('manifest_extra.json', JSON.stringify(manifest, null, 2));
console.log('Extra manifest generated with 40 branches / 400 commits.');
