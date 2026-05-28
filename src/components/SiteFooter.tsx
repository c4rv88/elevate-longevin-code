import { LongevinMark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="relative bg-[oklch(0.96_0.01_100)] border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center">
              <LongevinMark className="h-12 w-auto" />
            </div>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-foreground/80">
              Um ecossistema em saúde onde as especialidades se conectam, o tempo é respeitado e o cuidado é personalizado.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Navegação</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/75">
              <li><a className="link-underline" href="#home">Home</a></li>
              <li><a className="link-underline" href="#sobre">A Longevin</a></li>
              <li><a className="link-underline" href="#especialidades">Especialidades</a></li>
              <li><a className="link-underline" href="#equipe">Equipe</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Contato</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/75">
              <li>08:00h — 19:00h</li>
              <li><a className="link-underline" href="mailto:contato@longevin.com.br">contato@longevin.com.br</a></li>
              <li><a className="link-underline" href="tel:+558599310000">+55 85 9931-0000</a></li>
            </ul>
            <a href="https://agende.longevin.com.br/" target="_blank" rel="noopener noreferrer" className="btn-premium mt-8">
              Agendar consulta <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs tracking-[0.18em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Longevin · Medicina Integrada</span>
          <span>Fortaleza · Ceará</span>
        </div>
      </div>
    </footer>
  );
}
