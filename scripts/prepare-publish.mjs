import { readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const strip = (p) => p.replace(/^\.\/dist\//, './').replace(/^dist\//, '');

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  keywords: pkg.keywords,
  homepage: pkg.homepage,
  repository: pkg.repository,
  bugs: pkg.bugs,
  license: pkg.license,
  author: pkg.author,
  type: pkg.type,
  style: pkg.style && strip(pkg.style),
  exports: pkg.exports && Object.fromEntries(
    Object.entries(pkg.exports).map(([k, v]) => [k, typeof v === 'string' ? strip(v) : v])
  ),
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
};

for (const k of Object.keys(distPkg)) if (distPkg[k] === undefined) delete distPkg[k];

writeFileSync(join(root, 'dist/package.json'), JSON.stringify(distPkg, null, 2) + '\n');
copyFileSync(join(root, 'LICENSE'), join(root, 'dist/LICENSE'));
copyFileSync(join(root, 'README.md'), join(root, 'dist/README.md'));
rmSync(join(root, 'dist/usagi.js'), { force: true });

console.log('Prepared dist/ for publish');
