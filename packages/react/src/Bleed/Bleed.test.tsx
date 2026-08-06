import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Bleed } from './Bleed';

describe('Bleed', () => {
  it('renders a div by default', () => {
    render(<Bleed>content</Bleed>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies inline=md and block=none by default', () => {
    render(<Bleed data-testid="b">content</Bleed>);
    const el = screen.getByTestId('b');
    expect(el).toHaveClass('panux-inline-md');
    expect(el).toHaveClass('panux-block-none');
  });

  it('applies explicit inline/block variants', () => {
    render(
      <Bleed inline="lg" block="sm" data-testid="b">
        content
      </Bleed>,
    );
    const el = screen.getByTestId('b');
    expect(el).toHaveClass('panux-inline-lg');
    expect(el).toHaveClass('panux-block-sm');
  });

  it('renders as a different element via `as`', () => {
    render(<Bleed as="section">content</Bleed>);
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Bleed asChild>
        <section>content</section>
      </Bleed>,
    );
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Bleed ref={ref}>content</Bleed>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
