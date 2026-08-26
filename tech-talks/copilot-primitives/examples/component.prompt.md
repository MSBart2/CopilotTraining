---
name: component
description: Generate a React component with TypeScript, tests, and documentation
tools: ["editFiles", "createFile"]
agent: agent
---

# Component Generator

Create a new React component: ${input:componentName:Component name}

Follow conventions in [coding standards](../copilot-instructions.md).

## Files to Create

Generate the following file structure:

```
src/components/${input:componentName}/
  ${input:componentName}.tsx           # Component implementation
  ${input:componentName}.types.ts      # TypeScript interfaces
  ${input:componentName}.module.css    # Component styles (CSS Modules)
  __tests__/
    ${input:componentName}.test.tsx    # Unit tests
  index.ts                             # Barrel export
```

## Component Template Requirements

### TypeScript Implementation

````typescript
import React from 'react';
import { ${input:componentName}Props } from './${input:componentName}.types';
import styles from './${input:componentName}.module.css';

/**
 * [Brief description of component purpose]
 *
 * @example
 * ```tsx
 * <${input:componentName} prop1="value" />
 * ```
 */
export const ${input:componentName}: React.FC<${input:componentName}Props> = ({
  // Destructure props here
}) => {
  return (
    <div className={styles.container} role="[appropriate-role]">
      {/* Component implementation */}
    </div>
  );
};
````

### Props Interface

```typescript
/**
 * Props for the ${input:componentName} component
 */
export interface ${input:componentName}Props {
  /**
   * [Prop description]
   */
  prop1: string;

  /**
   * [Prop description]
   * @default defaultValue
   */
  prop2?: number;
}
```

### Test Template

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ${input:componentName} } from '../${input:componentName}';

describe('${input:componentName}', () => {
  it('renders with default props', () => {
    render(<${input:componentName} prop1="test" />);
    expect(screen.getByRole('[role]')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<${input:componentName} prop1="test" />);
    // Test interactions
  });

  it('is accessible', () => {
    const { container } = render(<${input:componentName} prop1="test" />);
    // Run axe accessibility tests
  });
});
```

## Requirements Checklist

- [ ] Component uses TypeScript with explicit prop types
- [ ] JSDoc comments on component and all props
- [ ] Appropriate ARIA attributes for accessibility
- [ ] CSS Modules for styles (not inline styles)
- [ ] Unit tests with 100% coverage
- [ ] Tests include accessibility checks
- [ ] Barrel export in index.ts
- [ ] Named export (not default export)

## Usage After Creation

Import using barrel export:

```typescript
import { ${input:componentName} } from '@/components/${input:componentName}';
```

Component name: ${input:componentName}
