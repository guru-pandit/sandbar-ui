import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { SimpleGrid } from './SimpleGrid';

describe('SimpleGrid a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <SimpleGrid columns={3}>
        <p>one</p>
        <p>two</p>
        <p>three</p>
      </SimpleGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
