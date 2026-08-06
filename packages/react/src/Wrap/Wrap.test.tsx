import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Wrap } from './Wrap';

describe('Wrap', () => {
  it('renders a div by default', () => {
    render(<Wrap>content</Wrap>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the default variants', () => {
    render(<Wrap data-testid="w">content</Wrap>);
    const el = screen.getByTestId('w');
    expect(el).toHaveClass('panux-gap-sm');
    expect(el).toHaveClass('panux-align-start');
  });

  it('applies explicit variants', () => {
    render(
      <Wrap gap="lg" align="center" data-testid="w">
        content
      </Wrap>,
    );
    const el = screen.getByTestId('w');
    expect(el).toHaveClass('panux-gap-lg');
    expect(el).toHaveClass('panux-align-center');
  });

  it('renders as a different element via `as`', () => {
    render(<Wrap as="ul">content</Wrap>);
    expect(screen.getByText('content').tagName).toBe('UL');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Wrap asChild>
        <ul>content</ul>
      </Wrap>,
    );
    expect(screen.getByText('content').tagName).toBe('UL');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Wrap ref={ref}>content</Wrap>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
