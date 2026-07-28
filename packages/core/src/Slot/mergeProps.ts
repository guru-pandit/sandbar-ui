/**
 * Merges Slot's own resolved props with the single child's props: event
 * handlers compose (child's handler runs first, then Slot's), `className`
 * concatenates, `style` shallow-merges, everything else the child specifies
 * wins over Slot's value. See .claude/context/react-patterns.md §asChild.
 */
export function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...slotProps };

  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    const isHandler = /^on[A-Z]/.test(key) && typeof slotValue === 'function' && typeof childValue === 'function';

    if (isHandler) {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    } else if (key === 'className' && typeof slotValue === 'string' && typeof childValue === 'string') {
      merged[key] = `${slotValue} ${childValue}`;
    } else if (key === 'style' && isPlainObject(slotValue) && isPlainObject(childValue)) {
      merged[key] = { ...slotValue, ...childValue };
    } else {
      merged[key] = childValue;
    }
  }

  return merged;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
