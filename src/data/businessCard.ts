const basePath = import.meta.env.BASE_URL;

export type ContactActionKey = "phone" | "email" | "website";
export type ContactActionIcon = "Phone" | "Mail" | "Globe";
export type TagIconKey = "MapPin" | "CalendarClock";

export interface ContactActionConfig {
  key: ContactActionKey;
  label: string;
  detail: string;
  icon: ContactActionIcon;
  feedback: string;
}

export interface HeroConfig {
  badge: string;
  name: string;
  title: string;
  companyName: string;
  companyDescription: string;
  addresses: Array<{ label: string; value: string }>;
  tags: Array<{ label: string; variant: "default" | "outline"; icon?: TagIconKey }>;
  specialization: {
    label: string;
    items: Array<{ label: string; description: string }>;
  };
}

export interface ContactConfig {
  sectionLabel: string;
  actions: ContactActionConfig[];
  whatsappNumber: string;
  whatsappMessage: string;
  email: {
    address: string;
    subject: string;
    body: string;
  };
  websiteUrl: string;
  quickActions: {
    downloadLabel: string;
    shareLabel: string;
  };
  shareMetadata: {
    title: string;
    text: string;
  };
  feedback: {
    download: string;
    shareSuccess: string;
    shareClipboard: string;
    sharePrompt: string;
    shareError: string;
  };
}

export interface GallerySlide {
  src: string;
  alt: string;
  caption: string;
}

export interface GalleryConfig {
  overlayLabel: string;
  sectionTitle: string;
  slides: GallerySlide[];
  cta?: {
    label: string;
    url: string;
  };
}

