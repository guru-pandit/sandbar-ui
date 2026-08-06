import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Flex>
        <p>content</p>
      </Flex>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
