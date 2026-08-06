import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders a div by default', () => {
    render(<Stack>content</Stack>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the vertical direction by default', () => {
    render(<Stack data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('panux-direction-vertical');
  });

  it('applies the horizontal direction variant', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        content
      </Stack>,
    );
    expect(screen.getByTestId('stack')).toHaveClass('panux-direction-horizontal');
  });

  it('applies gap/align/wrap variants', () => {
    render(
      <Stack gap="lg" align="center" wrap data-testid="stack">
        content
      </Stack>,
    );
    const el = screen.getByTestId('stack');
    expect(el).toHaveClass('panux-gap-lg');
    expect(el).toHaveClass('panux-align-center');
    expect(el).toHaveClass('panux-wrap-true');
  });

  it('renders as a different element via `as`', () => {
    render(<Stack as="section">content</Stack>);
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Stack asChild>
        <ul>content</ul>
      </Stack>,
    );
    expect(screen.getByText('content').tagName).toBe('UL');
  });

  it('forwards ref to the underlying DOM node', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stack ref={ref}>content</Stack>);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('merges a consumer className with the recipe className', () => {
    render(
      <Stack className="custom" data-testid="stack">
        content
      </Stack>,
    );
    const el = screen.getByTestId('stack');
    expect(el).toHaveClass('custom');
    expect(el).toHaveClass('panux-direction-vertical');
  });
});
