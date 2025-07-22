import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Layout({ children, hideNavbar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(0);

  useEffect(() => {
    // Check initial OS preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    // Listen for changes in OS preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
      setPageLoadTime(loadTime);
    }
  }, []);

  return (
    <>
      {!hideNavbar && (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Razvan Dinica</Link>
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarNav" aria-expanded={isOpen ? "true" : "false"} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
                      <path d="M8 .5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V1a.5.5 0 0 1 .5-.5M3.732 3.732a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L3.732 4.439a.5.5 0 0 1 0-.707m.707 10.536a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M2 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m10.536 3.732a.5.5 0 0 1-.707 0L9.439 10.207a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707m.707-10.536a.5.5 0 0 1 0 .707L11.207 5.146a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M15.5 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m-2.464 3.732a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 0 1 .707.707l-1.414 1.414a.5.5 0 0 1-.707 0M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.083 1.533-.204a.78.78 0 0 1 .86-.064.454.454 0 0 1 .065.86 8.1 8.1 0 0 1-4.445 1.366C5.188 15.01 1.8 11.616 1.8 7.354c0-1.023.24-2.02.681-2.865C3.048 2.067 4.543.823 6 .278"/>
                    </svg>
                  )}
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/aboutme">About Me</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      )}
      <main className="container mt-4 flex-grow-1 d-flex">
        {children}
      </main>
      <footer className="footer mt-auto py-3 bg-light shadow-sm">
        <div className="container text-center">
          <span className="text-muted">© {new Date().getFullYear()}. All rights reserved.</span>
          {pageLoadTime > 0 && (
            <span className="text-muted ms-3">Page loaded in {pageLoadTime} ms.</span>
          )}
        </div>
      </footer>
    </>
  );
}
