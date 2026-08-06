import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Group } from './Group';

describe('Group', () => {
  it('renders a div by default', () => {
    render(<Group>content</Group>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the default variants', () => {
    render(<Group data-testid="g">content</Group>);
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('sandbar-gap-sm');
    expect(el).toHaveClass('sandbar-align-center');
    expect(el).toHaveClass('sandbar-wrap-false');
  });

  it('applies explicit variants', () => {
    render(
      <Group gap="lg" align="start" wrap data-testid="g">
        content
      </Group>,
    );
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('sandbar-gap-lg');
    expect(el).toHaveClass('sandbar-align-start');
    expect(el).toHaveClass('sandbar-wrap-true');
  });

  it('renders as a different element via `as`', () => {
    render(<Group as="ul">content</Group>);
    expect(screen.getByText('content').tagName).toBe('UL');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Group asChild>
        <ul>content</ul>
      </Group>,
    );
    expect(screen.getByText('content').tagName).toBe('UL');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Group ref={ref}>content</Group>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
