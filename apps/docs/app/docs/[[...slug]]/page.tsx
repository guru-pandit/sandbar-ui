import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import {
  BoxDemo,
  CenterDemo,
  ContainerDemo,
  HeadingDemo,
  StackDemo,
  TextDemo,
} from '../../components/ComponentDemos';
import { PropsTable } from '../../components/PropsTable';
import { source } from '../../../lib/source';

const mdxComponents = {
  ...defaultMdxComponents,
  PropsTable,
  BoxDemo,
  CenterDemo,
  ContainerDemo,
  HeadingDemo,
  StackDemo,
  TextDemo,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
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
