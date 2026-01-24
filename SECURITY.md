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

## Security Updates

Security fixes will be released as soon as possible and noted in release notes. If a vulnerability is severe, we may issue additional guidance or mitigations before a full release.
