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
  X,
  type LucideIcon,
} from "lucide-react";
import { LongevinMark } from "@/components/SiteHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

type Specialty = {
  id: string;
  name: string;
  Icon: LucideIcon;
  short: string;
  description: string;
  related: string[];
};

const SPECIALTIES: Specialty[] = [
  {
    id: "clinica",
    name: "Clínica Médica",
    Icon: Stethoscope,
    short: "Porta de entrada e visão clínica abrangente.",
    description:
      "Coordena o cuidado e conecta todas as especialidades em torno de uma visão clínica única do paciente.",
    related: ["geriatria", "cardiologia", "endocrinologia", "nutricao", "psiquiatria"],
  },
  {
    id: "geriatria",
    name: "Geriatria",
    Icon: HeartHandshake,
    short: "Envelhecimento saudável e cuidado integral.",
    description:
      "Acompanha o envelhecimento de forma ampla, em diálogo direto com cardiologia, reumatologia e nutrição.",
    related: ["clinica", "cardiologia", "reumatologia", "nutricao"],
  },
  {
    id: "cardiologia",
    name: "Cardiologia",
    Icon: HeartPulse,
    short: "Prevenção e acompanhamento cardiovascular.",
    description:
      "Avaliação cardiovascular e prevenção contínua, integradas a outras áreas para uma visão completa da saúde.",
    related: ["clinica", "endocrinologia", "geriatria", "nutricao"],
  },
  {
    id: "endocrinologia",
    name: "Endocrinologia",
    Icon: Activity,
    short: "Equilíbrio hormonal e metabólico.",
    description:
      "Cuida dos sistemas hormonal e metabólico em diálogo constante com nutrição, cardiologia e dermatologia.",
    related: ["clinica", "nutricao", "cardiologia", "dermatologia", "oftalmologia"],
  },
  {
    id: "dermatologia",
    name: "Dermatologia",
    Icon: Sparkles,
    short: "Saúde e longevidade da pele.",
    description:
      "A pele como reflexo do organismo, conectando endocrinologia, reumatologia e cuidados de longevidade.",
    related: ["endocrinologia", "reumatologia"],
  },
  {
    id: "neurologia",
    name: "Neurologia",
    Icon: Brain,
    short: "Saúde do sistema nervoso e cognição.",
    description:
      "Investigação e acompanhamento neurológico em sinergia com psiquiatria, oftalmologia e geriatria.",
    related: ["psiquiatria", "oftalmologia", "psicologia"],
  },
  {
    id: "nutricao",
    name: "Nutrição",
    Icon: Apple,
    short: "Alimentação funcional e personalizada.",
    description:
      "Alimentação personalizada e funcional, base do tratamento integrado em todas as fases da vida.",
    related: ["clinica", "endocrinologia", "cardiologia", "geriatria"],
  },
  {
    id: "oftalmologia",
    name: "Oftalmologia",
    Icon: Eye,
    short: "Visão como espelho da saúde sistêmica.",
    description:
      "Saúde visual como espelho de doenças sistêmicas, em conexão com endocrinologia e neurologia.",
    related: ["neurologia", "endocrinologia"],
  },
  {
    id: "reumatologia",
    name: "Reumatologia",
    Icon: Bone,
    short: "Doenças autoimunes e articulares.",
    description:
      "Tratamento de doenças autoimunes e articulares com olhar integrado à dermatologia e geriatria.",
    related: ["dermatologia", "geriatria"],
  },
  {
    id: "psiquiatria",
    name: "Psiquiatria",
    Icon: BrainCircuit,
    short: "Saúde mental e cuidado integrado.",
    description:
      "Cuidado da mente em diálogo constante com a psicologia e a neurologia, num tratamento verdadeiramente integrado.",
    related: ["clinica", "psicologia", "neurologia"],
  },
  {
    id: "psicologia",
    name: "Psicologia",
    Icon: MessageCircleHeart,
    short: "Escuta clínica e acompanhamento terapêutico.",
    description:
      "Escuta e acompanhamento psicológico, parte essencial do cuidado integral oferecido pela equipe.",
    related: ["psiquiatria", "neurologia"],
  },
];

