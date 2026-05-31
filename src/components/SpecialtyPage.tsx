import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { SpecialtyContent } from "@/data/specialties-content";

export function SpecialtyPage({ specialty }: { specialty: SpecialtyContent }) {
  const Icon = specialty.Icon;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="light" />

      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              to="/"
              hash="especialidades"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/55 hover:text-primary transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Especialidades
            </Link>

            <div
              className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-background"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)",
                boxShadow:
                  "0 24px 60px -28px color-mix(in oklab, var(--primary) 60%, transparent)",
              }}
            >
              <Icon className="h-10 w-10 text-primary" strokeWidth={1.2} />
            </div>

            <p className="mt-6 text-[10px] tracking-[0.28em] uppercase text-gold">
              Especialidade
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-[1.1] text-foreground">
              {specialty.name}
            </h1>
            <p className="mt-5 text-lg sm:text-xl leading-relaxed text-foreground/70 font-serif italic">
              {specialty.tagline}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mt-16 px-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {specialty.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[16px] sm:text-[17px] leading-relaxed text-foreground/80"
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 px-6">
          <div
            className="mx-auto max-w-2xl rounded-3xl bg-card px-8 py-10 text-center"
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
              boxShadow:
                "0 30px 70px -38px color-mix(in oklab, var(--primary) 55%, transparent)",
            }}
          >
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold">
              Agende sua consulta
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl leading-tight">
              Cuide da sua saúde com a equipe Longevin
            </h2>
            <p className="mt-4 text-foreground/65 leading-relaxed">
              Atendimento humano, integrado e personalizado em uma clínica boutique de medicina integrada.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <a
                href="https://agende.longevin.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium justify-center w-full sm:w-auto"
              >
                Agendar consulta <span className="arrow">→</span>
              </a>
              <Link
                to="/"
                hash="especialidades"
                className="btn-ghost justify-center w-full sm:w-auto"
              >
                Ver todas as especialidades
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
