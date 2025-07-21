import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date.toISOString().substring(0, 10),
    };
  });

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Blog Articles</h1>
      <div className="list-group">
        {allPostsData.map(({ slug, title, date }) => (
          <Link key={slug} href={`/blog/${slug}`} className="list-group-item list-group-item-action">
            <h5 className="mb-1">{title}</h5>
            <small>Published: {date}</small>
          </Link>
        ))}
        
      </div>
    </div>
  );
}