const byId = (id: string) => SPECIALTIES.find((s) => s.id === id);

// Symmetric pairs derived from `related`
const PAIRS = (() => {
  const set = new Set<string>();
  SPECIALTIES.forEach((s) => {
    s.related.forEach((r) => {
      set.add([s.id, r].sort().join("|"));
    });
  });
  return Array.from(set).map((k) => k.split("|") as [string, string]);
})();

export function SpecialtiesNetwork() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileTimeline />;
  return <DesktopDiagram />;
}


/* ------------------------------------------------------------------ */
/* DESKTOP                                                            */
/* ------------------------------------------------------------------ */

function DesktopDiagram() {
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

  const { positions, angles } = useMemo(() => {
    const cx = 300;
    const cy = 300;
    const r = 240;
    const n = SPECIALTIES.length;
    const pos: Record<string, { x: number; y: number }> = {};
    const ang: Record<string, number> = {};
    SPECIALTIES.forEach((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      pos[s.id] = { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
      ang[s.id] = angle;
    });
    return { positions: pos, angles: ang };
  }, []);

  const activeSpec = active ? byId(active) ?? null : null;

  const relatedSet = useMemo(() => {
    if (!activeSpec) return new Set<string>();
    return new Set<string>([activeSpec.id, ...activeSpec.related]);
  }, [activeSpec]);

  const isPairActive = (a: string, b: string) =>
    !!activeSpec &&
    (a === activeSpec.id || b === activeSpec.id) &&
    (activeSpec.related.includes(a) || activeSpec.related.includes(b) || a === activeSpec.id || b === activeSpec.id);

  return (
    <div ref={ref} className="relative">
      <div
        className="relative aspect-square w-full max-w-[640px] mx-auto"
        onMouseLeave={() => setActive(null)}
      >
        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Specialty pair lines */}
          {PAIRS.map(([a, b], i) => {
            const pa = positions[a];
            const pb = positions[b];
            const activeLine = isPairActive(a, b);
            return (
              <line
                key={`p-${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                className="transition-all duration-500"
                stroke={activeLine ? "var(--gold)" : "var(--primary)"}
                style={{
                  strokeWidth: activeLine ? 1.1 : 0.5,
                  opacity: entered
                    ? activeLine
                      ? 0.55
                      : activeSpec
                        ? 0.03
                        : 0.07
                    : 0,
                  transitionDelay: `${600 + i * 25}ms`,
                }}
              />
            );
          })}
          {/* Center spokes — only when a specialty is active, only for it */}
          {activeSpec && (
            <line
              x1={300}
              y1={300}
              x2={positions[activeSpec.id].x}
              y2={positions[activeSpec.id].y}
              stroke="var(--gold)"
              style={{ strokeWidth: 1.1, opacity: 0.55 }}
              className="transition-all duration-500"
            />
          )}
        </svg>

        {/* center node */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
            entered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div
            className="relative aspect-square min-h-[150px] min-w-[150px] rounded-full bg-background flex flex-col items-center justify-center text-center px-4 transition-all duration-500 animate-[corepulse_5s_ease-in-out_infinite]"
            style={{
              boxShadow:
                "0 1px 0 color-mix(in oklab, var(--gold) 40%, transparent) inset, 0 24px 60px -28px color-mix(in oklab, var(--primary) 60%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: activeSpec
                ? "color-mix(in oklab, var(--gold) 75%, transparent)"
                : "color-mix(in oklab, var(--gold) 45%, transparent)",
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
          const dimmed = !!activeSpec && !relatedSet.has(s.id);
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
                opacity: entered ? (dimmed ? 0.3 : 1) : 0,
                transform: `translate(-50%, -50%) scale(${entered ? 1 : 0.9})`,
                transition: `opacity 500ms ease, transform 600ms cubic-bezier(0.2,0.7,0.2,1)`,
                transitionDelay: entered ? `${300 + i * 60}ms` : "0ms",
                zIndex: isActive ? 20 : 10,
              }}
            >
              <div
                className={`flex flex-col items-center justify-center rounded-full bg-background transition-all duration-300 ${
                  isActive ? "scale-[1.1]" : "group-hover:scale-[1.05]"
                }`}
                style={{
                  width: "88px",
                  height: "88px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: isActive
                    ? "var(--primary)"
                    : relatedSet.has(s.id) && activeSpec
                      ? "color-mix(in oklab, var(--primary) 60%, transparent)"
                      : "color-mix(in oklab, var(--primary) 22%, transparent)",
                  boxShadow: isActive
                    ? "0 18px 44px -18px color-mix(in oklab, var(--primary) 75%, transparent)"
                    : "0 6px 18px -14px color-mix(in oklab, var(--primary) 40%, transparent)",
                }}
              >
                <s.Icon className="h-5 w-5 text-primary" strokeWidth={1.25} />
                <span className="mt-1 font-serif text-[11px] leading-tight text-foreground/85 px-1 text-center">
                  {s.name}
                </span>
              </div>
            </button>
          );
        })}

        {/* Tooltip */}
        {activeSpec && (
          <NodeTooltip spec={activeSpec} angle={angles[activeSpec.id]} />
        )}
      </div>

      <p className="mt-8 text-center text-xs tracking-[0.22em] uppercase text-foreground/45">
        Passe o mouse em uma especialidade para ver suas conexões
      </p>

      <style>{`
        @keyframes corepulse {
          0%, 100% { box-shadow: 0 1px 0 color-mix(in oklab, var(--gold) 40%, transparent) inset, 0 24px 60px -28px color-mix(in oklab, var(--primary) 60%, transparent); }
          50%      { box-shadow: 0 1px 0 color-mix(in oklab, var(--gold) 55%, transparent) inset, 0 28px 70px -24px color-mix(in oklab, var(--primary) 75%, transparent); }
        }
      `}</style>
    </div>
  );
}

function NodeTooltip({ spec, angle }: { spec: Specialty; angle: number }) {
  // Determine quadrant to anchor tooltip away from center
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cx = 300 + cos * 240;
  const cy = 300 + sin * 240;
  // push outward
  const tx = cx + cos * 70;
  const ty = cy + sin * 70;

  const horizontal: "left" | "right" | "center" =
    Math.abs(cos) < 0.3 ? "center" : cos > 0 ? "right" : "left";
  const vertical: "top" | "bottom" =
    sin < 0 ? "top" : "bottom";

  const translate =
    (horizontal === "right"
      ? "0%"
      : horizontal === "left"
        ? "-100%"
        : "-50%") +
    ", " +
    (vertical === "top" ? "-100%" : "0%");

  return (
    <div
      role="tooltip"
      className="absolute z-30 pointer-events-none animate-[fade-in_220ms_ease-out]"
      style={{
        left: `${(tx / 600) * 100}%`,
        top: `${(ty / 600) * 100}%`,
        transform: `translate(${translate})`,
      }}
    >
      <div
        className="w-[260px] rounded-2xl bg-background/95 backdrop-blur-sm p-5"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "color-mix(in oklab, var(--primary) 22%, transparent)",
          boxShadow:
            "0 24px 50px -28px color-mix(in oklab, var(--primary) 55%, transparent)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <spec.Icon className="h-4 w-4 text-primary" strokeWidth={1.4} />
          <h4 className="font-serif text-[17px] leading-none">{spec.name}</h4>
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-foreground/70">
          {spec.short}
        </p>
        {spec.related.length > 0 && (
          <p className="mt-3 text-[10px] tracking-[0.22em] uppercase text-gold">
            Integra com{" "}
            <span className="text-foreground/55 normal-case tracking-normal text-[12px] block mt-1">
              {spec.related
                .map((id) => byId(id)?.name)
                .filter(Boolean)
                .join(" · ")}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MOBILE — Timeline                                                   */
/* ------------------------------------------------------------------ */

function MobileTimeline() {
  const [selected, setSelected] = useState<Specialty | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [centerId, setCenterId] = useState<string>(SPECIALTIES[0].id);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrollerRect = el.getBoundingClientRect();
        const center = scrollerRect.left + scrollerRect.width / 2;
        let bestId = centerId;
        let bestDist = Infinity;
        Array.from(el.querySelectorAll<HTMLElement>("[data-tl-node]")).forEach(
          (node) => {
            const r = node.getBoundingClientRect();
            const c = r.left + r.width / 2;
            const dist = Math.abs(c - center);
            const norm = Math.min(1, dist / (scrollerRect.width / 2));
            const inner = node.querySelector<HTMLElement>("[data-tl-inner]");
            if (inner) {
              const scale = 1 - norm * 0.22;
              const lift = (1 - norm) * 6;
              inner.style.transform = `translateY(${-lift}px) scale(${scale})`;
              inner.style.opacity = String(0.4 + (1 - norm) * 0.55);
            }
            if (dist < bestDist) {
              bestDist = dist;
              bestId = node.dataset.id || bestId;
            }
          }
        );
        if (bestId !== centerId) setCenterId(bestId);
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [centerId]);

  const centerSpec = byId(centerId) ?? SPECIALTIES[0];

  const handleNodeClick = (s: Specialty) => {
    const el = scrollerRef.current?.querySelector<HTMLElement>(
      `[data-tl-node][data-id="${s.id}"]`
    );
    if (el && s.id !== centerId) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setTimeout(() => setSelected(s), 240);
    } else {
      setSelected(s);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">

      {/* Núcleo central compacto */}
      <div className="flex flex-col items-center">
        <div
          className="relative h-24 w-24 rounded-full bg-background flex items-center justify-center animate-[corepulse_5s_ease-in-out_infinite]"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)",
            boxShadow:
              "0 20px 50px -24px color-mix(in oklab, var(--primary) 60%, transparent)",
          }}
        >
          <LongevinMark className="h-7 w-auto opacity-90" />
        </div>
        <p className="mt-3 font-serif text-[10px] tracking-[0.28em] uppercase text-foreground/75">
          Medicina Integrada
        </p>
        <p className="mt-3 max-w-[300px] text-center text-sm leading-relaxed text-foreground/65">
          Deslize pelas especialidades e descubra como nossa equipe atua de forma integrada para cuidar da sua saúde.
        </p>
      </div>

      <div className="relative mt-10 w-full overflow-hidden">

      <div className="relative mt-10">
        {/* Linha base contínua */}
        <div className="pointer-events-none absolute inset-x-0 top-[44px] h-px bg-[color-mix(in_oklab,var(--primary)_18%,transparent)]" />
        {/* Segmento dourado centralizado (item ativo) */}
        <div
          className="pointer-events-none absolute top-[43px] left-1/2 -translate-x-1/2 h-[2px] w-20 rounded-full"
          style={{ backgroundColor: "var(--gold)", opacity: 0.7 }}
        />

        <div
          ref={scrollerRef}
          className="relative overflow-x-auto snap-x snap-mandatory scroll-smooth flex items-start gap-5 px-[calc(50%-36px)] pt-1 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {SPECIALTIES.map((s) => {
            const isCenter = s.id === centerId;
            return (
              <button
                key={s.id}
                type="button"
                data-tl-node
                data-id={s.id}
                aria-label={s.name}
                aria-current={isCenter}
                onClick={() => handleNodeClick(s)}
                className="snap-center shrink-0 focus:outline-none w-[72px] flex flex-col items-center"
              >
                <div
                  data-tl-inner
                  className="flex items-center justify-center rounded-full bg-background will-change-transform"
                  style={{
                    width: isCenter ? 72 : 48,
                    height: isCenter ? 72 : 48,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isCenter
                      ? "var(--primary)"
                      : "color-mix(in oklab, var(--primary) 25%, transparent)",
                    boxShadow: isCenter
                      ? "0 18px 40px -16px color-mix(in oklab, var(--primary) 65%, transparent)"
                      : "0 4px 12px -10px color-mix(in oklab, var(--primary) 30%, transparent)",
                    transition:
                      "width 320ms cubic-bezier(0.2,0.7,0.2,1), height 320ms cubic-bezier(0.2,0.7,0.2,1), border-color 280ms, box-shadow 320ms",
                  }}
                >
                  <s.Icon
                    className="text-primary"
                    style={{ width: isCenter ? 22 : 16, height: isCenter ? 22 : 16 }}
                    strokeWidth={1.3}
                  />
                </div>
                <span
                  className={`mt-2 font-serif leading-tight text-center px-0.5 transition-all duration-300 ${
                    isCenter
                      ? "text-[13px] text-foreground/90"
                      : "text-[11px] text-foreground/55"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview ao vivo do item central */}
      <button
        key={centerSpec.id}
        type="button"
        onClick={() => setSelected(centerSpec)}
        aria-label={`Ver detalhes de ${centerSpec.name}`}
        className="mt-2 w-full max-w-md mx-auto block text-left rounded-2xl bg-background/60 px-5 py-4 animate-[fade-in_240ms_ease-out] focus:outline-none"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "color-mix(in oklab, var(--primary) 14%, transparent)",
        }}
      >
        <div className="flex items-center gap-3">
          <centerSpec.Icon className="h-4 w-4 text-primary" strokeWidth={1.4} />
          <h4 className="font-serif text-[18px] leading-none">{centerSpec.name}</h4>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/65">
          {centerSpec.short}
        </p>
        <p className="mt-3 text-[10px] tracking-[0.24em] uppercase text-gold">
          Toque para ver detalhes →
        </p>
      </button>

      {/* Bottom sheet */}
      <Drawer open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DrawerContent
          className="bg-card rounded-t-[28px] px-6 pb-10 pt-2 h-[75vh]"
          style={{
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderRightWidth: "1px",
            borderStyle: "solid",
            borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
            boxShadow:
              "0 -24px 60px -28px color-mix(in oklab, var(--primary) 50%, transparent)",
          }}
        >
          {selected && (
            <div className="mx-auto w-full max-w-md overflow-y-auto pr-1">
              <div className="flex items-start justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full bg-background"
                    style={{
                      width: 56,
                      height: 56,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor:
                        "color-mix(in oklab, var(--primary) 40%, transparent)",
                      boxShadow:
                        "0 12px 28px -14px color-mix(in oklab, var(--primary) 55%, transparent)",
                    }}
                  >
                    <selected.Icon
                      className="h-6 w-6 text-primary"
                      strokeWidth={1.3}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-gold">
                      Especialidade
                    </p>
                    <h3 className="font-serif text-[26px] leading-tight mt-0.5">
                      {selected.name}
                    </h3>
                  </div>
                </div>
                <DrawerClose
                  className="rounded-full h-9 w-9 flex items-center justify-center text-foreground/55 hover:text-foreground transition"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor:
                      "color-mix(in oklab, var(--primary) 22%, transparent)",
                  }}
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </DrawerClose>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-foreground/75">
                {selected.short}
              </p>

              <p className="mt-7 text-[10px] tracking-[0.22em] uppercase text-gold">
                Integra com
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.related.map((id) => {
                  const r = byId(id);
                  if (!r) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-serif text-foreground/80"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--primary) 8%, transparent)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor:
                          "color-mix(in oklab, var(--primary) 22%, transparent)",
                      }}
                    >
                      {r.name}
                    </span>
                  );
                })}
              </div>

              <p className="mt-7 text-[10px] tracking-[0.22em] uppercase text-gold">
                Objetivo
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/75">
                {selected.description}
              </p>

              <a
                href="#equipe"
                onClick={() => setSelected(null)}
                className="btn-ghost mt-8 inline-flex w-full justify-center"
              >
                Conhecer especialidade
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <style>{`
        @keyframes corepulse {
          0%, 100% { box-shadow: 0 20px 50px -24px color-mix(in oklab, var(--primary) 60%, transparent); }
          50%      { box-shadow: 0 24px 60px -20px color-mix(in oklab, var(--primary) 75%, transparent); }
        }
      `}</style>
    </div>
  );
}

