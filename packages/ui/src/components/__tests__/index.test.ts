/**
 * Smoke tests for @repo/ui component exports.
 *
 * Verifies that all components are exported and have expected structure.
 */

import * as UI from '../index'

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
    ]

    components.forEach((component) => {
      const componentType = typeof component
      expect(['function', 'object']).toContain(componentType)
      expect(component).toBeDefined()
    })
  })

  test('all components are accessible without error', () => {
    // Just verify they don't throw when accessed
    expect(() => {
      void UI.Button
      void UI.Card
      void UI.Container
      void UI.Input
      void UI.Section
      void UI.Select
      void UI.Skeleton
      void UI.Textarea
      void UI.Accordion
    }).not.toThrow()
  })
})
