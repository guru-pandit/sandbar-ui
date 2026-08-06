import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders a div by default', () => {
    render(<Flex>content</Flex>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the default variants', () => {
    render(<Flex data-testid="f">content</Flex>);
    const el = screen.getByTestId('f');
    expect(el).toHaveClass('panux-direction-row');
    expect(el).toHaveClass('panux-align-stretch');
    expect(el).toHaveClass('panux-justify-start');
    expect(el).toHaveClass('panux-gap-none');
    expect(el).toHaveClass('panux-wrap-false');
  });

  it('applies explicit variants', () => {
    render(
      <Flex direction="column" align="center" justify="between" gap="lg" wrap data-testid="f">
        content
      </Flex>,
    );
    const el = screen.getByTestId('f');
    expect(el).toHaveClass('panux-direction-column');
    expect(el).toHaveClass('panux-align-center');
    expect(el).toHaveClass('panux-justify-between');
    expect(el).toHaveClass('panux-gap-lg');
    expect(el).toHaveClass('panux-wrap-true');
  });

  it('renders as a different element via `as`', () => {
    render(<Flex as="nav">content</Flex>);
    expect(screen.getByText('content').tagName).toBe('NAV');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Flex asChild>
        <nav>content</nav>
      </Flex>,
    );
    expect(screen.getByText('content').tagName).toBe('NAV');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flex ref={ref}>content</Flex>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
