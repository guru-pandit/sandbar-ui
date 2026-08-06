import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Box>
        <p>content</p>
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has zero axe violations rendered as a landmark element', async () => {
    const { container } = render(
      <Box as="section" aria-label="Panel">
        content
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has zero axe violations when rendered onto a child via asChild', async () => {
    const { container } = render(
      <Box asChild>
        <a href="/x">content</a>
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
