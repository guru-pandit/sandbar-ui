import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Center } from './Center';

describe('Center', () => {
  it('renders a div by default', () => {
    render(<Center>content</Center>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the block (non-inline) variant by default', () => {
    render(<Center data-testid="c">content</Center>);
    expect(screen.getByTestId('c')).toHaveClass('panux-inline-false');
  });

  it('applies the inline variant', () => {
    render(
      <Center inline data-testid="c">
        content
      </Center>,
    );
    expect(screen.getByTestId('c')).toHaveClass('panux-inline-true');
  });

  it('renders as a different element via `as`', () => {
    render(<Center as="span">content</Center>);
    expect(screen.getByText('content').tagName).toBe('SPAN');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Center asChild>
        <button>content</button>
      </Center>,
    );
    expect(screen.getByText('content').tagName).toBe('BUTTON');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Center ref={ref}>content</Center>);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
