import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Grid columns={2}>
        <p>one</p>
        <p>two</p>
      </Grid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
