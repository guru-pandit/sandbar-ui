'use client';

import {
  AspectRatio,
  Bleed,
  Box,
  Center,
  Container,
  Flex,
  Float,
  Grid,
  Group,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@sandbar-ui/react';
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
// AspectRatio
// ---------------------------------------------------------------------------

function AspectRatioSwatch() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'var(--sandbar-accent-bg)',
        border: '1px dashed var(--sandbar-accent-border)',
        fontSize: 13,
      }}
    >
      content
    </div>
  );
}

export function AspectRatioUsageExample() {
  return (
    <Example code={`<AspectRatio ratio={16 / 9}>\n  <img src="/photo.jpg" alt="" />\n</AspectRatio>`}>
      <div style={{ width: 280 }}>
        <AspectRatio ratio={16 / 9}>
          <AspectRatioSwatch />
        </AspectRatio>
      </div>
    </Example>
  );
}

export function AspectRatioRatioExample() {
  const ratios = [
    { label: '16 / 9', value: 16 / 9 },
    { label: '4 / 3', value: 4 / 3 },
    { label: '1 / 1', value: 1 },
    { label: '21 / 9', value: 21 / 9 },
  ] as const;
  return (
    <Example
      code={ratios.map(({ label }) => `<AspectRatio ratio={${label}}>...</AspectRatio>`).join('\n')}
    >
      {ratios.map(({ label, value }) => (
        <div key={label} style={{ width: 200 }}>
          <Text size="xs" color="muted">
            ratio={label}
          </Text>
          <AspectRatio ratio={value}>
            <AspectRatioSwatch />
          </AspectRatio>
        </div>
      ))}
    </Example>
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

export function HeadingWeightsExample() {
  return (
    <Example
      code={(['semibold', 'bold'] as const)
        .map((weight) => `<Heading level={2} weight="${weight}">Heading</Heading>`)
        .join('\n')}
    >
      <Stack gap="sm">
        {(['semibold', 'bold'] as const).map((weight) => (
          <Heading key={weight} level={2} weight={weight}>
            Heading
          </Heading>
        ))}
      </Stack>
    </Example>
  );
}

export function HeadingColorsExample() {
  return (
    <Example
      code={(['default', 'muted', 'accent'] as const)
        .map((color) => `<Heading level={2} color="${color}">Heading</Heading>`)
        .join('\n')}
    >
      <Stack gap="sm">
        {(['default', 'muted', 'accent'] as const).map((color) => (
          <Heading key={color} level={2} color={color}>
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
      <Box
        as="section"
        style={{
          padding: 16,
          background: 'var(--sandbar-accent-bg)',
          border: '1px solid var(--sandbar-accent-border)',
          borderRadius: 'var(--sandbar-radius-sm)',
          fontSize: 13,
        }}
      >
        {'<section>'}
      </Box>
    </Example>
  );
}

export function BoxAsExample() {
  return (
    <Example
      code={(['div', 'section', 'article', 'span'] as const)
        .map((tag) => `<Box as="${tag}">...</Box>`)
        .join('\n')}
    >
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

// ---------------------------------------------------------------------------
// Flex
// ---------------------------------------------------------------------------

export function FlexUsageExample() {
  return (
    <Example code={`<Flex gap="md" align="center">\n  <Avatar />\n  <Text>Name</Text>\n</Flex>`}>
      <Flex gap="md" align="center">
        <Swatch label="Avatar" />
        <Text>Name</Text>
      </Flex>
    </Example>
  );
}

export function FlexDirectionExample() {
  return (
    <Example
      code={(['row', 'column', 'row-reverse', 'column-reverse'] as const)
        .map((direction) => `<Flex direction="${direction}">...</Flex>`)
        .join('\n')}
    >
      <Stack gap="md">
        {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((direction) => (
          <Stack key={direction} gap="sm" direction="horizontal" align="center">
            <Text size="xs" color="muted">
              {direction}
            </Text>
            <Flex direction={direction} gap="sm">
              <Swatch label="One" />
              <Swatch label="Two" />
              <Swatch label="Three" />
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Example>
  );
}

export function FlexJustifyExample() {
  return (
    <Example
      code={(['start', 'center', 'end', 'between', 'around', 'evenly'] as const)
        .map((justify) => `<Flex justify="${justify}">...</Flex>`)
        .join('\n')}
    >
      <Stack gap="sm" style={{ width: '100%' }}>
        {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
          <Flex
            key={justify}
            justify={justify}
            style={{ width: '100%', background: 'var(--sandbar-bg-subtle)', padding: 8 }}
          >
            <Swatch label="One" />
            <Swatch label="Two" />
          </Flex>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Grid
// ---------------------------------------------------------------------------

function GridCell({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: 12,
        textAlign: 'center',
        background: 'var(--sandbar-accent-bg)',
        border: '1px dashed var(--sandbar-accent-border)',
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

export function GridUsageExample() {
  return (
    <Example code={`<Grid columns={3} gap="md">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</Grid>`}>
      <Grid columns={3} gap="md" style={{ width: '100%' }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <GridCell key={n} label={String(n)} />
        ))}
      </Grid>
    </Example>
  );
}

export function GridColumnsExample() {
  return (
    <Example
      code={([2, 3, 4] as const).map((columns) => `<Grid columns={${columns}}>...</Grid>`).join('\n')}
    >
      <Stack gap="md" style={{ width: '100%' }}>
        {([2, 3, 4] as const).map((columns) => (
          <Grid key={columns} columns={columns} gap="sm" style={{ width: '100%' }}>
            {Array.from({ length: columns * 2 }, (_, i) => (
              <GridCell key={i} label={`columns=${columns}`} />
            ))}
          </Grid>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// SimpleGrid
// ---------------------------------------------------------------------------

export function SimpleGridUsageExample() {
  return (
    <Example code={`<SimpleGrid columns={3} gap="md">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</SimpleGrid>`}>
      <SimpleGrid columns={3} gap="md" style={{ width: '100%' }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <GridCell key={n} label={String(n)} />
        ))}
      </SimpleGrid>
    </Example>
  );
}

export function SimpleGridColumnsExample() {
  return (
    <Example
      code={([2, 3, 4] as const)
        .map((columns) => `<SimpleGrid columns={${columns}}>...</SimpleGrid>`)
        .join('\n')}
    >
      <Stack gap="md" style={{ width: '100%' }}>
        {([2, 3, 4] as const).map((columns) => (
          <SimpleGrid key={columns} columns={columns} gap="sm" style={{ width: '100%' }}>
            {Array.from({ length: columns * 2 }, (_, i) => (
              <GridCell key={i} label={`columns=${columns}`} />
            ))}
          </SimpleGrid>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Group
// ---------------------------------------------------------------------------

function Chip({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '6px 12px',
        background: 'var(--sandbar-accent-solid)',
        color: 'var(--sandbar-fg-onAccent)',
        borderRadius: 999,
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

export function GroupUsageExample() {
  return (
    <Example code={`<Group>\n  <Button>Cancel</Button>\n  <Button>Save</Button>\n</Group>`}>
      <Group>
        <Chip label="Cancel" />
        <Chip label="Save" />
      </Group>
    </Example>
  );
}

export function GroupGapExample() {
  return (
    <Example code={(['none', 'sm', 'md', 'lg'] as const).map((gap) => `<Group gap="${gap}">...</Group>`).join('\n')}>
      <Stack gap="md">
        {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
          <Group key={gap} gap={gap}>
            <Chip label="One" />
            <Chip label="Two" />
          </Group>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Wrap
// ---------------------------------------------------------------------------

const wrapTags = ['React', 'TypeScript', 'Vanilla Extract', 'Accessibility', 'Design Tokens'];

export function WrapUsageExample() {
  return (
    <Example code={`<Wrap gap="sm">\n  <Tag>React</Tag>\n  <Tag>TypeScript</Tag>\n  ...\n</Wrap>`}>
      <Wrap gap="sm" style={{ maxWidth: 280 }}>
        {wrapTags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </Wrap>
    </Example>
  );
}

export function WrapGapExample() {
  return (
    <Example code={(['none', 'sm', 'md', 'lg'] as const).map((gap) => `<Wrap gap="${gap}">...</Wrap>`).join('\n')}>
      <Stack gap="md">
        {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
          <Wrap key={gap} gap={gap} style={{ maxWidth: 240 }}>
            {wrapTags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Wrap>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Bleed
// ---------------------------------------------------------------------------

export function BleedUsageExample() {
  return (
    <Example code={`<Box style={{ padding: 24 }}>\n  <Bleed>Full-bleed content</Bleed>\n</Box>`}>
      <Box style={{ padding: 24, background: 'var(--sandbar-bg-subtle)', width: '100%' }}>
        <Bleed style={{ background: 'var(--sandbar-accent-solid)', color: 'var(--sandbar-fg-onAccent)', padding: 12, fontSize: 13 }}>
          Full-bleed content
        </Bleed>
      </Box>
    </Example>
  );
}

export function BleedInlineExample() {
  return (
    <Example
      code={(['none', 'sm', 'md', 'lg'] as const).map((inline) => `<Bleed inline="${inline}">...</Bleed>`).join('\n')}
    >
      <Stack gap="md" style={{ width: '100%' }}>
        {(['none', 'sm', 'md', 'lg'] as const).map((inline) => (
          <Box key={inline} style={{ padding: 24, background: 'var(--sandbar-bg-subtle)', width: '100%' }}>
            <Bleed
              inline={inline}
              style={{ background: 'var(--sandbar-accent-solid)', color: 'var(--sandbar-fg-onAccent)', padding: 12, fontSize: 13 }}
            >
              inline=&quot;{inline}&quot;
            </Bleed>
          </Box>
        ))}
      </Stack>
    </Example>
  );
}

// ---------------------------------------------------------------------------
// Float
// ---------------------------------------------------------------------------

function FloatAnchor({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--sandbar-accent-bg)',
        border: '1px dashed var(--sandbar-accent-border)',
      }}
    >
      {children}
    </div>
  );
}

function FloatDot() {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--sandbar-accent-solid)',
        border: '2px solid var(--sandbar-bg-canvas)',
      }}
    />
  );
}

export function FloatUsageExample() {
  return (
    <Example code={`<Box style={{ position: 'relative' }}>\n  <Avatar />\n  <Float placement="top-end">\n    <StatusDot />\n  </Float>\n</Box>`}>
      <FloatAnchor>
        <Float placement="top-end">
          <FloatDot />
        </Float>
      </FloatAnchor>
    </Example>
  );
}

export function FloatPlacementExample() {
  return (
    <Example
      code={(['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const)
        .map((placement) => `<Float placement="${placement}">...</Float>`)
        .join('\n')}
    >
      {(['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const).map((placement) => (
        <FloatAnchor key={placement}>
          <Float placement={placement}>
            <FloatDot />
          </Float>
        </FloatAnchor>
      ))}
    </Example>
  );
}
