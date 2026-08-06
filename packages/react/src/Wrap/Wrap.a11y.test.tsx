import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Wrap } from './Wrap';

describe('Wrap a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Wrap>
        <span>tag-one</span>
        <span>tag-two</span>
      </Wrap>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
