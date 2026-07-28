import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useMergedRefs } from './useMergedRefs';

describe('useMergedRefs', () => {
  it('sets object refs', () => {
    const a = createRef<HTMLDivElement>();
    const b = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useMergedRefs(a, b));
    const node = document.createElement('div');
    result.current(node);
    expect(a.current).toBe(node);
    expect(b.current).toBe(node);
  });

  it('calls callback refs', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useMergedRefs(cb));
    const node = document.createElement('div');
    result.current(node);
    expect(cb).toHaveBeenCalledWith(node);
  });

  it('skips undefined/null refs', () => {
    const { result } = renderHook(() => useMergedRefs(undefined, null as never));
    expect(() => result.current(document.createElement('div'))).not.toThrow();
  });

  it('handles a mix of object and callback refs', () => {
    const objRef = createRef<HTMLDivElement>();
    const cb = vi.fn();
    const { result } = renderHook(() => useMergedRefs(objRef, cb, undefined));
    const node = document.createElement('div');
    result.current(node);
    expect(objRef.current).toBe(node);
    expect(cb).toHaveBeenCalledWith(node);
  });
});
