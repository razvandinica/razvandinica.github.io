import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default function Post({ postData }) {
  return (
    <div className="container my-4">
      <h1 className="mb-3">{postData.title}</h1>
      <p className="text-muted">{postData.date} by {postData.author}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      <Link href="/blog" className="btn btn-primary mt-4">Back to Blog</Link>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        slug: params.slug,
        content: contentHtml,
        title: matterResult.data.title,
        date: matterResult.data.date.toISOString().substring(0, 10),
        author: matterResult.data.author,
      },
    },
  };
}
