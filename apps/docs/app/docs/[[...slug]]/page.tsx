import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { notFound } from 'next/navigation';
import {
  AspectRatioRatioExample,
  AspectRatioUsageExample,
  BleedInlineExample,
  BleedUsageExample,
  BoxAsExample,
  BoxUsageExample,
  CenterUsageExample,
  ContainerUsageExample,
  FlexDirectionExample,
  FlexJustifyExample,
  FlexUsageExample,
  FloatPlacementExample,
  FloatUsageExample,
  GridColumnsExample,
  GridUsageExample,
  GroupGapExample,
  GroupUsageExample,
  HeadingColorsExample,
  HeadingLevelsExample,
  HeadingSizesExample,
  HeadingUsageExample,
  HeadingWeightsExample,
  SimpleGridColumnsExample,
  SimpleGridUsageExample,
  StackDirectionExample,
  StackGapExample,
  StackUsageExample,
  TextColorsExample,
  TextSizesExample,
  TextUsageExample,
  TextWeightsExample,
  WrapGapExample,
  WrapUsageExample,
} from '../../components/ComponentDemos';
import { PropsTable } from '../../components/PropsTable';
import { source } from '../../../lib/source';

const mdxComponents = {
  ...defaultMdxComponents,
  PropsTable,
  AspectRatioRatioExample,
  AspectRatioUsageExample,
  BleedInlineExample,
  BleedUsageExample,
  BoxAsExample,
  BoxUsageExample,
  CenterUsageExample,
  ContainerUsageExample,
  FlexDirectionExample,
  FlexJustifyExample,
  FlexUsageExample,
  FloatPlacementExample,
  FloatUsageExample,
  GridColumnsExample,
  GridUsageExample,
  GroupGapExample,
  GroupUsageExample,
  HeadingColorsExample,
  HeadingLevelsExample,
  HeadingSizesExample,
  HeadingUsageExample,
  HeadingWeightsExample,
  SimpleGridColumnsExample,
  SimpleGridUsageExample,
  StackDirectionExample,
  StackGapExample,
  StackUsageExample,
  TextColorsExample,
  TextSizesExample,
  TextUsageExample,
  TextWeightsExample,
  WrapGapExample,
  WrapUsageExample,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const { previous, next } = findNeighbour(source.pageTree, page.url);

  return (
    <DocsPage toc={page.data.toc} footer={{ items: { previous, next } }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  };
}
