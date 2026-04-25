import { Link } from "react-router-dom";

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
        <span className="text-sm font-bold text-cyan-400">SA</span>
        {/* <span className="text-sm font-bold text-cyan-400"><img src="/steve-favicon.svg" alt="SA logo" className="h-5 w-5" /></span> */}
      </div>

      <div className="leading-tight">
        <p className="text-sm font-semibold text-[var(--text-color)]">
          Steve Amos
        </p>
        <p className="text-xs text-[var(--muted-text)]">
          Software Engineer
        </p>
      </div>
    </Link>
  );
}

export default BrandLogo;