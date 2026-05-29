import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Stethoscope, Users } from "lucide-react";
import { SpecialtiesNetwork } from "@/components/SpecialtiesNetwork";
import heroImg from "@/assets/hero-clinic.webp";
import interiorImg from "@/assets/clinic-interior.jpg";
import excelenciaImg from "@/assets/excelencia-equipe.webp";
import propostaAtendimento from "@/assets/proposta-atendimento.webp";
import propostaMultidisciplinar from "@/assets/proposta-multidisciplinar.jpg";
import propostaCasa from "@/assets/proposta-casa.png";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Longevin · Clínica de Medicina Integrada e Longevidade" },
      { name: "description", content: "Uma jornada de saúde e longevidade em uma clínica boutique de medicina integrada. Atendimento multidisciplinar, humano e personalizado." },
      { property: "og:title", content: "Longevin · Medicina Integrada e Longevidade" },
      { property: "og:description", content: "Mais do que uma clínica — um novo jeito de cuidar." },
    ],
  }),
  component: Home,
});


const doctors = [
  { name: "Dr. Karlos Jennysson", spec: "Cardiologia", rqe: "RQE 113119", img: "https://longevin.com.br/wp-content/uploads/2025/06/Dr.-Carlos-Jennyson-1-1-e1749523769929.jpg" },
  { name: "Dra. Thayane Furtado", spec: "Reumatologia", rqe: "RQE 17762", img: "https://longevin.com.br/wp-content/uploads/2025/07/Dra-Tayane-e1751571255349.webp" },
  { name: "Itaquê Figueiredo", spec: "Nutrição", rqe: "", img: "https://longevin.com.br/wp-content/uploads/2025/07/Itaque-Figueiredo-e1751571634897.webp" },
  { name: "Dra. Emanuelle Albuquerque", spec: "Psicologia", rqe: "", img: "https://longevin.com.br/wp-content/uploads/2025/07/Dra-Emanuelle-scaled-e1751569087610.webp" },
  { name: "Dr. Igor Brito", spec: "Geriatria", rqe: "", img: "https://longevin.com.br/wp-content/uploads/2025/07/Dr-Igor-Brito-1-e1751571906422.webp" },
  { name: "Dra. Mayanne Lucy", spec: "Psicologia", rqe: "", img: "https://longevin.com.br/wp-content/uploads/2025/07/Dra-Mayane-Lucy-e1751573136170.webp" },
  { name: "Dra. Tayná Milfont", spec: "Endocrinologia", rqe: "RQE 17431", img: "https://longevin.com.br/wp-content/uploads/2025/06/Dra.-Thayna-e1749523355311.jpg" },
  { name: "Dra. Alexia Carneiro", spec: "Neurologia", rqe: "RQE 13.508", img: "https://longevin.com.br/wp-content/uploads/2025/06/Dra.-Alexia-e1749523460581.jpg" },
  { name: "Dr. Gerber Caraciolo", spec: "Oftalmologia", rqe: "RQE 7845", img: "https://longevin.com.br/wp-content/uploads/2025/06/Dr.-Gerber-e1749523538530.jpg" },
];

const testimonials = [
  { quote: "A escuta atenta e o cuidado integrado me devolveram qualidade de vida. Senti-me, pela primeira vez, vista como pessoa, não como prontuário.", name: "Paciente Longevin" },
  { quote: "Um espaço que parece uma casa, com a precisão de uma clínica de excelência. Cada detalhe transmite calma e confiança.", name: "Paciente Longevin" },
  { quote: "A discussão multidisciplinar do meu caso elevou completamente o nível dos meus diagnósticos. Cuidado raro e verdadeiro.", name: "Paciente Longevin" },
];

const articles = [
  { date: "13 de junho de 2025", title: "Você enxerga bem? E como anda a sua saúde visual?", excerpt: "Muitas doenças sistêmicas — como diabetes, hipertensão e até distúrbios neurológicos — podem se manifestar primeiro nos olhos.", href: "https://longevin.com.br/2025/06/13/voce-enxerga-bem-e-como-anda-a-sua-saude-visual/" },
  { date: "11 de junho de 2025", title: "Você escuta a sua mente — ou só quando ela grita?", excerpt: "Você consegue parar? Sente que tem vivido no automático? A mente também dá sinais que precisam ser ouvidos.", href: "https://longevin.com.br/2025/06/11/voce-escuta-a-sua-mente-ou-so-quando-ela-grita/" },
  { date: "11 de junho de 2025", title: "Cardiologia em Fortaleza · Acompanhamento contínuo do coração", excerpt: "A cardiologia em Fortaleza com acompanhamento contínuo permite prevenir, identificar e tratar com profundidade.", href: "https://longevin.com.br/2025/06/11/cardiologia-em-fortaleza-acompanhamento-continuo-do-coracao/" },
  { date: "11 de junho de 2025", title: "Alimentação emocional: quando o que você sente afeta o que você come", excerpt: "Quem nunca buscou comida para aliviar o estresse, a ansiedade ou aquela tristeza que não passa?", href: "https://longevin.com.br/2025/06/11/alimentacao-emocional-quando-o-que-voce-sente-afeta-o-que-voce-come/" },
];

