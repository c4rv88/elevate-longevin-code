import {
  createFileRoute,
  notFound,
  ErrorComponent,
  Link,
  useRouter,
} from "@tanstack/react-router";

import { SpecialtyPage } from "@/components/SpecialtyPage";
import {
  getSpecialtyBySlug,
  type SpecialtyContent,
} from "@/data/specialties-content";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const specialty = getSpecialtyBySlug(params.slug);
    if (!specialty) throw notFound();
    return { specialty };
  },
  head: ({ loaderData, params }) => {
    const specialty = loaderData?.specialty as SpecialtyContent | undefined;
    if (!specialty) {
      return { meta: [{ title: "Página não encontrada · Longevin" }] };
    }
    const title = `${specialty.name} · Longevin`;
    const url = `/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: specialty.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: specialty.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <ErrorComponent error={error} />
          <button
            onClick={() => router.invalidate()}
            className="btn-ghost mt-6 inline-flex"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold">404</p>
        <h1 className="mt-3 font-serif text-3xl">Página não encontrada</h1>
        <p className="mt-4 text-foreground/65">
          A página que você procura não existe ou foi movida.
        </p>
        <Link to="/" className="btn-ghost mt-8 inline-flex">
          Voltar para o início
        </Link>
      </div>
    </div>
  ),
  component: SpecialtyRoute,
});

function SpecialtyRoute() {
  const { specialty } = Route.useLoaderData();
  return <SpecialtyPage specialty={specialty} />;
}
