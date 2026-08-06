import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './AspectRatio';
import { aspectRatioClassName } from './AspectRatio.css';

describe('AspectRatio', () => {
  it('renders a div by default', () => {
    render(<AspectRatio>content</AspectRatio>);
    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('applies the base recipe className by default', () => {
    render(<AspectRatio data-testid="ratio">content</AspectRatio>);
    expect(screen.getByTestId('ratio')).toHaveClass(aspectRatioClassName);
  });

  it('applies a ratio of 0 (falsy but explicitly set) rather than falling back to the default', () => {
    render(
      <AspectRatio ratio={0} data-testid="ratio">
        content
      </AspectRatio>,
    );
    expect(screen.getByTestId('ratio').style.aspectRatio).toBe('0 / 1');
  });

  it('lets a consumer-supplied style.aspectRatio win over the `ratio` prop', () => {
    render(
      <AspectRatio ratio={16 / 9} style={{ aspectRatio: '2 / 1' }} data-testid="ratio">
        content
      </AspectRatio>,
    );
    expect(screen.getByTestId('ratio').style.aspectRatio).toBe('2 / 1');
  });

  // jsdom's CSSOM normalizes a bare aspect-ratio number to the canonical
  // `<value> / 1` form — assert against that, not the raw input string.
  it('applies the default 4/3 ratio', () => {
    render(<AspectRatio data-testid="ratio">content</AspectRatio>);
    expect(screen.getByTestId('ratio').style.aspectRatio).toBe(`${4 / 3} / 1`);
  });

  it('applies a custom ratio', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="ratio">
        content
      </AspectRatio>,
    );
    expect(screen.getByTestId('ratio').style.aspectRatio).toBe(`${16 / 9} / 1`);
  });

  it('merges a consumer style with the resolved ratio', () => {
    render(
      <AspectRatio ratio={1} style={{ maxWidth: 400 }} data-testid="ratio">
        content
      </AspectRatio>,
    );
    const el = screen.getByTestId('ratio');
    expect(el.style.aspectRatio).toBe('1 / 1');
    expect(el.style.maxWidth).toBe('400px');
  });

  it('renders as a different element via `as`', () => {
    render(<AspectRatio as="figure">content</AspectRatio>);
    expect(screen.getByText('content').tagName).toBe('FIGURE');
  });

  it('renders onto the child via asChild', () => {
    render(
      <AspectRatio asChild>
        <img src="/photo.jpg" alt="" data-testid="img" />
      </AspectRatio>,
    );
    expect(screen.getByTestId('img').tagName).toBe('IMG');
  });

  it('forwards ref to the underlying DOM node', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio ref={ref}>content</AspectRatio>);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('merges a consumer className with the recipe className', () => {
    render(
      <AspectRatio className="custom" data-testid="ratio">
        content
      </AspectRatio>,
    );
    const el = screen.getByTestId('ratio');
    expect(el).toHaveClass('custom');
    expect(el).toHaveClass(aspectRatioClassName);
  });

  it('spreads remaining DOM props', () => {
    render(
      <AspectRatio data-testid="ratio" aria-label="preview">
        content
      </AspectRatio>,
    );
    expect(screen.getByTestId('ratio')).toHaveAttribute('aria-label', 'preview');
  });

  it('renders to a static string on the server without throwing', () => {
    expect(() =>
      renderToStaticMarkup(
        <AspectRatio ratio={16 / 9}>
          <img src="/photo.jpg" alt="" />
        </AspectRatio>,
      ),
    ).not.toThrow();
  });
});
