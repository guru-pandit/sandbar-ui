import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { SimpleGrid } from './SimpleGrid';

describe('SimpleGrid', () => {
  it('renders a div by default', () => {
    render(<SimpleGrid>content</SimpleGrid>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies gap=md by default', () => {
    render(<SimpleGrid data-testid="g">content</SimpleGrid>);
    expect(screen.getByTestId('g')).toHaveClass('sandbar-gap-md');
  });

  it('applies `columns` as an inline gridTemplateColumns style', () => {
    render(
      <SimpleGrid columns={4} data-testid="g">
        content
      </SimpleGrid>,
    );
    expect(screen.getByTestId('g')).toHaveStyle({ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' });
  });

  it('applies `minChildWidth` as an auto-fit template when `columns` is omitted', () => {
    render(
      <SimpleGrid minChildWidth="200px" data-testid="g">
        content
      </SimpleGrid>,
    );
    expect(screen.getByTestId('g')).toHaveStyle({ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' });
  });

  it('prefers `columns` over `minChildWidth` when both are set', () => {
    render(
      <SimpleGrid columns={2} minChildWidth="200px" data-testid="g">
        content
      </SimpleGrid>,
    );
    expect(screen.getByTestId('g')).toHaveStyle({ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' });
  });

  it('renders as a different element via `as`', () => {
    render(<SimpleGrid as="section">content</SimpleGrid>);
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('renders onto the child via asChild', () => {
    render(
      <SimpleGrid asChild>
        <section>content</section>
      </SimpleGrid>,
    );
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<SimpleGrid ref={ref}>content</SimpleGrid>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
