import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Group } from './Group';

describe('Group a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Group>
        <button type="button">One</button>
        <button type="button">Two</button>
      </Group>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
