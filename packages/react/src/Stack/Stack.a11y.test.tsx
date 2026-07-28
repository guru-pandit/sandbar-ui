import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack a11y', () => {
  it('has zero axe violations with default props', async () => {
    const { container } = render(
      <Stack>
        <button>one</button>
        <button>two</button>
      </Stack>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has zero axe violations across every direction/align combination', async () => {
    const { container } = render(
      <>
        <Stack direction="vertical" align="start">
          <span>a</span>
        </Stack>
        <Stack direction="horizontal" align="center" wrap>
          <span>b</span>
        </Stack>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
