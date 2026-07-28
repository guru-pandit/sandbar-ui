import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Center } from './Center';

describe('Center a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Center>
        <p>content</p>
      </Center>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
