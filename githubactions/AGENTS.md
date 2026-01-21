# githubactions/AGENTS.md — GitHub Actions Workflows

Last Updated: 2026-01-21
Applies To: Any agent working in githubactions/

**Quick Reference:** See `/BESTPR.md` for comprehensive repo standards.

## Purpose
This folder stores GitHub Actions workflows that are **disabled by default** for cost control. Workflows must be explicitly enabled before use.

---

## Structure

```
githubactions/
├── AGENTS.md           # This file
├── README.md           # Enable/disable instructions
└── workflows/
    └── *.yml           # Workflow definitions
```

---

## Cost Control Policy

**GitHub Actions are OFF by default** to prevent unexpected costs.

### To Enable
1. Read `githubactions/README.md` for instructions
2. Move workflows from `githubactions/workflows/` to `.github/workflows/`
3. Verify runs in GitHub Actions tab
4. Monitor usage in GitHub settings

### To Disable
1. Move workflows from `.github/workflows/` back to `githubactions/workflows/`
2. Verify no workflows appear in GitHub Actions tab

---

## Workflow Standards

### File Naming
- **Format:** `kebab-case-name.yml`
- **Examples:** `ci.yml`, `lighthouse-audit.yml`, `security-scan.yml`

### Workflow Structure
```yaml
name: Workflow Name

on:
  # Trigger events (pull_request, push, schedule, etc.)
  pull_request:
    branches: [main]

jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run checks
        run: npm run lint
```

---

## Common Workflows

### CI/CD Pipeline
- **File:** `ci.yml`
- **Triggers:** PR to main, push to main
- **Steps:** Install, lint, type-check, test, build
- **Cost:** Moderate (runs on every PR)

### Lighthouse Audit
- **File:** `lighthouse-audit.yml`
- **Triggers:** PR to main
- **Steps:** Build, start server, run Lighthouse
- **Cost:** High (requires build + server)

### Security Scan
- **File:** `security-scan.yml`
- **Triggers:** PR to main, schedule (weekly)
- **Steps:** npm audit, dependency check
- **Cost:** Low (fast checks)

### Dependency Update
- **File:** `dependabot.yml`
- **Triggers:** Schedule (weekly)
- **Steps:** Check for updates, create PRs
- **Cost:** Low (GitHub Dependabot is free)

---

## Secrets Management

### Required Secrets (if enabled)
```
CLOUDFLARE_API_TOKEN      # For Cloudflare Pages deployment
SENTRY_AUTH_TOKEN         # For source map uploads
SUPABASE_SERVICE_ROLE_KEY # For database migrations
```

### Adding Secrets
1. Go to GitHub repo → Settings → Secrets
2. Click "New repository secret"
3. Name: `SECRET_NAME`
4. Value: [paste secret]
5. Update workflow to use: `${{ secrets.SECRET_NAME }}`

### Security Notes
- **Never log secrets:** Use `echo "***"` instead
- **Never expose in PR comments:** GitHub sanitizes, but be careful
- **Use least privilege:** Create service accounts with minimal permissions

---

## Testing Workflows

### Local Testing (act)
```bash
# Install act (GitHub Actions local runner)
brew install act

# Test a workflow locally
act -W .github/workflows/ci.yml
```

### Dry Run (GitHub)
1. Create a PR with `[test-ci]` in title
2. GitHub Actions will run (if enabled)
3. Review results in Actions tab

---

## Adding a New Workflow

1. **Create file:** `githubactions/workflows/new-workflow.yml`
2. **Define triggers:** When should this run?
3. **Define steps:** What checks to perform?
4. **Test locally:** Use `act` if possible
5. **Document cost:** Estimate usage (minutes per run × frequency)
6. **Get approval:** Owner (Trevor) must approve before enabling
7. **Update README:** Add to `githubactions/README.md`

---

## Conventions

### Job Names
- Use descriptive names: `lint`, `test`, `build`, not `job1`, `job2`

### Step Names
- Use action-oriented names: "Install dependencies", not "Install"

### Conditions
```yaml
# Run only on PRs (not pushes)
if: github.event_name == 'pull_request'

# Run only on main branch
if: github.ref == 'refs/heads/main'

# Skip on dependabot PRs
if: github.actor != 'dependabot[bot]'
```

### Caching
```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

---

## Troubleshooting

### Workflow Not Running
- Check if workflows are enabled (`.github/workflows/` not `githubactions/workflows/`)
- Verify trigger conditions match event (PR, push, etc.)
- Check branch protection settings

### Job Failing
- Review logs in GitHub Actions tab
- Check for missing secrets
- Verify Node.js version matches `package.json` engines
- Test locally with `act`

### Cost Overruns
- Review usage in GitHub Settings → Billing
- Disable expensive workflows (Lighthouse, E2E)
- Use `if` conditions to reduce runs
- Move workflows back to `githubactions/` to disable

---

## Don't

- ❌ Enable workflows without cost approval
- ❌ Run expensive jobs on every commit (use conditions)
- ❌ Store secrets in workflow files
- ❌ Use `pull_request_target` (security risk)
- ❌ Forget to test workflows before enabling

---

**See also:** 
- `/BESTPR.md` for complete best practices guide
- `githubactions/README.md` for enable/disable instructions