function Home() {
  const autoplay = useRef<ReturnType<typeof Autoplay> | null>(null);
  if (typeof window !== "undefined" && !autoplay.current) {
    autoplay.current = Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true });
  }
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      <SiteHeader />

      {/* HERO */}
      <section id="home" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Fachada da clínica Longevin"
            width={1920}
            height={1280}
            className="w-full h-full object-cover brightness-[0.95] saturate-[1.05] contrast-[1.08]"
          />
          {/* Gradiente lateral cinematográfico (esquerda → direita) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10 md:from-black/60 md:via-black/25 md:to-black/5" />
          {/* Suave queda inferior para amarrar com a próxima seção */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-44 md:pt-56 pb-28 md:pb-40 min-h-[88svh] grid md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="reveal text-[11px] font-medium uppercase tracking-[0.3em] text-white/75">
              Atendimento Multidisciplinar
            </p>

            <h1 className="reveal reveal-delay-1 mt-7 font-serif text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.0] tracking-[-0.02em] text-white max-w-3xl">
              Sua jornada de{" "}
              <span className="italic" style={{ color: "oklch(0.82 0.07 135)" }}>
                saúde
              </span>{" "}
              e{" "}
              <em className="not-italic" style={{ color: "oklch(0.82 0.07 135)" }}>
                longevidade
              </em>
              .
            </h1>

            <p className="reveal reveal-delay-2 mt-8 max-w-md text-base md:text-lg leading-relaxed text-white/85">
              Mais do que uma clínica — um novo jeito de cuidar. Medicina integrada, escuta atenta e protocolos personalizados em um espaço pensado para acolher.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
              <a
                href="https://agende.longevin.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium justify-center w-full sm:w-auto"
              >
                Agendar consulta <span className="arrow">→</span>
              </a>
              <a href="#especialidades" className="btn-ghost-light justify-center w-full sm:w-auto">
                Especialidades
              </a>
            </div>


            <ul className="reveal reveal-delay-4 mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 text-[11px] tracking-[0.18em] uppercase text-white/75">
              <li className="flex items-center gap-2.5">
                <Stethoscope className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: "oklch(0.82 0.07 135)" }} />
                Atendimento multidisciplinar
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: "oklch(0.82 0.07 135)" }} />
                Protocolos personalizados
              </li>
              <li className="flex items-center gap-2.5">
                <Users className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: "oklch(0.82 0.07 135)" }} />
                Equipe especializada
              </li>
            </ul>

          </div>
        </div>
      </section>


      {/* PROPOSTA */}
      <section id="sobre" className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">Nossa proposta</p>
              <h2 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
                Uma jornada de cuidado <span className="italic text-primary">completa</span>.
              </h2>
            </div>
            <div className="md:col-span-5 md:pl-10 md:border-l border-border">
              <p className="text-foreground/70 leading-relaxed">
                Respeito ao tempo, à escuta e à singularidade do paciente — sustentado por uma equipe de especialistas que atuam em verdadeira sinergia.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-px bg-border md:grid-cols-3 overflow-hidden rounded-2xl border border-border">
            {[
              { kicker: "01", title: "Atendimento Diferenciado", body: "Respeito à escuta e ao tempo do paciente, com um protocolo de cuidados específico para cada um.", img: propostaAtendimento, alt: "Médico em consulta com paciente na Longevin" },
              { kicker: "02", title: "Multidisciplinar", body: "Diversas especialidades médicas e um só propósito: promover a saúde e a longevidade do paciente.", img: propostaMultidisciplinar, alt: "Recepção da clínica Longevin" },
              { kicker: "03", title: "Parece uma casa, mas é uma clínica", body: "Um projeto sofisticado que prioriza a calma, o contato com a natureza e o acolhimento.", img: propostaCasa, alt: "Consultório acolhedor da Longevin" },
            ].map((c) => (
              <div key={c.kicker} className="group bg-background flex flex-col card-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/15" />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl text-gold">{c.kicker}</span>
                    <span className="h-px w-10 bg-gold/70" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl md:text-[1.7rem] leading-tight">{c.title}</h3>
                  <p className="mt-5 text-sm md:text-base leading-relaxed text-foreground/70">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCELÊNCIA */}
      <section className="py-24 md:py-36 bg-[oklch(0.96_0.012_100)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-6 relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={excelenciaImg} alt="Equipe médica Longevin que atua em conjunto" width={1536} height={1024} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-6 md:pl-6">
            <p className="eyebrow">Excelência integrada</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight">
              Excelência que atua <span className="italic text-primary">em conjunto</span>.
            </h2>
            <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed">
              <p>Na Longevin, as especialidades médicas atuam em sinergia, reunindo expertises de áreas como cardiologia, endocrinologia, geriatria e outras frentes fundamentais da medicina.</p>
              <p>Aqui, o paciente pode ter seu caso discutido por especialistas, em um modelo colaborativo — inovador por priorizar a saúde de forma contínua e coordenada — que eleva a precisão dos diagnósticos e a personalização dos tratamentos.</p>
              <p>O resultado é um cuidado completo, humano e comprometido com o que realmente importa: a qualidade de vida.</p>
            </div>
          </div>
        </div>
      </section>


      {/* ESPECIALIDADES */}
      <section id="especialidades" className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-16 lg:gap-20 lg:grid-cols-5 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <p className="eyebrow">Especialidades</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Áreas que se <span className="italic text-primary">conversam</span>.
            </h2>
            <p className="mt-8 text-foreground/70 leading-relaxed max-w-md">
              Na Longevin, cada especialidade faz parte de uma visão integrada da saúde. Nossa equipe atua de forma colaborativa para compreender o paciente como um todo, conectando diferentes áreas do conhecimento para promover prevenção, diagnóstico e acompanhamento contínuo.
            </p>


          </div>

          <div className="lg:col-span-3 min-w-0 w-full">
            <SpecialtiesNetwork />
          </div>

        </div>
      </section>


      {/* EQUIPE */}
      <section id="equipe" className="py-28 md:py-40 bg-[oklch(0.96_0.012_100)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="eyebrow">Conheça nossa equipe</p>
              <h2 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
                Nossos <span className="italic text-primary">especialistas</span>.
              </h2>
            </div>
            <p className="max-w-sm text-foreground/70">
              Profissionais selecionados por sua excelência técnica e compromisso com uma medicina humana.
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="mt-16"
          >
            <CarouselContent className="-ml-4">
              {doctors.map((d) => (
                <CarouselItem
                  key={d.name}
                  className="pl-4 basis-[82%] sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="group">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{d.spec}</p>
                        <h3 className="mt-2 font-serif text-2xl leading-tight">{d.name}</h3>
                      </div>
                      {d.rqe && <span className="mt-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap">{d.rqe}</span>}
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="eyebrow text-center">Nossos depoimentos</p>
          <h2 className="mt-5 text-center font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight">
            O que nossos pacientes <span className="italic text-primary">dizem</span>.
          </h2>

          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="relative">
                <span className="absolute -top-6 left-0 font-serif text-7xl text-primary/25 leading-none">“</span>
                <blockquote className="relative pt-6 font-serif text-xl md:text-[1.35rem] leading-[1.5] text-foreground/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  <span className="h-px w-8 bg-gold" />
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-primary" />
        <div className="absolute inset-0 -z-10 opacity-[0.15] bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center text-primary-foreground">
          <p className="eyebrow text-primary-foreground/70" style={{ color: "color-mix(in oklab, white 80%, transparent)" }}>Boutique em saúde</p>
          <h2 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Quer conhecer um novo jeito de <span className="italic">cuidar da sua saúde</span>?
          </h2>
          <p className="mt-8 mx-auto max-w-2xl font-serif text-xl md:text-2xl leading-snug text-primary-foreground/85">
            “Somos um ecossistema em saúde onde as especialidades se conectam, o tempo é respeitado e o cuidado, personalizado.”
          </p>
          <div className="mt-12 flex justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=558599310000&text=Ol%C3%A1+Gostaria+de+agendar+uma+consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-background text-primary px-8 py-4 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-background/90 transition-all duration-500 hover:-translate-y-0.5"
            >
              Fale com nosso staff <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ARTIGOS */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="eyebrow">Artigos e dicas</p>
              <h2 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
                Últimos <span className="italic text-primary">artigos</span>.
              </h2>
            </div>
            <a href="https://longevin.com.br/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Ver todos
            </a>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-border">
            {articles.map((a) => (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className="group bg-background p-8 flex flex-col card-lift">
                <span className="text-[11px] tracking-[0.22em] uppercase text-gold">{a.date}</span>
                <h3 className="mt-5 font-serif text-2xl leading-snug text-foreground group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65 flex-1">{a.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-primary">
                  Ler mais <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

