# Template Documentation

This directory contains detailed documentation for each template and shared template components.

## Available Template Guides

### [Hair Salon Template](./hair-salon.md)

Complete documentation for the hair salon template including:

- Feature overview
- Setup and configuration
- Customization guide
- Content management
- Deployment instructions

### [Nail Salon Template](./nail-salon.md) _(Coming Soon)_

Documentation for nail salon template

### [Tanning Salon Template](./tanning-salon.md) _(Coming Soon)_

Documentation for tanning salon template

### [Shared Components Guide](./shared-components.md)

Guide to using and contributing to shared template components

## Template Development

### Creating a New Template

1. **Plan the template** - Identify unique features and requirements
2. **Set up structure** - Create directory in `templates/`
3. **Copy base template** - Start from most similar template
4. **Customize features** - Adapt for specific business type
5. **Extract shared code** - Move common features to `templates/shared/`
6. **Document thoroughly** - Create template-specific documentation
7. **Test completely** - Verify all features work
8. **Create example** - Build example client in `clients/`

### Template Versioning

Templates use semantic versioning:

- **Major (X.0.0)** - Breaking changes, significant rewrites
- **Minor (0.X.0)** - New features, backwards compatible
- **Patch (0.0.X)** - Bug fixes, minor improvements

Track version in template's `package.json` and document changes in `CHANGELOG.md`.

### Template Best Practices

1. **Generic by default** - Avoid hardcoded business data
2. **Configurable** - Use environment variables and config files
3. **Well-documented** - Clear README and inline comments
4. **Tested** - Include tests for critical features
5. **Performant** - Optimize for speed and Core Web Vitals
6. **Accessible** - Follow WCAG guidelines
7. **Secure** - Implement security best practices
8. **SEO-friendly** - Proper metadata and structured data

## Template Feature Matrix

| Feature         | Hair Salon | Nail Salon | Tanning | Spa |
| --------------- | ---------- | ---------- | ------- | --- |
| Booking System  | ✅         | 🔄         | 🔄      | 🔄  |
| Service Pages   | ✅         | 🔄         | 🔄      | 🔄  |
| Team Profiles   | ✅         | 🔄         | 🔄      | 🔄  |
| Blog/Content    | ✅         | 🔄         | 🔄      | 🔄  |
| Gallery         | ✅         | 🔄         | 🔄      | 🔄  |
| Contact Forms   | ✅         | 🔄         | 🔄      | 🔄  |
| Pricing Display | ✅         | 🔄         | 🔄      | 🔄  |
| Online Store    | ❌         | 🔄         | 🔄      | 🔄  |
| Membership      | ❌         | ❌         | 🔄      | 🔄  |
| Gift Cards      | 🔄         | 🔄         | 🔄      | 🔄  |

Legend: ✅ Available | 🔄 Planned | ❌ Not Planned

## Contributing to Templates

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for general contribution guidelines.

For template-specific contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in at least one client project
5. Update documentation
6. Submit a pull request

## Support

For template-related questions:

- Check template-specific documentation
- Review shared components guide
- See [docs/architecture/](../architecture/) for system architecture
- Contact the development team

---

**Last Updated:** 2026-02-10