export interface InsightsConfig {
  company: {
    subtitle: string;
    title: string;
    bullets: string[];
  };
  strategy: {
    badge: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
}

export interface ClosingConfig {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface VCardConfig {
  lastName: string;
  firstName: string;
  fullName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  url: string;
  address: string;
  note: string;
  downloadName: string;
}

export interface BusinessCardConfig {
  assets: {
    backgroundImage: string;
    logoImage: string;
    profileImage: {
      src: string;
      alt: string;
    };
  };
  hero: HeroConfig;
  contact: ContactConfig;
  gallery: GalleryConfig;
  insights: InsightsConfig;
  closing: ClosingConfig;
  vcard: VCardConfig;
}

export const businessCardConfig: BusinessCardConfig = {
  assets: {
    backgroundImage: `${basePath}imagenes/09.jpeg`,
    logoImage: `${basePath}imagenes/Foton-logo-01.png`,
    profileImage: {
      src: `${basePath}imagenes/otras fotos/JP.1.png`,
      alt: "Retrato profesional de Jhon Carlos Pérez Cubas",
    },
  },
  hero: {
    badge: "Foton Business Card",
    name: "Jhon Carlos Pérez Cubas",
    title: "Business Manager - Foton International Trade Co., Ltd.",
    companyName: "Foton International Trade Co., Ltd.",
    companyDescription: "Oficina de representación para proyectos estratégicos en Perú y Latinoamérica.",
    addresses: [
      {
        label: "HQ Oficina Central Beijing:",
        value: "No.15, Shayang Road, Shahe, Changping District, Beijing 102206",
      },
      {
        label: "FOTON Internacional (Perú):",
        value: "Av. Guardia Civil 1321, Int. 802, Surquillo, Lima",
      },
    ],
    tags: [
      { label: "Perú", variant: "default" },
      { label: "Lima", variant: "outline", icon: "MapPin" },
      { label: "Desde 2017", variant: "outline", icon: "CalendarClock" },
    ],
    specialization: {
      label: "Representante",
      items: [
        { label: "PICKUP", description: "" },
        { label: "VAN", description: "" },
        { label: "MINIBUS", description: "" },
        { label: "MINITRUCK", description: "" },
        { label: "LDT", description: "" },
      ],
    },
  },
  contact: {
    sectionLabel: "Canales de contacto",
    actions: [
      {
        key: "phone",
        label: "Teléfono",
        detail: "+51 937 375 605",
        icon: "Phone",
        feedback: "Abriendo WhatsApp",
      },
      {
        key: "email",
        label: "Correo",
        detail: "jhoncarlosperezcubas@gmail.com",
        icon: "Mail",
        feedback: "Redactando correo",
      },
      {
        key: "website",
        label: "Sitio web",
        detail: "www.fotonmotor.com",
        icon: "Globe",
        feedback: "Abriendo sitio web",
      },
    ],
    whatsappNumber: "51937375605",
    whatsappMessage: "Hola Jhon, vi tu tarjeta de presentación y me gustaría contactarte.",
    email: {
      address: "jhoncarlosperezcubas@gmail.com",
      subject: "Consulta - Tarjeta FOTON",
      body: "Hola Jhon,\n\nTe contacto desde tu tarjeta de presentación.\n\nGracias,",
    },
    websiteUrl: "https://www.fotonmotor.com",
    quickActions: {
      downloadLabel: "Descargar vCard",
      shareLabel: "Compartir tarjeta",
    },
    shareMetadata: {
      title: "Tarjeta Virtual FOTON - Jhon Carlos Pérez Cubas",
      text: "Conoce la tarjeta de presentación virtual de Jhon Carlos Pérez Cubas (FOTON).",
    },
    feedback: {
      download: "Descargando vCard de Jhon Carlos",
      shareSuccess: "Tarjeta compartida correctamente",
      shareClipboard: "Enlace copiado al portapapeles",
      sharePrompt: "Comparte el enlace copiado",
      shareError: "No fue posible compartir en este dispositivo",
    },
  },
  gallery: {
    overlayLabel: "Galería corporativa FOTON",
    sectionTitle: "Galería",
    slides: [
      {
        src: `${basePath}imagenes/otras fotos/F1.jpeg`,
        alt: "Camiones FOTON alineados frente a un centro logístico",
        caption: "Soluciones de carga pesada adaptadas al mercado peruano.",
      },
      {
        src: `${basePath}imagenes/otras fotos/F2.jpg`,
        alt: "Flota de vehículos ligeros FOTON en exhibición",
        caption: "Eficiencia para transporte urbano y distribución de última milla.",
      },
      {
        src: `${basePath}imagenes/otras fotos/F3.jpg`,
        alt: "Camión FOTON en carretera andina",
        caption: "Rendimiento comprobado en rutas de alta exigencia.",
      },
    ],
    cta: {
      label: "Probar vista 720°",
      url: "https://zhanting2023.foton.com.cn/p4_9/",
    },
  },
  insights: {
    company: {
      subtitle: "FOTON en la región",
      title: "Innovación y soporte integral",
      bullets: [
        "Cadena de suministro optimizada para proyectos industriales, minería y construcción.",
        "Soporte técnico y capacitación personalizada para flotas en operación en Perú.",
        "Red global de repuestos y servicios con presencia en más de 110 países.",
      ],
    },
    strategy: {
      badge: "Actualidad 2025",
      description: "Estrategias comerciales y alianzas estratégicas para el portafolio FOTON en Perú.",
      items: [
        {
          title: "Enfoque",
          description: "Movilidad sostenible para segmentos de carga pesada y ligera.",
        },
        {
          title: "Cobertura",
          description: "Lima y principales corredores logísticos nacionales.",
        },
      ],
    },
  },
  closing: {
    title: "",
    description: "",
    image: {
      src: `${basePath}imagenes/otras fotos/GF1.jpeg`,
      alt: "Equipo comercial de FOTON internacional reunido",
    },
  },
  vcard: {
    lastName: "Pérez Cubas",
    firstName: "Jhon Carlos",
    fullName: "Jhon Carlos Pérez Cubas",
    organization: "Foton International Trade Co., Ltd.",
    title: "Business Manager",
    email: "jhoncarlosperezcubas@gmail.com",
    phone: "+51937375605",
    url: "https://www.fotonmotor.com",
    address: "No.15, Shayang Road, Shahe, Changping District, Beijing 102206, China",
    note: "Tarjeta virtual de Jhon Carlos Pérez Cubas - Foton International Trade Co., Ltd.",
    downloadName: "Jhon_Carlos_Perez_Cubas.vcf",
  },
};