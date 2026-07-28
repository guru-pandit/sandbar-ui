import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { useFocusTrap } from './useFocusTrap';

function Trap({ enabled = true, children }: { enabled?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, { enabled });
  return (
    <div>
      <button>outside before</button>
      <div ref={ref} data-testid="trap">
        {children}
      </div>
      <button>outside after</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('moves initial focus to the first focusable descendant', () => {
    render(
      <Trap>
        <button>first</button>
        <button>second</button>
      </Trap>,
    );
    expect(screen.getByText('first')).toHaveFocus();
  });

  it('focuses the container itself when it has no focusable descendants', () => {
    render(<Trap>plain text</Trap>);
    expect(screen.getByTestId('trap')).toHaveFocus();
  });

  it('wraps Tab from the last focusable back to the first', async () => {
    const user = userEvent.setup();
    render(
      <Trap>
        <button>first</button>
        <button>second</button>
      </Trap>,
    );
    screen.getByText('second').focus();
    await user.tab();
    expect(screen.getByText('first')).toHaveFocus();
  });

  it('wraps Shift+Tab from the first focusable back to the last', async () => {
    const user = userEvent.setup();
    render(
      <Trap>
        <button>first</button>
        <button>second</button>
      </Trap>,
    );
    expect(screen.getByText('first')).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByText('second')).toHaveFocus();
  });

  it('restores focus to the previously focused element on unmount', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const { unmount } = render(
      <Trap>
        <button>first</button>
      </Trap>,
    );
    expect(screen.getByText('first')).toHaveFocus();

    unmount();
    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it('does nothing when disabled', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    render(
      <Trap enabled={false}>
        <button>first</button>
      </Trap>,
    );
    expect(trigger).toHaveFocus();
    trigger.remove();
  });
});
