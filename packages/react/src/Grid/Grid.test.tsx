import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders a div by default', () => {
    render(<Grid>content</Grid>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies gap=md and align=stretch by default', () => {
    render(<Grid data-testid="g">content</Grid>);
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('panux-gap-md');
    expect(el).toHaveClass('panux-align-stretch');
  });

  it('applies explicit gap/align variants', () => {
    render(
      <Grid gap="lg" align="center" data-testid="g">
        content
      </Grid>,
    );
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('panux-gap-lg');
    expect(el).toHaveClass('panux-align-center');
  });

  it('applies `columns` as an inline gridTemplateColumns style', () => {
    render(
      <Grid columns={3} data-testid="g">
        content
      </Grid>,
    );
    expect(screen.getByTestId('g')).toHaveStyle({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' });
  });

  it('leaves gridTemplateColumns unset when `columns` is omitted', () => {
    render(<Grid data-testid="g">content</Grid>);
    expect(screen.getByTestId('g').style.gridTemplateColumns).toBe('');
  });

  it('renders as a different element via `as`', () => {
    render(<Grid as="section">content</Grid>);
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Grid asChild>
        <section>content</section>
      </Grid>,
    );
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Grid ref={ref}>content</Grid>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
