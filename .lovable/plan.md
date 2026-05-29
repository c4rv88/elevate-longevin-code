## Ícones minimalistas de especialidades

Substituir o `SpecialtyIcon` genérico (círculo + cruz) por ícones lineares específicos de cada especialidade, usando `lucide-react` (já no projeto). Mantém visual clean, traço fino, tom premium e consistente com o site.

### Mapeamento

| Especialidade | Ícone lucide |
|---|---|
| Clínica Médica | `Stethoscope` |
| Geriatria | `HeartHandshake` |
| Cardiologia | `HeartPulse` |
| Endocrinologia | `Activity` |
| Dermatologia | `Sparkles` |
| Neurologia | `Brain` |
| Nutrição | `Apple` |
| Oftalmologia | `Eye` |
| Reumatologia | `Bone` |
| Psiquiatria | `BrainCircuit` |
| Psicologia | `MessageCircleHeart` |

### Implementação em `src/routes/index.tsx`

1. Importar os ícones acima de `lucide-react`.
2. Mudar o array `specialties` de `string[]` para `{ name: string; Icon: LucideIcon }[]`.
3. No `.map`, renderizar `<s.Icon className="h-8 w-8 text-primary/70 group-hover:text-primary transition-colors" strokeWidth={1.25} />` no lugar do `<SpecialtyIcon />`.
4. Remover o componente local `SpecialtyIcon` (não mais utilizado).
5. Manter card, kicker numerado, título serif, hover sutil — sem alterar layout, espaçamentos ou cores.

`strokeWidth={1.25}` garante traço fino e elegante, alinhado ao mood minimalista pedido. Nada mais é alterado.
