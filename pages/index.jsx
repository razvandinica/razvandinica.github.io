import Link from 'next/link';

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
      <div className="jumbotron col-md-8">
        <h1 className="display-5">Razvan Dinica</h1>
        <p className="lead">
          Current project serves as a personal website and <Link href="/blog">blog</Link>, built with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>. It features a responsive design using <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a>, a dynamic dark mode toggle, and a blog section where articles are rendered from <a href="https://www.markdownguide.org/" target="_blank" rel="noopener noreferrer">Markdown</a> files.
        </p>
        <hr className="my-4" />
        <p>
          Also <a href="https://github.com/razvandinica/razvandinica.github.io" target="_blank" rel="noopener noreferrer">the project</a> is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">GPLv3</a>. You are free to use, modify, and share it.
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" href="/aboutme" role="button">Enter</Link>
        </p>
      </div>
    </div>
  );
}

// This function is used by Next.js to pass props to the Layout component
export async function getStaticProps() {
  return {
    props: {
      hideNavbar: true,
    },
  };
}
