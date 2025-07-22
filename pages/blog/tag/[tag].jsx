import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return matterResult.data;
  });

  const allTags = [...new Set(allPostsData.flatMap(post => post.tags || []))];

  const paths = allTags.map(tag => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        date: new Date(matterResult.data.date).toISOString().substring(0, 10),
        tags: matterResult.data.tags || [],
      };
    })
    .filter(post => post.tags.includes(params.tag));

  return {
    props: {
      allPostsData,
      tag: params.tag,
    },
  };
}

export default function TagPage({ allPostsData, tag }) {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Posts tagged with: <span className="text-primary">{tag}</span></h1>
      <div className="list-group">
        {allPostsData.map(({ slug, title, date, tags }) => (
          <Link key={slug} href={`/blog/${slug}`} className="list-group-item list-group-item-action">
            <h5 className="mb-1">{title}</h5>
            <small className="me-3">Published: {date}</small>
            <div>
              {tags.map(tag => (
                <span key={tag} className="badge bg-secondary me-1">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <Link href="/blog" className="btn btn-primary mt-4">Back to all posts</Link>
    </div>
  );
}
