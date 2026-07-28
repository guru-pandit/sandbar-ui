import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useDismissable } from './useDismissable';

function setup(onDismiss: () => void, enabled = true) {
  const outside = document.createElement('button');
  outside.textContent = 'outside';
  document.body.appendChild(outside);

  const container = document.createElement('div');
  document.body.appendChild(container);
  const ref = { current: container };

  renderHook(() => useDismissable(ref, { enabled, onDismiss }));
  return { outside, container };
}

describe('useDismissable', () => {
  it('calls onDismiss on an outside pointerdown', async () => {
    const onDismiss = vi.fn();
    const { outside } = setup(onDismiss);
    const user = userEvent.setup();
    await user.pointer({ keys: '[MouseLeft]', target: outside });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss on an inside pointerdown', async () => {
    const onDismiss = vi.fn();
    const { container } = setup(onDismiss);
    const user = userEvent.setup();
    await user.pointer({ keys: '[MouseLeft]', target: container });
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls onDismiss on Escape', async () => {
    const onDismiss = vi.fn();
    setup(onDismiss);
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled', async () => {
    const onDismiss = vi.fn();
    const { outside } = setup(onDismiss, false);
    const user = userEvent.setup();
    await user.pointer({ keys: '[MouseLeft]', target: outside });
    await user.keyboard('{Escape}');
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('always calls the latest onDismiss without re-subscribing per render', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = { current: container };

    const { rerender } = renderHook(({ cb }) => useDismissable(ref, { onDismiss: cb }), {
      initialProps: { cb: first },
    });
    rerender({ cb: second });

    const user = userEvent.setup();
    await user.pointer({ keys: '[MouseLeft]', target: outside });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
