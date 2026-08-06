import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Float } from './Float';

describe('Float', () => {
  it('renders a div by default', () => {
    render(<Float>content</Float>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies top-end/sm by default', () => {
    render(<Float data-testid="f">content</Float>);
    const el = screen.getByTestId('f');
    expect(el).toHaveClass('sandbar-placement-top-end');
    expect(el).toHaveClass('sandbar-offset-sm');
  });

  it('applies an explicit placement/offset', () => {
    render(
      <Float placement="bottom-start" offset="lg" data-testid="f">
        content
      </Float>,
    );
    const el = screen.getByTestId('f');
    expect(el).toHaveClass('sandbar-placement-bottom-start');
    expect(el).toHaveClass('sandbar-offset-lg');
  });

  it('renders as a different element via `as`', () => {
    render(<Float as="span">content</Float>);
    expect(screen.getByText('content').tagName).toBe('SPAN');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Float asChild>
        <span>content</span>
      </Float>,
    );
    expect(screen.getByText('content').tagName).toBe('SPAN');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Float ref={ref}>content</Float>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
