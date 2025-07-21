# My GitHub Pages

This project serves as a personal website and blog, built with Next.js. It features a responsive design using Bootstrap, a dynamic dark mode toggle, and a blog section where articles are rendered from Markdown files.

## Features

*   **Next.js Framework:** A powerful React framework for building production-ready applications.
*   **Bootstrap Styling:** Responsive and modern UI components.
*   **Dynamic Dark Mode:** Automatically adapts to OS preference and includes a manual toggle.
*   **Markdown Blog:** Blog posts are written in Markdown and dynamically rendered.
*   **Sticky Footer:** Ensures the footer always stays at the bottom of the page.
*   **Page Load Time Display:** Shows the page loading time in the footer for performance insights.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
    (Replace `your-username` and `your-repo-name` with your actual GitHub details)

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To build the project for production (static export):

```bash
npm run build
# or
yarn build
```

This will generate the static files in the `out/` directory, which can then be deployed to static hosting services like GitHub Pages.

## Project Structure

*   `pages/`: Next.js pages and API routes.
    *   `pages/blog/`: Dynamic routes for blog posts.
    *   `pages/_app.jsx`: Custom App component for global layout and styles.
*   `src/components/`: Reusable React components (e.g., `Layout.jsx`).
*   `posts/`: Markdown files for blog articles.
*   `public/`: Static assets (e.g., favicon).
*   `styles/`: Global CSS styles (e.g., `dark-mode.css`).

## Deployment

This project is configured for static export, making it ideal for deployment on platforms like GitHub Pages. After running `npm run build`, the `out/` directory contains all the necessary static files.

For custom domains on GitHub Pages, ensure you have a `CNAME` file in the root of your deployed branch (e.g., in the `out/` directory before deployment) containing your custom domain (e.g., `blog.yourdomain.com`).