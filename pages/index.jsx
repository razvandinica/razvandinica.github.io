import Link from 'next/link';

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
      <div className="jumbotron">
        <h1 className="display-4">Razvan Dinica</h1>
        <p className="lead">
          A personal website and blog built with Next.js, featuring a responsive design with Bootstrap, a dynamic dark mode, and a blog rendered from Markdown files.
        </p>
        <hr className="my-4" />
        <p>Click the button below to enter the site.</p>
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
