#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readPackageJsonWorkspaces(rootDir) {
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return Array.isArray(pkg.workspaces) ? pkg.workspaces : [];
}

function readPnpmWorkspaceGlobs(rootDir) {
  const pnpmPath = path.join(rootDir, 'pnpm-workspace.yaml');
  const content = fs.readFileSync(pnpmPath, 'utf8');
  const packagesBlockMatch = content.match(/packages:\s*([\s\S]*?)(?:\n[^\s-]|$)/);
  if (!packagesBlockMatch) {
    throw new Error('Unable to parse packages block from pnpm-workspace.yaml');
  }

  return packagesBlockMatch[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line) => line.replace(/^-\s*/, '').replace(/['"]/g, ''));
}

function diffSets(a, b) {
  const onlyA = a.filter((item) => !b.includes(item));
  const onlyB = b.filter((item) => !a.includes(item));
  return { onlyA, onlyB };
}

function main() {
  const rootDir = process.cwd();
  const pkgWorkspaces = readPackageJsonWorkspaces(rootDir);
  const pnpmWorkspaces = readPnpmWorkspaceGlobs(rootDir);

  const { onlyA, onlyB } = diffSets(pkgWorkspaces, pnpmWorkspaces);
  if (onlyA.length === 0 && onlyB.length === 0) {
    console.log('✔ Workspaces are in sync between package.json and pnpm-workspace.yaml');
    return;
  }

  if (onlyA.length > 0) {
    console.error('Entries only in package.json:', onlyA);
  }
  if (onlyB.length > 0) {
    console.error('Entries only in pnpm-workspace.yaml:', onlyB);
  }
  process.exit(1);
}

main();
