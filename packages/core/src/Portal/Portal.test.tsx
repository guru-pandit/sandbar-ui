import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Portal } from './Portal';

describe('Portal', () => {
  it('renders children into document.body by default', async () => {
    render(
      <div data-testid="local-root">
        <Portal>
          <span>portaled</span>
        </Portal>
      </div>,
    );
    await waitFor(() => expect(screen.getByText('portaled')).toBeInTheDocument());
    expect(screen.getByTestId('local-root')).not.toContainElement(screen.getByText('portaled'));
    expect(document.body).toContainElement(screen.getByText('portaled'));
  });

  it('renders into a custom container when provided', async () => {
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'custom-container');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <span>portaled</span>
      </Portal>,
    );

    await waitFor(() => expect(screen.getByText('portaled')).toBeInTheDocument());
    expect(container).toContainElement(screen.getByText('portaled'));
    container.remove();
  });
});
