import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio a11y', () => {
  it('has zero axe violations with text content', async () => {
    const { container } = render(
      <AspectRatio>
        <p>content</p>
      </AspectRatio>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has zero axe violations wrapping an image', async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="/photo.jpg" alt="A description of the photo" />
      </AspectRatio>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
