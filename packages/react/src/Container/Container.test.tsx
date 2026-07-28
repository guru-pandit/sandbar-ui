import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders a div by default', () => {
    render(<Container>content</Container>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the lg size by default', () => {
    render(<Container data-testid="c">content</Container>);
    expect(screen.getByTestId('c')).toHaveClass('sandbar-size-lg');
  });

  it('applies an explicit size variant', () => {
    render(
      <Container size="sm" data-testid="c">
        content
      </Container>,
    );
    expect(screen.getByTestId('c')).toHaveClass('sandbar-size-sm');
  });

  it('renders as a different element via `as`', () => {
    render(<Container as="main">content</Container>);
    expect(screen.getByText('content').tagName).toBe('MAIN');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Container asChild>
        <section>content</section>
      </Container>,
    );
    expect(screen.getByText('content').tagName).toBe('SECTION');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref}>content</Container>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
