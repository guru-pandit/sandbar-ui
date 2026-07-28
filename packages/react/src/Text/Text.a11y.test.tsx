import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text a11y', () => {
  it('has zero axe violations', async () => {
    const { container } = render(<Text>Some readable text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
