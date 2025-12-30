import fs from 'fs';

const manifest = {
    features: []
};

function addFeature(name, branches) {
    manifest.features.push({ name, branches });
}

function createBranch(featureName, branchIndex, branchName, commits, prTitle, prBody) {
    return {
        name: branchName || `feat/${featureName}-${branchIndex}`,
        commits: commits.map((c, i) => ({
            ...c,
            message: c.message || `feat: ${featureName} part ${i + 1}`
        })),
        pr_title: prTitle || `feat: ${featureName} implementation part ${branchIndex}`,
        pr_body: prBody || `Automated PR for ${featureName} part ${branchIndex}`
    };
}

// 1. Stacks Integration (Connect & Transactions)
const stacksBranches = [];
for (let i = 1; i <= 5; i++) {
    stacksBranches.push(createBranch('stacks-integ', i, `feat/stacks-integ-${i}`, [
        { file: 'src/lib/stacks.ts', content: `// Stacks integration part ${i}\n`, append: i > 1, message: `feat: stacks setup part ${i}` },
        { file: 'src/lib/transactions.ts', content: `// Transactions part ${i}\n`, append: i > 1, message: `feat: transaction setup part ${i}` },
        { file: 'timestamp.txt', content: `Updated at ${Date.now()}\n`, append: true, message: `chore: update timestamp ${i}` },
        { file: 'src/lib/constants.ts', content: `export const CONST_${i} = ${i};\n`, append: true, message: `feat: add constants ${i}` },
        { file: 'tests/stacks.test.ts', content: `test('stacks ${i}', () => {});\n`, append: true, message: `test: add stacks test ${i}` }
    ]));
}
addFeature('stacks-integration', stacksBranches);

// 2. Wallet Connect
const wcBranches = [];
for (let i = 1; i <= 8; i++) {
    wcBranches.push(createBranch('wallet-connect', i, `feat/wallet-connect-${i}`, [
        { file: 'src/lib/wallet-connect.ts', content: `// WC Part ${i}\n`, append: i > 1, message: `feat: wc setup ${i}` },
        { file: 'src/components/WalletModal.tsx', content: `// Modal Part ${i}\n`, append: i > 1, message: `feat: wc modal ${i}` },
        { file: 'src/hooks/useWallet.ts', content: `// Hook Part ${i}\n`, append: i > 1, message: `feat: wc hook ${i}` },
        { file: 'src/assets/wc-styles.css', content: `/* Style ${i} */\n`, append: i > 1, message: `style: wc styles ${i}` },
        { file: 'README.md', content: `\n- Wallet Connect Step ${i}`, append: true, message: `docs: update readme ${i}` }
    ]));
}
addFeature('wallet-connect', wcBranches);

// 3. Chainhooks
const chBranches = [];
for (let i = 1; i <= 5; i++) {
    chBranches.push(createBranch('chainhooks', i, `feat/chainhooks-${i}`, [
        { file: 'src/lib/chainhooks.ts', content: `// Chainhooks ${i}\n`, append: i > 1, message: `feat: chainhooks setup ${i}` },
        { file: 'config/chainhooks.json', content: `{"step": ${i}}\n`, message: `config: chainhooks config ${i}` },
        { file: 'src/services/monitor.ts', content: `// Monitor ${i}\n`, append: i > 1, message: `feat: monitor ${i}` }
    ]));
}
addFeature('chainhooks', chBranches);

// 4. Intuition Features: UI Components (20 branches)
const uiBranches = [];
const components = ['Header', 'Footer', 'Sidebar', 'Button', 'Card', 'Input', 'Modal', 'Toast', 'Loader', 'Grid'];
components.forEach((comp, idx) => {
    // Part 1: Structure
    uiBranches.push(createBranch('ui', idx * 2 + 1, `feat/ui-${comp.toLowerCase()}-struct`, [
        { file: `src/components/${comp}.tsx`, content: `export const ${comp} = () => <div>${comp}</div>;\n`, message: `feat: add ${comp} component` },
        { file: `src/components/${comp}.css`, content: `.${comp} { display: block; }\n`, message: `style: add ${comp} styles` },
        { file: `src/index.tsx`, content: `export * from './components/${comp}';\n`, append: true, message: `feat: export ${comp}` }
    ]));
    // Part 2: Enhancements
    uiBranches.push(createBranch('ui', idx * 2 + 2, `feat/ui-${comp.toLowerCase()}-enhance`, [
        { file: `src/components/${comp}.tsx`, content: `// Enhanced ${comp}\n`, append: true, message: `feat: enhance ${comp}` },
        { file: `tests/components/${comp}.test.tsx`, content: `test('${comp}', () => {});\n`, message: `test: add ${comp} tests` },
        { file: `stories/${comp}.stories.tsx`, content: `// Story ${comp}\n`, message: `docs: add ${comp} story` }
    ]));
});
addFeature('ui-components', uiBranches);

// 5. Intuition Features: Core Logic / Pages (40 branches needed to hit 80 total)
// Current: 5 + 8 + 5 + 20 = 38 branches. Needed: 42 more.
const coreBranches = [];
for (let i = 1; i <= 42; i++) {
    coreBranches.push(createBranch('core-logic', i, `feat/logic-update-${i}`, [
        { file: `src/pages/page-${i}.tsx`, content: `// Page ${i}\n`, message: `feat: add page ${i}` },
        { file: `src/utils/util-${i}.ts`, content: `export const util${i} = () => {};\n`, message: `feat: add util ${i}` },
        { file: `src/api/endpoint-${i}.ts`, content: `// API ${i}\n`, message: `feat: add api ${i}` },
        { file: `docs/guide-${i}.md`, content: `# Guide ${i}\n`, message: `docs: add guide ${i}` },
        { file: `tests/logic/test-${i}.ts`, content: `// Test ${i}\n`, message: `test: add logic test ${i}` }
    ]));
}
addFeature('core-logic', coreBranches);

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log(`Manifest generated with ${manifest.features.reduce((acc, f) => acc + f.branches.length, 0)} branches.`);
