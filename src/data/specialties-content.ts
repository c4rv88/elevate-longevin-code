import {
  Bone,
  Brain,
  BrainCircuit,
  HeartHandshake,
  HeartPulse,
  MessageCircleHeart,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type SpecialtyContent = {
  slug: string;
  name: string;
  tagline: string;
  paragraphs: string[];
  Icon: LucideIcon;
  metaDescription: string;
};

export const SPECIALTY_CONTENT: Record<string, SpecialtyContent> = {
  geriatria: {
    slug: "geriatria",
    name: "Geriatria",
    tagline:
      "Cuidado integral para envelhecer com saúde, autonomia e qualidade de vida",
    Icon: HeartHandshake,
    metaDescription:
      "Geriatria na Longevin: cuidado integral e personalizado para envelhecer com autonomia, saúde e qualidade de vida.",
    paragraphs: [
      "O envelhecimento é uma etapa natural da vida, mas cada pessoa vivencia esse processo de forma única. A Geriatria é a especialidade médica dedicada à prevenção, diagnóstico e acompanhamento das condições de saúde que podem surgir com o passar dos anos, sempre com foco na manutenção da autonomia, independência e qualidade de vida.",
      "Na Longevin, entendemos que envelhecer bem vai muito além de tratar doenças. Nosso olhar está voltado para o indivíduo como um todo, considerando aspectos físicos, cognitivos, emocionais e sociais que influenciam diretamente o bem-estar e a longevidade.",
      "O acompanhamento geriátrico permite identificar precocemente alterações de saúde, ajustar tratamentos, revisar medicamentos e desenvolver estratégias que favoreçam uma vida mais ativa e segura. Além disso, auxilia no controle de doenças crônicas, prevenção de quedas, avaliação da memória e promoção da saúde em todas as fases do envelhecimento.",
      "Nosso objetivo é oferecer um cuidado personalizado, respeitando a história, os hábitos e as necessidades de cada paciente, para que ele possa viver essa etapa da vida com mais tranquilidade, confiança e qualidade.",
    ],
  },
  "clinica-medica": {
    slug: "clinica-medica",
    name: "Clínica Médica",
    tagline: "Uma visão ampla e integrada da sua saúde",
    Icon: Stethoscope,
    metaDescription:
      "Clínica Médica na Longevin: avaliação completa, prevenção e acompanhamento contínuo, com uma visão ampla e integrada da saúde.",
    paragraphs: [
      "A Clínica Médica é uma das especialidades mais importantes para quem busca um acompanhamento completo da saúde. Ela atua na prevenção, diagnóstico e tratamento de diversas condições clínicas, oferecendo uma visão abrangente do funcionamento do organismo.",
      "Na Longevin, a Clínica Médica representa o ponto de partida para um cuidado integrado e personalizado. Durante a consulta, o médico avalia o histórico do paciente, seus hábitos de vida, fatores de risco e possíveis alterações que possam impactar sua saúde atual e futura.",
      "Muitas vezes, sintomas aparentemente simples podem estar relacionados a diferentes sistemas do organismo. Por isso, a avaliação clínica cuidadosa é fundamental para compreender o contexto geral do paciente e direcionar os cuidados necessários.",
      "Além do tratamento de doenças, a Clínica Médica possui papel fundamental na prevenção, acompanhamento de condições crônicas e promoção da saúde, ajudando o paciente a desenvolver hábitos que favoreçam uma vida mais saudável e equilibrada.",
      "Nosso compromisso é oferecer um acompanhamento próximo, humano e baseado em uma visão completa da saúde.",
    ],
  },
  neurologia: {
    slug: "neurologia",
    name: "Neurologia",
    tagline: "Cuidando da saúde do cérebro e do sistema nervoso",
    Icon: Brain,
    metaDescription:
      "Neurologia na Longevin: diagnóstico, prevenção e cuidado especializado para a saúde do cérebro e do sistema nervoso.",
    paragraphs: [
      "A Neurologia é a especialidade responsável pela prevenção, diagnóstico e tratamento das doenças que afetam o cérebro, a medula espinhal, os nervos e diversas funções relacionadas ao sistema nervoso.",
      "Alterações de memória, dores de cabeça frequentes, tonturas, dificuldades de concentração, tremores, alterações do sono e problemas de equilíbrio são alguns dos sinais que merecem uma avaliação especializada.",
      "Na Longevin, acreditamos que a saúde neurológica está diretamente ligada à qualidade de vida. Por isso, realizamos uma avaliação cuidadosa para compreender não apenas os sintomas, mas também os fatores que podem influenciar o funcionamento cerebral e cognitivo ao longo dos anos.",
      "O acompanhamento neurológico é fundamental para o diagnóstico precoce de diversas condições e para a adoção de estratégias que favoreçam a manutenção da autonomia, da capacidade funcional e do bem-estar.",
      "Nosso objetivo é oferecer um cuidado individualizado, promovendo saúde cerebral, prevenção e qualidade de vida em todas as fases da vida.",
    ],
  },
  reumatologia: {
    slug: "reumatologia",
    name: "Reumatologia",
    tagline: "Mais mobilidade, conforto e qualidade de vida",
    Icon: Bone,
    metaDescription:
      "Reumatologia na Longevin: cuidado especializado em articulações, músculos e doenças autoimunes para mais mobilidade e bem-estar.",
    paragraphs: [
      "A Reumatologia é a especialidade médica dedicada ao diagnóstico e tratamento de doenças que afetam articulações, músculos, tendões, ligamentos e estruturas relacionadas ao sistema musculoesquelético.",
      "Dores persistentes, rigidez articular, inchaços, limitações de movimento e desconfortos que interferem nas atividades diárias merecem atenção especializada e uma investigação adequada.",
      "Na Longevin, compreendemos que a saúde das articulações e dos músculos impacta diretamente a independência, a mobilidade e a qualidade de vida. Por isso, buscamos identificar não apenas os sintomas, mas também suas possíveis causas e fatores associados.",
      "O acompanhamento reumatológico permite controlar doenças inflamatórias, degenerativas e autoimunes, além de auxiliar na preservação da funcionalidade e da capacidade de realizar atividades cotidianas com segurança e conforto.",
      "Nosso foco está em promover mais movimento, bem-estar e autonomia para que cada paciente possa viver com mais qualidade.",
    ],
  },
  psicologia: {
    slug: "psicologia",
    name: "Psicologia",
    tagline: "Equilíbrio emocional para uma vida mais saudável",
    Icon: MessageCircleHeart,
    metaDescription:
      "Psicologia na Longevin: acompanhamento terapêutico acolhedor para equilíbrio emocional, autoconhecimento e qualidade de vida.",
    paragraphs: [
      "A saúde emocional exerce um papel fundamental na forma como lidamos com desafios, relacionamentos, trabalho, família e qualidade de vida. A Psicologia oferece um espaço acolhedor para autoconhecimento, desenvolvimento pessoal e cuidado da saúde mental.",
      "Na Longevin, entendemos que o bem-estar emocional é parte essencial da saúde integral. Por isso, valorizamos uma abordagem que respeita a individualidade de cada pessoa e suas necessidades específicas.",
      "Acompanhamento psicológico pode auxiliar em momentos de ansiedade, estresse, luto, mudanças importantes da vida, dificuldades de relacionamento, autoestima e diversas outras questões emocionais.",
      "Mais do que tratar sintomas, a Psicologia ajuda o paciente a compreender padrões de comportamento, desenvolver recursos internos e construir estratégias para viver de forma mais equilibrada e saudável.",
      "Nosso objetivo é oferecer suporte para que cada pessoa encontre mais qualidade de vida, bem-estar emocional e segurança em sua jornada.",
    ],
  },
  psiquiatria: {
    slug: "psiquiatria",
    name: "Psiquiatria",
    tagline: "Cuidado especializado para a saúde mental",
    Icon: BrainCircuit,
    metaDescription:
      "Psiquiatria na Longevin: avaliação, diagnóstico e tratamento humanizado para equilíbrio emocional e bem-estar.",
    paragraphs: [
      "A saúde mental é parte fundamental da saúde como um todo. A Psiquiatria é a especialidade médica responsável pela avaliação, diagnóstico e tratamento de transtornos e condições que afetam o bem-estar emocional, psicológico e comportamental.",
      "Ansiedade, depressão, alterações de humor, insônia, dificuldades de concentração e outros sintomas podem impactar significativamente a qualidade de vida e merecem atenção especializada.",
      "Na Longevin, acreditamos em uma abordagem acolhedora, individualizada e baseada na compreensão integral de cada paciente. Nosso foco está em identificar as necessidades específicas de cada pessoa e construir estratégias terapêuticas adequadas para seu momento de vida.",
      "O tratamento psiquiátrico busca promover equilíbrio emocional, funcionalidade e bem-estar, permitindo que o paciente desenvolva suas atividades e relacionamentos com mais qualidade e segurança.",
      "Cuidar da saúde mental é investir em qualidade de vida, autonomia e bem-estar duradouro.",
    ],
  },
  cardiologia: {
    slug: "cardiologia",
    name: "Cardiologia",
    tagline: "Prevenção e cuidado para uma vida mais saudável",
    Icon: HeartPulse,
    metaDescription:
      "Cardiologia na Longevin: prevenção, diagnóstico e acompanhamento contínuo para a saúde do coração em todas as fases da vida.",
    paragraphs: [
      "O coração desempenha um papel essencial no funcionamento de todo o organismo. A Cardiologia é a especialidade dedicada à prevenção, diagnóstico e tratamento das doenças cardiovasculares, além da avaliação dos fatores de risco que podem comprometer a saúde ao longo da vida.",
      "Hipertensão arterial, colesterol elevado, diabetes, sedentarismo, obesidade, histórico familiar e tabagismo são alguns dos fatores que merecem acompanhamento e atenção.",
      "Na Longevin, acreditamos que a prevenção é uma das ferramentas mais importantes para preservar a saúde cardiovascular. Por isso, realizamos avaliações individualizadas que permitem identificar riscos, orientar mudanças de hábitos e promover um acompanhamento contínuo.",
      "O cuidado cardiológico não se limita ao tratamento de doenças. Ele envolve a construção de estratégias para manter o coração saudável, melhorar a qualidade de vida e proporcionar mais segurança para que cada pessoa possa viver plenamente.",
      "Nosso compromisso é oferecer um cuidado humanizado, baseado em prevenção, acompanhamento e promoção da saúde cardiovascular em todas as fases da vida.",
    ],
  },
};

// Map specialty network id → page slug. Only ids present here have a page.
export const SPECIALTY_ID_TO_SLUG: Record<string, string> = {
  geriatria: "geriatria",
  clinica: "clinica-medica",
  neurologia: "neurologia",
  reumatologia: "reumatologia",
  psicologia: "psicologia",
  psiquiatria: "psiquiatria",
  cardiologia: "cardiologia",
};

export const getSpecialtyBySlug = (slug: string): SpecialtyContent | null =>
  SPECIALTY_CONTENT[slug] ?? null;
