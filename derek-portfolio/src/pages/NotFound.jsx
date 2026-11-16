import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="container-page flex min-h-[80svh] flex-col justify-center pt-24 pb-16">
      <Helmet>
        <title>Page not found | Derrick Macharia</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <p className="label">404</p>
      <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Page not found</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-10 self-start rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Back home
      </Link>
    </div>
  );
};

export default NotFound;
