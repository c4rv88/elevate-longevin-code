import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Apple,
  ArrowRight,
  Bone,
  Brain,
  BrainCircuit,
  Eye,
  HeartHandshake,
  HeartPulse,
  MessageCircleHeart,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { LongevinMark } from "@/components/SiteHeader";

type Specialty = {
  id: string;
  name: string;
  Icon: LucideIcon;
  description: string;
  related: string[]; // ids of related specialties (besides center)
};

const SPECIALTIES: Specialty[] = [
  {
    id: "clinica",
    name: "Clínica Médica",
    Icon: Stethoscope,
    description:
      "Porta de entrada do cuidado, integrando todas as especialidades em uma visão clínica abrangente do paciente.",
    related: [
      "geriatria",
      "cardiologia",
      "endocrinologia",
      "dermatologia",
      "neurologia",
      "nutricao",
      "oftalmologia",
      "reumatologia",
      "psiquiatria",
      "psicologia",
    ],
  },
  {
    id: "geriatria",
    name: "Geriatria",
    Icon: HeartHandshake,
    description:
      "Cuidado integral do envelhecimento saudável, em diálogo direto com cardiologia, reumatologia e nutrição.",
    related: ["cardiologia", "reumatologia", "nutricao"],
  },
  {
    id: "cardiologia",
    name: "Cardiologia",
    Icon: HeartPulse,
    description:
      "Avaliação cardiovascular, prevenção e acompanhamento contínuo, integrados às demais áreas para uma visão completa da saúde.",
    related: ["endocrinologia", "geriatria", "nutricao"],
  },
  {
    id: "endocrinologia",
    name: "Endocrinologia",
    Icon: Activity,
    description:
      "Cuidado dos sistemas hormonal e metabólico em diálogo constante com nutrição, cardiologia e geriatria.",
    related: ["nutricao", "cardiologia"],
  },
  {
    id: "dermatologia",
    name: "Dermatologia",
    Icon: Sparkles,
    description:
      "Saúde da pele como reflexo do organismo, conectando endocrinologia, reumatologia e cuidados de longevidade.",
    related: ["reumatologia", "endocrinologia"],
  },
  {
    id: "neurologia",
    name: "Neurologia",
    Icon: Brain,
    description:
      "Investigação e acompanhamento neurológico em sinergia com psiquiatria, oftalmologia e geriatria.",
    related: ["psiquiatria", "oftalmologia"],
  },
  {
    id: "nutricao",
    name: "Nutrição",
    Icon: Apple,
    description:
      "Alimentação personalizada e funcional, base do tratamento integrado em todas as fases da vida.",
    related: ["endocrinologia", "cardiologia", "geriatria"],
  },
  {
    id: "oftalmologia",
    name: "Oftalmologia",
    Icon: Eye,
    description:
      "Saúde visual como espelho de doenças sistêmicas, em conexão com endocrinologia e neurologia.",
    related: ["neurologia", "endocrinologia"],
  },
  {
    id: "reumatologia",
    name: "Reumatologia",
    Icon: Bone,
    description:
      "Tratamento de doenças autoimunes e articulares com olhar integrado à dermatologia e geriatria.",
    related: ["dermatologia", "geriatria"],
  },
  {
    id: "psiquiatria",
    name: "Psiquiatria",
    Icon: BrainCircuit,
    description:
      "Cuidado da mente em diálogo constante com a psicologia e a neurologia, para um tratamento verdadeiramente integrado.",
    related: ["psicologia", "neurologia"],
  },
  {
    id: "psicologia",
    name: "Psicologia",
    Icon: MessageCircleHeart,
    description:
      "Escuta e acompanhamento psicológico, parte essencial do cuidado integral oferecido pela equipe.",
    related: ["psiquiatria"],
  },
];

// Pairs (undirected) between specialties — derived from `related` but de-duped
const PAIRS = (() => {
  const set = new Set<string>();
  SPECIALTIES.forEach((s) => {
    s.related.forEach((r) => {
      const key = [s.id, r].sort().join("|");
      set.add(key);
    });
  });
  return Array.from(set).map((k) => k.split("|") as [string, string]);
})();

