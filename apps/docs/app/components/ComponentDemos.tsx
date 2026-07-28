'use client';

import { Box, Center, Container, Heading, Stack, Text } from '@sandbar-ui/react';
import { Example } from './Example';

function Swatch({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: 'var(--sandbar-accent-solid)',
        color: 'var(--sandbar-fg-onAccent)',
        borderRadius: 'var(--sandbar-radius-sm)',
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

export function TextUsageExample() {
  return (
    <Example code={`<Text size="sm" color="muted">\n  Helper text.\n</Text>`}>
      <Text size="sm" color="muted">
        Helper text.
      </Text>
    </Example>
  );
}

export function TextSizesExample() {
  return (
    <Example
      code={(['xs', 'sm', 'md', 'lg', 'xl'] as const)
        .map((size) => `<Text size="${size}">The container for your interface.</Text>`)
        .join('\n')}
    >
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Text key={size} size={size}>
          The container for your interface.
        </Text>
      ))}
    </Example>
  );
}

export function TextWeightsExample() {
  return (
    <Example
      code={(['regular', 'medium', 'semibold', 'bold'] as const)
        .map((weight) => `<Text weight="${weight}">The container for your interface.</Text>`)
        .join('\n')}
    >
      {(['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Text key={weight} weight={weight}>
          The container for your interface.
        </Text>
      ))}
    </Example>
  );
}

export function TextColorsExample() {
  return (
    <Example
      code={(['default', 'muted', 'accent', 'danger'] as const)
        .map((color) => `<Text color="${color}">The container for your interface.</Text>`)
        .join('\n')}
    >
      {(['default', 'muted', 'accent', 'danger'] as const).map((color) => (
        <Text key={color} color={color}>
          The container for your interface.
        </Text>
      ))}
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------

export function HeadingUsageExample() {
  return (
    <Example code={`<Heading level={1} size="xl">\n  Page title\n</Heading>`}>
      <Heading level={1} size="xl">
        Page title
      </Heading>
    </Example>
  );
}

export function HeadingLevelsExample() {
  return (
    <Example
      code={([1, 2, 3, 4, 5, 6] as const).map((level) => `<Heading level={${level}}>Heading level ${level}</Heading>`).join('\n')}
    >
      <Stack gap="sm">
        {([1, 2, 3, 4, 5, 6] as const).map((level) => (
          <Heading key={level} level={level}>
            Heading level {level}
          </Heading>
        ))}
      </Stack>
    </Example>
  );
}

export function HeadingSizesExample() {
  return (
    <Example
      code={(['sm', 'md', 'lg', 'xl'] as const).map((size) => `<Heading level={2} size="${size}">Heading</Heading>`).join('\n')}
    >
      <Stack gap="sm">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Heading key={size} level={2} size={size}>
            Heading
          </Heading>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Stack
// ---------------------------------------------------------------------------

export function StackUsageExample() {
  return (
    <Example code={`<Stack direction="horizontal" gap="md" align="center">\n  <Avatar />\n  <Text>Name</Text>\n</Stack>`}>
      <Stack direction="horizontal" gap="md" align="center">
        <Swatch label="Avatar" />
        <Text>Name</Text>
      </Stack>
    </Example>
  );
}

export function StackDirectionExample() {
  return (
    <Example
      code={`<Stack direction="vertical">...</Stack>\n<Stack direction="horizontal">...</Stack>`}
    >
      {(['vertical', 'horizontal'] as const).map((direction) => (
        <Stack key={direction} direction={direction} gap="sm">
          <Swatch label="One" />
          <Swatch label="Two" />
          <Swatch label="Three" />
        </Stack>
      ))}
    </Example>
  );
}

export function StackGapExample() {
  return (
    <Example code={(['none', 'sm', 'md', 'lg'] as const).map((gap) => `<Stack direction="horizontal" gap="${gap}">...</Stack>`).join('\n')}>
      <Stack gap="lg">
        {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
          <Stack key={gap} direction="horizontal" gap={gap}>
            <Swatch label="One" />
            <Swatch label="Two" />
          </Stack>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export function ContainerUsageExample() {
  return (
    <Example code={`<Container size="md">\n  Page content\n</Container>`}>
      <Stack gap="sm" style={{ width: '100%' }}>
        {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
          <Container
            key={size}
            size={size}
            style={{
              background: 'var(--sandbar-accent-bg)',
              border: '1px dashed var(--sandbar-accent-border)',
              padding: 12,
              fontSize: 13,
            }}
          >
            size=&quot;{size}&quot;
          </Container>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Center
// ---------------------------------------------------------------------------

export function CenterUsageExample() {
  return (
    <Example code={`<Center style={{ width: 200, height: 100 }}>\n  <Swatch />\n</Center>`}>
      <Center style={{ width: 200, height: 100, background: 'var(--sandbar-accent-bg)', borderRadius: 'var(--sandbar-radius-sm)' }}>
        <Swatch label="centered" />
      </Center>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Box
// ---------------------------------------------------------------------------

export function BoxUsageExample() {
  return (
    <Example code={`<Box as="section" data-testid="panel">\n  content\n</Box>`}>
      {(['div', 'section', 'article', 'span'] as const).map((tag) => (
        <Box
          key={tag}
          as={tag}
          style={{
            padding: 16,
            background: 'var(--sandbar-accent-bg)',
            border: '1px solid var(--sandbar-accent-border)',
            borderRadius: 'var(--sandbar-radius-sm)',
            fontSize: 13,
          }}
        >
          {`<${tag}>`}
        </Box>
      ))}
    </Example>
  );
}
