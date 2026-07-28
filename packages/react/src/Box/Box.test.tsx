import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('renders a div by default', () => {
    render(<Box>content</Box>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('renders as a different element via `as`', () => {
    render(<Box as="section">content</Box>);
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Box asChild>
        <a href="/x">content</a>
      </Box>,
    );
    const el = screen.getByText('content');
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/x');
  });

  it('forwards ref to the underlying DOM node', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Box ref={ref}>content</Box>);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('spreads DOM props', () => {
    render(<Box data-testid="box" id="my-box">content</Box>);
    expect(screen.getByTestId('box')).toHaveAttribute('id', 'my-box');
  });
});
