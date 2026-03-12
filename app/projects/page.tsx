import Link from "next/link";

export const metadata = {
  title: "Projects — SellPark",
  description: "Sites and projects built by SellPark. Featured: perv.gg.",
};

const projects = [
  {
    name: "perv.gg",
    url: "https://perv.gg",
    description: "A full project delivered by us. Visit the site to see our work in action.",
    featured: true,
  },
  // Add more projects here as you deliver them
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Projects
      </h1>
      <p className="mt-4 text-slate-400">
        Sites and projects we’ve built. Here’s what we’ve shipped.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-1">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-[#12121a] p-6 transition hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 sm:p-8"
          >
            {p.featured && (
              <span className="text-sm font-medium text-slate-500">Featured project</span>
            )}
            <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-gradient sm:text-2xl">
              {p.name}
            </h2>
            <p className="mt-3 text-slate-400">
              {p.description}
            </p>
            <span className="mt-4 inline-block text-blue-400 group-hover:underline">
              Visit {p.name} →
            </span>
          </a>
        ))}
      </div>

      <p className="mt-12 text-center text-slate-500">
        Want your project here?{" "}
        <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          Get in touch on Telegram
        </a>
        .
      </p>

      <p className="mt-6 text-center">
        <Link href="/" className="text-slate-400 hover:text-white">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
