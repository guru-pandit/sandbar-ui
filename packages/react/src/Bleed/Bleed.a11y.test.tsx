import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Bleed } from './Bleed';

describe('Bleed a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Bleed>
        <p>content</p>
      </Bleed>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
