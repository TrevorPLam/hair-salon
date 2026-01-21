# scripts/AGENTS.md — Build & Audit Scripts

Last Updated: 2026-01-21
Applies To: Any agent working in scripts/

**Quick Reference:** See `/BESTPR.md` for comprehensive repo standards.

## Purpose
This folder contains Node.js scripts for build-time checks, audits, and utilities. All scripts are run via `npm run` commands defined in `package.json`.

---

## Current Scripts

| Script | Purpose | Run Command |
|--------|---------|-------------|
| `check-client-secrets.mjs` | Prevent secrets in client bundles | `npm run postbuild` |
| `check-bundle-size.mjs` | Monitor bundle size regressions | `npm run check:bundle-size` |
| `ensure-vitest-coverage.mjs` | Verify coverage thresholds | `npm run test:coverage` |
| `npm-registry-check.mjs` | Verify npm registry access | `npm run check:npm-registry` |
| `a11y-audit.mjs` | Accessibility audits (axe-core) | `npm run audit:a11y` |
| `lighthouse-audit.mjs` | Performance audits (Lighthouse) | `npm run audit:lighthouse` |

---

## Script Conventions

### File Naming
- **Format:** `kebab-case-name.mjs` (ESM modules)
- **Extension:** `.mjs` (not `.js`) to force ESM

### Script Structure
```javascript
#!/usr/bin/env node

/**
 * Script Name — Brief description
 * 
 * Usage: npm run script-command
 * Exit codes: 0 (success), 1 (failure)
 */

// Imports
import { someUtil } from '../lib/utils.js'

// Main logic
async function main() {
  try {
    // Do work
    console.log('✅ Success')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
```

### Exit Codes
- **0:** Success (script completed as expected)
- **1:** Failure (script found issues or errors)
- **Use consistent:** CI/CD relies on exit codes

### Output Format
- **Success:** `✅ [Check passed] Details...`
- **Warning:** `⚠️  [Warning] Details...`
- **Error:** `❌ [Error] Details...`
- **Info:** `ℹ️  [Info] Details...`

---

## Adding a New Script

1. **Create:** `scripts/new-script.mjs`
2. **Add shebang:** `#!/usr/bin/env node`
3. **Add JSDoc:** Document purpose, usage, exit codes
4. **Add npm command:** In `package.json` scripts section
5. **Test:** Run manually to verify behavior
6. **Update this file:** Add to table above

---

## Security Notes

- **No secrets:** Scripts must not contain hardcoded credentials
- **Environment variables:** Use `process.env.*` for sensitive config
- **Input validation:** If accepting args, validate and sanitize
- **File operations:** Be careful with `fs` operations (no arbitrary writes)

---

## Integration with Build

### Build Hooks (package.json)
```json
{
  "scripts": {
    "postbuild": "node scripts/check-client-secrets.mjs"
  }
}
```

### CI/CD (GitHub Actions)
Scripts are used in CI pipelines (when enabled):
- Lighthouse audits on PR
- Bundle size checks on PR
- Security scans on release

---

## Common Patterns

### Check Script Template
```javascript
#!/usr/bin/env node
import fs from 'fs'

async function checkSomething() {
  const issues = []
  
  // Perform checks
  if (problemDetected) {
    issues.push('Description of issue')
  }
  
  if (issues.length > 0) {
    console.error('❌ Check failed:')
    issues.forEach(issue => console.error(`  - ${issue}`))
    process.exit(1)
  }
  
  console.log('✅ Check passed')
  process.exit(0)
}

checkSomething()
```

### Audit Script Template
```javascript
#!/usr/bin/env node
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function auditSomething() {
  try {
    const { stdout } = await execAsync('some-command')
    const results = JSON.parse(stdout)
    
    // Process results
    console.log(`✅ Audit complete: ${results.score}/100`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Audit failed:', error.message)
    process.exit(1)
  }
}

auditSomething()
```

---

## Don't

- ❌ Run production API calls from scripts (use mocks)
- ❌ Mutate source code automatically (requires review)
- ❌ Use `require()` (ESM only)
- ❌ Write brittle path assumptions (use `import.meta.url`)

---

**See also:** `/BESTPR.md` for complete best practices guide.
