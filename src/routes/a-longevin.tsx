import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Users,
  MapPin,
  HeartPulse,
  Ear,
  Microscope,
  ClipboardList,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import fachadaImg from "@/assets/alongevin-fachada.jpg";
import excelenciaImg from "@/assets/excelencia-equipe.webp";
import recepImg from "@/assets/recep-longevin2.webp";
import esperaImg from "@/assets/recep-longevin.webp";
import consultorioImg from "@/assets/consultorio-longevin.webp";
import consultorio2Img from "@/assets/consultorio-longevin2.webp";

const galleryImages = [
  { src: recepImg, label: "Recepção" },
  { src: esperaImg, label: "Sala de espera" },
  { src: consultorioImg, label: "Consultório" },
  { src: consultorio2Img, label: "Atendimento" },
];


export const Route = createFileRoute("/a-longevin")({
  head: () => ({
    meta: [
      { title: "A Longevin · Medicina Integrada e Longevidade" },
      {
        name: "description",
        content:
          "Conheça a Longevin: um ecossistema de saúde que une especialidades médicas, ambiente acolhedor e atenção autêntica em cada etapa da jornada do paciente.",
      },
      { property: "og:title", content: "A Longevin · Medicina Integrada" },
      {
        property: "og:description",
        content:
          "Um novo jeito de cuidar — escuta, diagnóstico preciso e planos personalizados, em um único lugar.",
      },
    ],
    links: [{ rel: "canonical", href: "/a-longevin" }],
  }),
  component: ALongevinPage,
});

const pillars = [
  { icon: Compass, label: "Atenção à jornada individual" },
  { icon: Users, label: "Atendimento multidisciplinar" },
  { icon: MapPin, label: "Localização privilegiada e acessível" },
  { icon: HeartPulse, label: "Acompanhamento contínuo" },
];

const principles = [
  { icon: Ear, title: "Saúde com escuta", desc: "Ouvir antes de prescrever — entender a história, os sintomas e os objetivos de vida." },
  { icon: Microscope, title: "Diagnóstico com precisão", desc: "Investigação criteriosa, integrada entre especialidades, com tempo para o cuidado." },
  { icon: ClipboardList, title: "Planos personalizados", desc: "Cada paciente recebe um plano de cuidado feito sob medida para sua jornada." },
];

function ALongevinPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="light" />

      {/* Hero / Nossa proposta */}
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-40 overflow-hidden bg-background">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-[oklch(0.96_0.012_100)]" />
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-primary">
            A Longevin
          </h2>

          <div className="mt-14 grid gap-16 md:grid-cols-12 items-center">
            <div className="md:col-span-6">
              <p className="eyebrow text-primary/70">Nossa proposta</p>
              <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] tracking-tight text-foreground">
                Um ecossistema em saúde,{" "}
                <span className="italic text-primary">além da consulta.</span>
              </h1>
              <p className="mt-10 text-lg leading-relaxed text-foreground/80">
                A Longevin propõe um modelo inovador de cuidado em saúde, que vai
                além da consulta: um verdadeiro ecossistema que combina
                especialidades médicas, ambiente acolhedor e atenção autêntica a
                cada etapa da jornada do paciente.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-foreground/75">
                Idealizada por profissionais que defendem uma medicina mais humana
                e abrangente, a clínica reúne áreas como geriatria, cardiologia,
                endocrinologia, reumatologia, dermatologia, psiquiatria,
                neurologia, oftalmologia, clínica médica, psicologia, nutrição,
                entre outras.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-xl">
                <img
                  src={fachadaImg}
                  alt="Fachada da clínica Longevin"
                  className="w-full h-[560px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto destaque */}
      <section id="proposta" className="py-24 md:py-32">

        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <p className="eyebrow text-gold">Nosso cuidado</p>
          <h2 className="mt-8 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Mais do que uma clínica —{" "}
            <span className="italic text-primary">um novo jeito de cuidar.</span>
          </h2>
          <p className="mt-10 max-w-2xl mx-auto text-lg leading-relaxed text-foreground/70">
            Um ecossistema de medicina integrada onde as especialidades se
            conectam, o tempo é respeitado e o cuidado é personalizado em cada
            etapa da sua jornada.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://agende.longevin.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium"
            >
              Agendar consulta <span className="arrow">→</span>
            </a>
            <a href="#pilares" className="btn-ghost">
              Conhecer a proposta
            </a>
          </div>
        </div>
      </section>


      {/* Pillars grid */}
      <section id="pilares" className="py-24 md:py-32 bg-[oklch(0.96_0.012_100)]">

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-none">
            <p className="eyebrow text-gold">Melhor atendimento médico</p>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-nowrap">
              Quatro pilares que sustentam cada encontro.
            </h2>
          </div>

          <div className="mt-16 grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-border/60">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-background p-10 flex flex-col gap-6 hover:bg-[oklch(0.97_0.012_100)] transition-colors"
              >
                <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                <p className="font-serif text-2xl leading-snug text-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-xl">
              <img
                src={excelenciaImg}
                alt="Equipe Longevin"
                className="w-full h-[560px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <p className="eyebrow">Por que nos escolher</p>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
              Medicina com tempo, escuta e continuidade.
            </h2>
            <div className="hairline my-10" />
            <p className="text-lg leading-relaxed text-foreground/75">
              Aqui, especialidades conversam, o prontuário é integrado e o
              acompanhamento é contínuo. Tudo em um único lugar, com uma equipe
              que se conecta para cuidar de verdade.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-foreground/75">
              Acreditamos que saúde se constrói no vínculo — e que cada detalhe
              do ambiente e do atendimento importa para uma experiência
              verdadeiramente diferente.
            </p>
          </div>
        </div>
      </section>

      {/* Cuidado integral */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 text-center">
          <p className="eyebrow text-gold">Cuidado integral</p>
          <h2 className="mt-8 font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] whitespace-nowrap">
            Na Longevin, cada paciente é{" "}
            <span className="italic text-gold">visto como um todo.</span>
          </h2>
          <p className="mt-10 max-w-3xl mx-auto text-lg leading-relaxed text-background/75">
            Não olhamos apenas exames, mas a história, os sintomas, as emoções e
            os objetivos de vida de quem chega até nós. Aqui, especialidades
            conversam, o prontuário é integrado e o acompanhamento é contínuo.
          </p>

          <div className="mt-20 grid gap-10 md:grid-cols-3 text-left">
            {principles.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border-t border-background/20 pt-8">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-background/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-20 font-serif text-2xl md:text-3xl italic text-background/85 max-w-3xl mx-auto leading-snug">
            “Porque saúde não é feita de consultas isoladas. É feita de
            vínculos.”
          </p>
        </div>
      </section>

      {/* Localização */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold">Localização</p>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
              Em uma localização privilegiada, a Longevin{" "}
              <span className="italic text-primary">acolhe, cuida e previne.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-foreground/75">
              Um endereço pensado para receber com tranquilidade, acessibilidade
              e o cuidado que você merece desde a chegada.
            </p>
            <div className="mt-10 flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-gold" strokeWidth={1.4} />
              <div>
                <p className="text-foreground">Fortaleza · Ceará</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Clinica+Longevin+Fortaleza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm tracking-[0.18em] uppercase mt-2 inline-block"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-xl">
              <iframe
                title="Mapa Clínica Longevin"
                src="https://www.google.com/maps?q=Clinica+Longevin+Fortaleza&output=embed"
                className="w-full h-[480px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[oklch(0.96_0.012_100)]">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <p className="eyebrow">Saúde integrada</p>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05]">
            Quer conhecer um novo jeito de{" "}
            <span className="italic text-primary">cuidar da sua saúde?</span>
          </h2>
          <p className="mt-8 text-lg text-foreground/70">
            Presença, continuidade e acolhimento em cada consulta.
          </p>
          <a
            href="https://agende.longevin.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium mt-12 inline-flex"
          >
            Agendar consulta <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
