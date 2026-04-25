function Footer() {
  return (
    <footer className="px-6 pb-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-[var(--card-border)] pt-6 text-sm text-[var(--muted-text)] md:flex-row md:items-center md:justify-between">
        <p>© 2026 Steve Amos. All rights reserved.</p>

        <div className="flex gap-5">
          <a
            href="https://github.com/dapsteveamos"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-400"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/steve-amos-ab910b282/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-400"
          >
            LinkedIn
          </a>
          <a
            href="mailto:dapsteveamos@gmail.com"
            className="transition hover:text-cyan-400"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;