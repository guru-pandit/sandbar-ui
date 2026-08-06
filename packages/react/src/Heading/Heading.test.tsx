import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders an h2 by default', () => {
    render(<Heading>content</Heading>);
    expect(screen.getByText('content').tagName).toBe('H2');
  });

  it('renders the requested semantic level', () => {
    render(<Heading level={1}>content</Heading>);
    expect(screen.getByText('content').tagName).toBe('H1');
  });

  it('decouples visual size from semantic level', () => {
    render(
      <Heading level={4} size="xl" data-testid="h">
        content
      </Heading>,
    );
    const el = screen.getByTestId('h');
    expect(el.tagName).toBe('H4');
    expect(el).toHaveClass('panux-size-xl');
  });

  it('renders onto the child via asChild', () => {
    render(
      <Heading asChild level={3}>
        <a href="/x">content</a>
      </Heading>,
    );
    expect(screen.getByText('content').tagName).toBe('A');
  });

  it('forwards ref to the underlying heading element', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>content</Heading>);
    expect(ref.current?.tagName).toBe('H2');
  });
});
