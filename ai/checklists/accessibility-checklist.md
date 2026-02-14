# Accessibility Checklist

This accessibility checklist must be completed for all code changes to ensure WCAG 2.2 AA compliance and inclusive design.

## Semantic HTML

### Document Structure
- [ ] Proper HTML5 doctype declared
- [ ] Language attribute set on html element
- [ ] Semantic HTML5 elements used appropriately
- [ ] Heading hierarchy logical (h1-h6)
- [ ] No skipped heading levels
- [ ] Proper use of header, main, nav, aside, footer
- [ ] Section and article elements used correctly
- [ ] Figure and figcaption for images with captions

### Content Structure
- [ ] Lists marked up properly (ul, ol, dl)
- [ ] Navigation menus in nav element
- [ ] Breadcrumb navigation implemented
- [ ] Skip links provided for keyboard navigation
- [ ] Content logically structured
- [ ] No presentational HTML used for structure
- [ ] Proper use of blockquote and cite
- [ ] Table headers marked with th and scope

## Keyboard Navigation

### Keyboard Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] Tab order logical and intuitive
- [ ] Focus indicators visible on all focusable elements
- [ ] No keyboard traps
- [ ] Skip navigation implemented
- [ ] Focus management in modals/dialogs
- [ ] Keyboard shortcuts documented
- [ ] Form navigation with keyboard
- [ ] Custom widgets keyboard accessible

### Focus Management
- [ ] Focus visible and high contrast
- [ ] Focus returns to correct element after modal close
- [ ] Focus not lost during page interactions
- [ ] Focus indicators meet contrast requirements
- [ ] Tab navigation works through all content
- [ ] Focus trapping in modals implemented
- [ ] Focus restoration after dynamic content changes
- [ ] Focus management in single-page applications

## Visual Design

### Color Contrast
- [ ] Text contrast ratio ≥ 4.5:1 for normal text
- [ ] Large text contrast ratio ≥ 3:1
- [ ] Interactive elements contrast ratio ≥ 3:1
- [ ] Color not used as sole indicator of information
- [ ] Links distinguishable from surrounding text
- [ ] Form fields have sufficient contrast
- [ ] Error states have sufficient contrast
- [ ] Success states have sufficient contrast
- [ ] Focus states have sufficient contrast

### Typography
- [ ] Text resizable to 200% without breaking layout
- [ ] Line height at least 1.5 times font size
- [ ] Spacing between paragraphs at least 1.5 times line height
- [ ] Letter spacing not used for justification
- [ ] Text alignment left-justified with adequate spacing
- [ ] Font sizes responsive and appropriate
- [ ] Text not justified in ways that cause readability issues
- [ ] Adequate spacing between lines of text

### Layout and Design
- [ ] Responsive design works across devices
- [ ] Content fits viewport without horizontal scrolling
- [ ] Adequate spacing between interactive elements
- [ ] Consistent navigation patterns
- [ ] Clear visual hierarchy
- [ ] Adequate white space
- [ ] No content that could cause seizures
- [ ] Motion and animation respects prefers-reduced-motion
- [ ] Layout doesn't break with text zoom

## Forms

### Form Labels
- [ ] All form inputs have associated labels
- [ ] Labels programmatically associated with inputs
- [ ] Placeholder text not used as replacement for labels
- [ ] Required fields clearly indicated
- [ ] Error messages clearly associated with fields
- [ ] Help text available where needed
- [ ] Fieldsets and legends used for related fields
- [ ] Form instructions clear and concise
- [ ] Multiple choice options properly labeled

### Form Validation
- [ ] Validation errors clearly communicated
- [ ] Error messages accessible to screen readers
- [ ] Validation provides helpful guidance
- [ ] Required field indicators accessible
- [ ] Inline validation messages accessible
- [ ] Form submission feedback accessible
- [ ] Validation timing appropriate
- [ ] Multiple validation methods supported
- [ ] Error recovery guidance provided

### Form Interaction
- [ ] Form controls keyboard accessible
- [ ] Focus moves logically through form
- [ ] Submit buttons clearly identifiable
- [ ] Form completion status communicated
- [ ] Progress indicators for multi-step forms
- [ ] Auto-complete attributes used appropriately
- [ ] Input modes respected (password, email, etc.)
- [ ] Form submission accessible without JavaScript

## Images and Media

