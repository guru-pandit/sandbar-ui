import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('manages its own state when uncontrolled', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a' }));
    expect(result.current[0]).toBe('a');
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
  });

  it('calls onChange when uncontrolled state changes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a', onChange }));
    act(() => result.current[1]('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('is driven entirely by `value` when controlled, never mutating internally', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 'a', onChange }),
      { initialProps: { value: 'x' } },
    );
    expect(result.current[0]).toBe('x');

    act(() => result.current[1]('y'));
    // Controlled: internal state must not change on its own — onChange fires,
    // but the value stays whatever the consumer passed until they re-render
    // with a new `value`.
    expect(onChange).toHaveBeenCalledWith('y');
    expect(result.current[0]).toBe('x');

    rerender({ value: 'y' });
    expect(result.current[0]).toBe('y');
  });
});
