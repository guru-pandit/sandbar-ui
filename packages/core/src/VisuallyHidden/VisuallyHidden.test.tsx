import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders a span with the clip technique applied', () => {
    render(<VisuallyHidden>label text</VisuallyHidden>);
    const el = screen.getByText('label text');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveStyle({ position: 'absolute', overflow: 'hidden' });
  });

  it('stays in the accessible name / text content (not aria-hidden)', () => {
    render(<VisuallyHidden>label text</VisuallyHidden>);
    expect(screen.getByText('label text')).not.toHaveAttribute('aria-hidden');
  });

  it('renders onto the child element via asChild', () => {
    render(
      <VisuallyHidden asChild>
        <label htmlFor="x">label text</label>
      </VisuallyHidden>,
    );
    const el = screen.getByText('label text');
    expect(el.tagName).toBe('LABEL');
    expect(el).toHaveAttribute('for', 'x');
    expect(el).toHaveStyle({ position: 'absolute' });
  });

  it('lets consumer style override the technique where explicitly set', () => {
    // Longhand, not the `border` shorthand — jsdom's cssstyle doesn't
    // reliably expand shorthand properties, which makes toHaveStyle flaky
    // for them regardless of what the component actually applied.
    render(<VisuallyHidden style={{ borderWidth: '1px' }}>text</VisuallyHidden>);
    expect(screen.getByText('text')).toHaveStyle({ borderWidth: '1px' });
  });
});