export function SpecialtiesNetwork() {
  const [active, setActive] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setEntered(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Positions on a circle. SVG viewBox 600x600, center 300,300, radius 240.
  const positions = useMemo(() => {
    const cx = 300;
    const cy = 300;
    const r = 240;
    const n = SPECIALTIES.length;
    const map: Record<string, { x: number; y: number }> = {};
    SPECIALTIES.forEach((s, i) => {
      // start at top, distribute clockwise
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      map[s.id] = { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
    return map;
  }, []);

  const activeSpec = SPECIALTIES.find((s) => s.id === active) ?? null;

  const isLineActive = (a: string, b: string) =>
    active !== null && (active === a || active === b);

  const isNodeDimmed = (id: string) => {
    if (!active) return false;
    if (id === active) return false;
    const spec = SPECIALTIES.find((s) => s.id === active);
    if (spec && (spec.related.includes(id) || spec.id === id)) return false;
    // also consider when active node is in the related of `id`
    const other = SPECIALTIES.find((s) => s.id === id);
    if (other && other.related.includes(active)) return false;
    return true;
  };

  return (
    <div ref={ref} className="relative">
      {/* Diagram: desktop & tablet */}
      <div className="hidden sm:block">
        <div className="relative aspect-square w-full max-w-[640px] mx-auto">
          <svg
            viewBox="0 0 600 600"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {/* connections to center */}
            {SPECIALTIES.map((s, i) => {
              const p = positions[s.id];
              const activeLine = active === s.id;
              return (
                <line
                  key={`c-${s.id}`}
                  x1={300}
                  y1={300}
                  x2={p.x}
                  y2={p.y}
                  stroke="currentColor"
                  className={`text-primary transition-opacity duration-500 ${
                    entered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    strokeWidth: activeLine ? 1.2 : 0.8,
                    opacity: entered
                      ? activeLine
                        ? 0.55
                        : active
                          ? 0.08
                          : 0.18
                      : 0,
                    transitionDelay: `${300 + i * 60}ms`,
                  }}
                />
              );
            })}
            {/* connections between specialties */}
            {PAIRS.map(([a, b], i) => {
              const pa = positions[a];
              const pb = positions[b];
              const activeLine = isLineActive(a, b);
              return (
                <line
                  key={`p-${a}-${b}`}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke="currentColor"
                  className="text-primary transition-all duration-500"
                  style={{
                    strokeWidth: activeLine ? 1.1 : 0.6,
                    opacity: entered
                      ? activeLine
                        ? 0.45
                        : active
                          ? 0.05
                          : 0.12
                      : 0,
                    transitionDelay: `${800 + i * 30}ms`,
                  }}
                />
              );
            })}
          </svg>

          {/* center node */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
              entered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`relative h-[26%] w-[26%] min-h-[140px] min-w-[140px] aspect-square rounded-full bg-background flex flex-col items-center justify-center text-center px-4 transition-all duration-500`}
              style={{
                boxShadow:
                  "0 1px 0 color-mix(in oklab, var(--gold) 40%, transparent) inset, 0 20px 50px -28px color-mix(in oklab, var(--primary) 60%, transparent)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: active
                  ? "color-mix(in oklab, var(--primary) 55%, transparent)"
                  : "color-mix(in oklab, var(--gold) 55%, transparent)",
              }}
            >
              <LongevinMark className="h-8 w-auto opacity-90" />
              <p className="mt-2 font-serif text-[10px] tracking-[0.28em] uppercase text-foreground/75 leading-tight">
                Medicina
                <br />
                Integrada
              </p>
            </div>
          </div>

          {/* specialty nodes */}
          {SPECIALTIES.map((s, i) => {
            const p = positions[s.id];
            const isActive = active === s.id;
            const dimmed = isNodeDimmed(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-label={s.name}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive((cur) => (cur === s.id ? null : s.id))}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{
                  left: `${(p.x / 600) * 100}%`,
                  top: `${(p.y / 600) * 100}%`,
                  opacity: entered ? (dimmed ? 0.35 : 1) : 0,
                  transform: `translate(-50%, -50%) scale(${entered ? 1 : 0.9})`,
                  transition: `opacity 500ms ease, transform 600ms cubic-bezier(0.2,0.7,0.2,1)`,
                  transitionDelay: entered ? `${300 + i * 70}ms` : "0ms",
                }}
              >
                <div
                  className={`flex flex-col items-center justify-center rounded-full bg-background transition-all duration-300 ${
                    isActive ? "scale-[1.08]" : "group-hover:scale-[1.04]"
                  }`}
                  style={{
                    width: "84px",
                    height: "84px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isActive
                      ? "var(--primary)"
                      : "color-mix(in oklab, var(--primary) 22%, transparent)",
                    boxShadow: isActive
                      ? "0 16px 40px -20px color-mix(in oklab, var(--primary) 70%, transparent)"
                      : "0 6px 18px -14px color-mix(in oklab, var(--primary) 40%, transparent)",
                  }}
                >
                  <s.Icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.25}
                  />
                  <span className="mt-1 font-serif text-[11px] leading-tight text-foreground/80 px-1 text-center">
                    {s.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* floating panel */}
        <div
          className="mt-10 rounded-2xl border border-border bg-card p-7 md:p-8 transition-all duration-500"
          role="status"
          aria-live="polite"
          style={{
            boxShadow:
              "0 20px 60px -40px color-mix(in oklab, var(--primary) 50%, transparent)",
          }}
        >
          {activeSpec ? (
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div
                className="flex items-center justify-center rounded-full bg-background shrink-0"
                style={{
                  width: 64,
                  height: 64,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor:
                    "color-mix(in oklab, var(--primary) 35%, transparent)",
                }}
              >
                <activeSpec.Icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={1.25}
                />
              </div>
              <div className="flex-1">
                <p className="text-[11px] tracking-[0.22em] uppercase text-gold">
                  Especialidade
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-[1.6rem] leading-tight">
                  {activeSpec.name}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/70">
                  {activeSpec.description}
                </p>
              </div>
              <a
                href="#equipe"
                className="btn-ghost shrink-0 self-start md:self-center"
              >
                Conhecer especialidade
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          ) : (
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold">
                Medicina Integrada
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-[1.6rem] leading-tight">
                Um ecossistema de cuidado.
              </h3>
              <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/70 max-w-2xl">
                Passe o mouse — ou toque — em uma especialidade para descobrir
                como ela se conecta com as demais áreas da clínica.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: carrossel */}
      <div className="sm:hidden">
        <div className="flex flex-col items-center">
          <div
            className="relative h-32 w-32 rounded-full bg-background flex flex-col items-center justify-center"
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor:
                "color-mix(in oklab, var(--gold) 55%, transparent)",
              boxShadow:
                "0 20px 50px -28px color-mix(in oklab, var(--primary) 60%, transparent)",
            }}
          >
            <LongevinMark className="h-7 w-auto opacity-90" />
            <p className="mt-1.5 font-serif text-[9px] tracking-[0.28em] uppercase text-foreground/75 leading-tight text-center">
              Medicina
              <br />
              Integrada
            </p>
          </div>
        </div>

        <div className="mt-10 -mx-6 px-6 overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-pl-6 pb-4">
          {SPECIALTIES.map((s) => (
            <article
              key={s.id}
              className="snap-start shrink-0 w-[260px] rounded-2xl border border-border bg-card p-6"
            >
              <div
                className="flex items-center justify-center rounded-full bg-background"
                style={{
                  width: 52,
                  height: 52,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor:
                    "color-mix(in oklab, var(--primary) 30%, transparent)",
                }}
              >
                <s.Icon className="h-5 w-5 text-primary" strokeWidth={1.25} />
              </div>
              <h3 className="mt-5 font-serif text-xl leading-tight">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
