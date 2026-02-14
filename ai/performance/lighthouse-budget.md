# Lighthouse Budget

## Performance Budget Targets

This document defines the specific numeric targets for Lighthouse performance metrics. All pages must meet or exceed these thresholds.

## Core Web Vitals Budgets

### Largest Contentful Paint (LCP)
- **Target**: ≤ 2.5 seconds
- **Budget**: 2.0 seconds
- **Measurement**: 75th percentile of page loads
- **Impact**: High - affects user perception of loading speed

### First Input Delay (FID)
- **Target**: ≤ 100 milliseconds
- **Budget**: 80 milliseconds
- **Measurement**: 75th percentile of page loads
- **Impact**: High - affects interactivity perception

### Cumulative Layout Shift (CLS)
- **Target**: ≤ 0.1
- **Budget**: 0.05
- **Measurement**: 75th percentile of page loads
- **Impact**: Medium - affects visual stability

## Resource Budgets

### JavaScript
- **First Load JS**: ≤ 150KB gzipped
- **Total JS**: ≤ 300KB gzipped
- **Critical JS**: ≤ 10KB gzipped
- **Non-critical JS**: Load after DOM content

### CSS
- **Critical CSS**: ≤ 15KB gzipped
- **Total CSS**: ≤ 50KB gzipped
- **Non-critical CSS**: Load asynchronously

### Images
- **Hero Images**: ≤ 200KB compressed
- **Content Images**: ≤ 100KB compressed
- **Thumbnails**: ≤ 20KB compressed
- **Total per page**: ≤ 1MB

### Fonts
- **Web Fonts**: ≤ 50KB per font
- **Total Fonts**: ≤ 150KB
- **Font Variants**: Maximum 4 per font family

## Lighthouse Score Targets

### Performance Score
- **Target**: ≥ 95
- **Minimum**: 90
- **Weight**: 40% of overall score

### Accessibility Score
- **Target**: ≥ 95
- **Minimum**: 90
- **Weight**: 30% of overall score

### Best Practices Score
- **Target**: ≥ 95
- **Minimum**: 90
- **Weight**: 20% of overall score

### SEO Score
- **Target**: ≥ 95
- **Minimum**: 90
- **Weight**: 10% of overall score

## Page-Specific Budgets

### Landing Pages
- **Performance**: ≥ 95
- **First Load JS**: ≤ 120KB
- **Images**: ≤ 800KB total
- **LCP**: ≤ 2.0 seconds

### Service Pages
- **Performance**: ≥ 95
- **First Load JS**: ≤ 130KB
- **Images**: ≤ 600KB total
- **LCP**: ≤ 2.2 seconds

### Booking Flow
- **Performance**: ≥ 90
- **First Load JS**: ≤ 150KB
- **Images**: ≤ 400KB total
- **FID**: ≤ 80ms

### Blog Pages
- **Performance**: ≥ 90
- **First Load JS**: ≤ 140KB
- **Images**: ≤ 1MB total
- **CLS**: ≤ 0.08

## Budget Enforcement

### CI/CD Integration
```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './lighthouserc.json'
    uploadArtifacts: true
    temporaryPublicStorage: true
```

### Lighthouse Configuration
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "chromeFlags": "--no-sandbox --headless"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "categories:pwa": "off"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Budget Configuration
```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "interactive",
          "budget": 3000
        },
        {
          "metric": "first-meaningful-paint",
          "budget": 2000
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 150000
        },
        {
          "resourceType": "stylesheet",
          "budget": 50000
        },
        {
          "resourceType": "image",
          "budget": 1000000
        },
        {
          "resourceType": "font",
          "budget": 150000
        }
      ]
    }
  ]
}
```

## Monitoring and Reporting

### Real User Monitoring
- Track Core Web Vitals in production
- Monitor 75th percentile values
- Alert on budget violations
- Weekly performance reports

### Budget Violation Handling
1. **Critical**: Block deployment
   - Performance score < 90
   - First Load JS > 200KB
   - LCP > 4 seconds

2. **High**: Fix within 24 hours
   - Performance score 90-94
   - First Load JS 150-200KB
   - LCP 2.5-4 seconds

3. **Medium**: Fix within 1 week
   - Performance score 94-95
   - First Load JS 130-150KB
   - Minor budget overages

### Performance Debt Tracking
- Log all budget violations
- Track resolution time
- Monthly performance debt review
- Quarterly budget adjustments

## Optimization Strategies

### JavaScript Optimization
- Code splitting by route
- Tree shaking unused code
- Dynamic imports for non-critical features
- Minification and compression

### Image Optimization
- Next.js Image component
- Responsive images with srcset
- Modern formats (WebP, AVIF)
- Lazy loading below the fold

### CSS Optimization
- Critical CSS inlining
- Non-critical CSS async loading
- CSS purging of unused styles
- Minification and compression

### Network Optimization
- HTTP/2 or HTTP/3
- Resource hints (preload, prefetch)
- Service worker caching
- CDN distribution

## Budget Review Process

### Monthly Reviews
- Analyze performance trends
- Review budget compliance
- Identify optimization opportunities
- Update budgets as needed

### Quarterly Assessments
- Comprehensive performance audit
- Budget effectiveness evaluation
- Industry benchmark comparison
- Strategic budget adjustments

### Annual Updates
- Budget target realignment
- Performance standard updates
- Tool and process improvements
- Team training updates

This budget ensures consistent performance standards and provides clear targets for optimization efforts.
