# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported |
| --- | --- |
| 0.1.x | ✅ |
| < 0.1 | ❌ |

## Reporting a Vulnerability

Please report security vulnerabilities privately. **Do not** open public GitHub issues for security reports.

**Preferred:**
- GitHub Security Advisories: https://github.com/TrevorPLam/your-dedicated-marketer/security/advisories

**Alternative:**
- Email: contact@yourdedicatedmarketer.com

When reporting, include:
- A clear description of the issue and impact
- Steps to reproduce (proof-of-concept if available)
- Affected versions or commit SHA
- Any mitigation suggestions (if known)

We will acknowledge receipt within **2 business days**, provide a status update within **5 business days**, and coordinate a fix and disclosure timeline.

## Security Policy

- We follow coordinated vulnerability disclosure practices.
- Reports are handled confidentially and shared on a need-to-know basis.
- Fixes are prioritized based on severity and exploitability.
- We may request additional details or testing assistance to verify the issue.

## Security Best Practices for Users

- Keep dependencies up to date and run `npm audit` regularly.
- Never commit secrets or tokens; use environment variables and secret managers.
- Enable security headers (CSP, HSTS, X-Frame-Options) in production.
- Monitor logs and error reporting (e.g., Sentry) for suspicious activity.
- Restrict access to administrative interfaces and production dashboards.

## Software Bill of Materials (SBOM)

### Overview

We generate and maintain a Software Bill of Materials (SBOM) for supply chain security and dependency transparency.

**Format:** CycloneDX (JSON and XML)  
**Specification:** [CycloneDX 1.6+](https://cyclonedx.org/)

### Accessing SBOMs

1. **Latest SBOM (main branch):**
   - Located in `.sbom/sbom-latest.json`
   - Updated automatically on every main branch push
   - Contains all dependencies and transitive dependencies

2. **Release SBOMs:**
   - Attached to each GitHub Release as assets
   - Files: `sbom.json`, `sbom.xml`
   - Download from: https://github.com/TrevorPLam/your-dedicated-marketer/releases

3. **CI Artifacts:**
   - Generated on every build via `.github/workflows/sbom.yml`
   - Available in GitHub Actions artifacts (90-day retention)
   - Useful for auditing historical builds

### SBOM Contents

Each SBOM includes:
- **Main component:** Application metadata (name, version)
- **Direct dependencies:** All packages in `package.json`
- **Transitive dependencies:** Full dependency tree
- **Component metadata:** Licenses, versions, package URLs (PURLs)
- **Vulnerability references:** When available

### SBOM Generation

**Automated Generation:**
- Runs on every push to `main` and `develop` branches
- Runs on every pull request
- Runs on every release
- Can be triggered manually via GitHub Actions UI

**Manual Generation:**
```bash
# Install CycloneDX CLI
npm install -g @cyclonedx/cyclonedx-npm

# Generate SBOM
npx @cyclonedx/cyclonedx-npm --output-file sbom.json
```

### Using SBOMs

**Dependency Auditing:**
```bash
# View components
jq '.components[] | {name: .name, version: .version}' sbom.json

# Filter by license
jq '.components[] | select(.licenses) | {name: .name, licenses: .licenses}' sbom.json

# Count dependencies
jq '.components | length' sbom.json
```

**Vulnerability Scanning:**
- SBOMs can be imported into vulnerability scanners (e.g., Grype, Trivy)
- Automated scans can detect known CVEs in dependencies
- Results help prioritize security updates

**Compliance:**
- SBOMs support supply chain transparency requirements
- Enable compliance with regulations (e.g., Executive Order 14028)
- Facilitate third-party security assessments

### SBOM Validation

SBOMs are automatically validated in CI:
- Minimum component count check (prevents incomplete generation)
- Metadata presence verification
- Format validation (CycloneDX spec compliance)

### Security Considerations

**What's Included:**
- All npm dependencies (production and development)
- Transitive dependencies (full dependency tree)
- Package versions and licenses

**What's NOT Included:**
- Source code or proprietary business logic
- Environment variables or secrets
- Configuration files with sensitive data
- Runtime data or user information

SBOMs are safe to share publicly and do not contain sensitive information.

## Security Updates

Security fixes will be released as soon as possible and noted in release notes. If a vulnerability is severe, we may issue additional guidance or mitigations before a full release.
