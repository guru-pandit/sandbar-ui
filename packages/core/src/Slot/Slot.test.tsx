import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Slot } from './Slot';

describe('Slot', () => {
  it('renders the child element itself, not a wrapper', () => {
    render(
      <Slot data-testid="slot">
        <a href="/x">link</a>
      </Slot>,
    );
    const el = screen.getByText('link');
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/x');
    expect(el).toHaveAttribute('data-testid', 'slot');
  });

  it('forwards the ref to the child DOM node', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Slot ref={ref as never}>
        <a href="/x">link</a>
      </Slot>,
    );
    expect(ref.current?.tagName).toBe('A');
  });

  it('merges the child ref with the forwarded ref', () => {
    const outerRef = createRef<HTMLButtonElement>();
    const innerRef = createRef<HTMLButtonElement>();
    render(
      <Slot ref={outerRef as never}>
        <button ref={innerRef}>go</button>
      </Slot>,
    );
    expect(outerRef.current).toBe(innerRef.current);
    expect(outerRef.current?.tagName).toBe('BUTTON');
  });

  it('composes event handlers — child handler runs before Slot handler', async () => {
    const order: string[] = [];
    const user = userEvent.setup();
    render(
      <Slot onClick={() => order.push('slot')}>
        <button onClick={() => order.push('child')}>go</button>
      </Slot>,
    );
    await user.click(screen.getByText('go'));
    expect(order).toEqual(['child', 'slot']);
  });

  it('concatenates className', () => {
    render(
      <Slot className="from-slot">
        <button className="from-child">go</button>
      </Slot>,
    );
    expect(screen.getByText('go')).toHaveClass('from-slot', 'from-child');
  });

  it('lets the child value win for non-mergeable props', () => {
    render(
      <Slot data-state="closed">
        <button data-state="open">go</button>
      </Slot>,
    );
    expect(screen.getByText('go')).toHaveAttribute('data-state', 'open');
  });

  it('renders nothing and warns in dev when children is not a single valid element', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Slot>{'not an element'}</Slot>);
    expect(container).toBeEmptyDOMElement();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
