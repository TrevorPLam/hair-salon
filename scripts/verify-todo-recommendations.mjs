import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const todoPath = path.join(repoRoot, 'TODO.md');

if (!fs.existsSync(todoPath)) {
  console.error('TODO.md not found at', todoPath);
  process.exit(1);
}

const todo = fs.readFileSync(todoPath, 'utf8');

// Checklist derived from audit recommendations in this chat.
const requiredTasks = [
  'Module alias + re-export audit',
  'Canonical feature import surface',
  'Align local env template with runtime schema',
  'CI tests must be blocking',
  'Blog: category filtering',
  'Contact: spam policy for CRM sync',
  'Rate limit fallback policy in production',
  'OG image route protection',
  'Search index caching',
  'Blog data caching',
  'Security contact accuracy',
];

const missing = requiredTasks.filter((task) => !todo.includes(task));

if (missing.length > 0) {
  console.error('Missing tasks in TODO.md:');
  missing.forEach((task) => console.error(`- ${task}`));
  process.exit(2);
}

console.log('All required tasks are present in TODO.md.');
