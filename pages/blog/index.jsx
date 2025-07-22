import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PER_PAGE = 5;

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
      date: new Date(matterResult.data.date).toISOString().substring(0, 10),
      tags: matterResult.data.tags || [],
    };
  });

  const allTags = [...new Set(allPostsData.flatMap(post => post.tags))];
  const paginatedPosts = allPostsData.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE);

  return {
    props: {
      posts: paginatedPosts,
      allTags,
      totalPages,
      currentPage: 1,
    },
  };
}

export default function Blog({ posts, allTags, totalPages, currentPage }) {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Blog Articles</h1>
      <div className="mb-4">
        <h5>Filter by Tag:</h5>
        {allTags.map(tag => (
          <Link key={tag} href={`/blog/tag/${tag}`} className="btn btn-outline-primary btn-sm me-2 mb-2">
            {tag}
          </Link>
        ))}
      </div>
      <div className="list-group">
        {posts.map(({ slug, title, date, tags }) => (
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
      <div className="d-flex justify-content-between mt-4">
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`} className="btn btn-primary">
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/blog/page/${currentPage + 1}`} className="btn btn-primary ms-auto">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}