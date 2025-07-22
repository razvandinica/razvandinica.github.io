import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Blog from '../index';

const POSTS_PER_PAGE = 5;

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const totalPages = Math.ceil(fileNames.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
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

  const pageNumber = parseInt(params.page);
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPostsData.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE);
  const allTags = [...new Set(allPostsData.flatMap(post => post.tags))];

  return {
    props: {
      posts: paginatedPosts,
      allTags,
      totalPages,
      currentPage: pageNumber,
    },
  };
}

export default Blog;