### Image Accessibility
- [ ] All meaningful images have alt text
- [ ] Decorative images have empty alt attributes
- [ ] Complex images have long descriptions
- [ ] Image alt text concise and descriptive
- [ ] Charts and graphs have data tables or descriptions
- [ ] CAPTCHA alternatives provided
- [ ] Image maps accessible
- [ ] SVG images have titles and descriptions
- [ ] Image text in alt text not repeated in surrounding text

### Media Accessibility
- [ ] Videos have captions or transcripts
- [ ] Audio content has transcripts
- [ ] Media players keyboard accessible
- [ ] Media controls properly labeled
- [ ] Media doesn't auto-play without user control
- [ ] Volume controls accessible
- [ ] Media playback status communicated
- [ ] Media alternatives provided
- [ ] Media respects user preferences

## Screen Reader Support

### ARIA Implementation
- [ ] ARIA landmarks used appropriately
- [ ] ARIA labels and descriptions used correctly
- [ ] ARIA roles appropriate for custom widgets
- [ ] ARIA states and properties updated dynamically
- [ ] No redundant ARIA (don't repeat semantic HTML)
- [ ] ARIA live regions used appropriately
- [ ] ARIA expanded/collapsed states correct
- [ ] ARIA required/invalid states used
- [ ] ARIA hidden used appropriately
- [ ] Screen reader only content properly hidden

### Content Announcements
- [ ] Page changes announced appropriately
- [ ] Form validation errors announced
- [ ] Success messages announced
- [ ] Dynamic content changes announced
- [ ] Modal/dialog appearance announced
- [ ] Error states announced
- [ ] Loading states announced
- [ ] Navigation changes announced
- [ ] Focus changes announced

## Cognitive Accessibility

### Content Clarity
- [ ] Language simple and clear
- [ ] Instructions provided for complex tasks
- [ ] Consistent terminology used
- [ ] Acronyms and abbreviations explained
- [ ] Content organized logically
- [ ] White space used to separate content
- [ ] Short sentences and paragraphs
- [ ] Active voice used
- [ ] Content chunked appropriately

### Error Prevention
- [ ] Confirmation dialogs for destructive actions
- [ ] Form validation prevents errors
- [ ] Clear error messages provided
- [ ] Recovery from errors possible
- [ ] Context-sensitive help available
- [ ] Undo functionality where appropriate
- [ ] Data persistence during form completion
- [ ] Progress indicators for multi-step processes
- [ ] Clear navigation paths

## Motor Accessibility

### Touch Targets
- [ ] Touch targets at least 44x44 pixels
- [ ] Adequate spacing between touch targets
- [ ] Touch targets not too close together
- [ ] Large touch targets for important actions
- [ ] Touch feedback provided
- [ ] Gesture alternatives provided
- [ ] Touch targets accessible without precision
- [ ] Swipe gestures have alternatives
- [ ] Touch targets have visual indicators
- [ ] Motor accessibility testing completed

### Interaction Design
- [ ] No time limits for interactions
- [ ] Adjustable timing for time-sensitive interactions
- [ ] Multiple interaction methods available
- [ ] No fine motor control required
- [ ] Click targets not too small
- [ ] Drag and drop alternatives available
- [ ] Hover states have keyboard alternatives
- [ ] Motion-based interactions have alternatives
- [ ] Complex gestures simplified

## Testing

### Accessibility Testing
- [ ] Screen reader testing completed
- [ ] Keyboard-only navigation tested
- [ ] Voice control testing completed
- [ ] Magnification testing completed
- [ ] High contrast mode testing
- [ ] Mobile accessibility testing
- [ ] Cross-browser accessibility testing
- [ ] Automated accessibility testing

### Tools and Validation
- [ ] WAVE accessibility testing completed
- [ ] axe-core automated testing passed
- [ ] Lighthouse accessibility audit passed
- [ ] Color contrast analyzer used
- [ ] Screen reader emulation testing
- [ ] Keyboard accessibility testing
- [ ] Mobile accessibility testing
- [ ] Accessibility checklist reviewed

## Documentation

### Accessibility Documentation
- [ ] Accessibility statement available
- [ ] Keyboard shortcuts documented
- [ ] Accessibility features documented
- [ ] Contact information for accessibility issues
- [ ] Accessibility testing procedures documented
- [ ] Accessibility guidelines for developers
- [ ] Accessibility training materials provided
- [ ] Accessibility compliance statement
- [ ] Alternative access methods documented

---

**Before deploying any code changes, ensure all accessibility requirements are met and this checklist is completed.**
