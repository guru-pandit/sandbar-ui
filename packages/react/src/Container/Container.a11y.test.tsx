import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(
      <Container>
        <p>content</p>
      </Container>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
