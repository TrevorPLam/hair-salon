/**
 * @file packages/ui/src/components/__tests__/index.test.ts
 * @role test
 * @summary Smoke tests for @repo/ui component exports.
 *
 * @entrypoints
 * - Jest test suite
 *
 * @exports
 * - None
 *
 * @depends_on
 * - Jest
 * - Internal: ../index
 *
 * @used_by
 * - Test runner
 *
 * @runtime
 * - environment: test
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import * as UI from '../index';

describe('@repo/ui component exports', () => {
  test('exports all components', () => {
    // Components can be functions or objects (forwardRef returns object)
    const components = [
      UI.Accordion,
      UI.Button,
      UI.Card,
      UI.Container,
      UI.Input,
      UI.Section,
      UI.Select,
      UI.Skeleton,
      UI.Textarea,
    ];

    components.forEach((component) => {
      const componentType = typeof component;
      expect(['function', 'object']).toContain(componentType);
      expect(component).toBeDefined();
    });
  });

  test('all components are accessible without error', () => {
    // Just verify they don't throw when accessed
    expect(() => {
      void UI.Button;
      void UI.Card;
      void UI.Container;
      void UI.Input;
      void UI.Section;
      void UI.Select;
      void UI.Skeleton;
      void UI.Textarea;
      void UI.Accordion;
    }).not.toThrow();
  });
});
