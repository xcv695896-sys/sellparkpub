import Link from "next/link";
import { IconExternal } from "@/components/Icons";

export const metadata = {
  title: "Projects — SellPark",
  description: "Sites and projects built by SellPark. Featured: perv.gg. See live demos.",
};

const projects = [
  {
    name: "perv.gg",
    url: "https://perv.gg",
    description: "A full project delivered by us. Front to back — good-looking and fully functional. Built with modern stack and payment-ready.",
    featured: true,
    tags: ["Full-stack", "Shop", "Live"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">
        Sites and projects we’ve built. Each has a live demo you can visit.
      </p>

      <div className="mt-16">
        <h2 className="mb-8 text-xl font-semibold text-slate-300">Gallery</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#12121a] transition hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="grid sm:grid-cols-2">
                <div className="relative flex min-h-[240px] items-center justify-center bg-gradient-to-br from-purple-500/15 via-[#12121a] to-blue-500/15 p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                  <div className="relative text-5xl font-bold text-white/20 sm:text-6xl">{p.name}</div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  {p.featured && (
                    <span className="text-sm font-medium uppercase tracking-wider text-slate-500">Featured project</span>
                  )}
                  <h2 className="mt-2 text-2xl font-bold text-white">{p.name}</h2>
                  <p className="mt-3 text-slate-400">{p.description}</p>
                  {p.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    See live
                    <IconExternal />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 bg-[#0d0d12] p-8 text-center">
        <p className="text-slate-400">
          Want your project here?{" "}
          <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Get in touch on Telegram
          </a>
        </p>
      </div>

      <p className="mt-10 text-center">
        <Link href="/" className="text-slate-400 transition hover:text-white">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
}
