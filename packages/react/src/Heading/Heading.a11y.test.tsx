import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading a11y', () => {
  it('has zero axe violations across levels 1-6', async () => {
    const { container } = render(
      <>
        <Heading level={1}>h1</Heading>
        <Heading level={2}>h2</Heading>
        <Heading level={3}>h3</Heading>
        <Heading level={4}>h4</Heading>
        <Heading level={5}>h5</Heading>
        <Heading level={6}>h6</Heading>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
