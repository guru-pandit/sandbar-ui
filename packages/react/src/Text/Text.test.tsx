import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders a span by default', () => {
    render(<Text>content</Text>);
    expect(screen.getByText('content').tagName).toBe('SPAN');
  });

  it('applies the default size/weight/color variants', () => {
    render(<Text data-testid="t">content</Text>);
    const el = screen.getByTestId('t');
    expect(el).toHaveClass('sandbar-size-md');
    expect(el).toHaveClass('sandbar-weight-regular');
    expect(el).toHaveClass('sandbar-color-default');
  });

  it('applies explicit variants', () => {
    render(
      <Text size="lg" weight="bold" color="danger" data-testid="t">
        content
      </Text>,
    );
    const el = screen.getByTestId('t');
    expect(el).toHaveClass('sandbar-size-lg');
    expect(el).toHaveClass('sandbar-weight-bold');
    expect(el).toHaveClass('sandbar-color-danger');
  });

  it('renders as a different element via `as`', () => {
    render(<Text as="p">content</Text>);
    expect(screen.getByText('content').tagName).toBe('P');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Text asChild>
        <label htmlFor="x">content</label>
      </Text>,
    );
    expect(screen.getByText('content').tagName).toBe('LABEL');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Text ref={ref}>content</Text>);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
