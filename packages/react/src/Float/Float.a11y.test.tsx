import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Float } from './Float';

describe('Float a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <div style={{ position: 'relative' }}>
        <Float aria-hidden="true" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
