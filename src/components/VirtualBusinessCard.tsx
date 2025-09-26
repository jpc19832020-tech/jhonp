import { useCallback, useEffect, useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Download,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

type ContactAction = {
  label: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

const galleryImages: GalleryImage[] = [
  {
    src: `${import.meta.env.BASE_URL}imagenes/otras fotos/F1.jpeg`,
    alt: "Camiones FOTON alineados frente a un centro logístico",
    caption: "Soluciones de carga pesada adaptadas al mercado peruano",
  },
  {
    src: `${import.meta.env.BASE_URL}imagenes/otras fotos/F2.jpg`,
    alt: "Flota de vehículos ligeros FOTON en exhibición",
    caption: "Eficiencia para transporte urbano y distribución de última milla",
  },
  {
    src: `${import.meta.env.BASE_URL}imagenes/otras fotos/F3.jpg`,
    alt: "Camión FOTON en carretera andina",
    caption: "Rendimiento comprobado en rutas de alta exigencia",
  },
];

const closingImage = {
  src: `${import.meta.env.BASE_URL}imagenes/otras fotos/GF1.jpeg`,
  alt: "Equipo comercial de FOTON internacional reunido",
};

const whatsappMessage = "Hola Jhon, vi tu tarjeta de presentación y me gustaría contactarte.";

const composeGmailUrl = (email: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email,
  )}&su=${encodeURIComponent("Consulta — Tarjeta FOTON")}&body=${encodeURIComponent(
    "Hola Jhon,\n\nTe contacto desde tu tarjeta de presentación.\n\nGracias,",
  )}`;

const backgroundImage = `${import.meta.env.BASE_URL}imagenes/09.jpeg`;
const logoImage = `${import.meta.env.BASE_URL}imagenes/Foton-logo-01.png`;

function ContactButton({ action }: { action: ContactAction }) {
  const Icon = action.icon;

  return (
    <Button
      onClick={action.onClick}
      variant="outline"
      className={cn(
        "group flex w-full items-center justify-between rounded-3xl border border-black/10 bg-white px-6 py-6 text-left text-black shadow-sm transition hover:border-primary hover:shadow-lg",
      )}
    >
      <span className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white transition group-hover:scale-105">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span className="space-y-1">
          <span className="block text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {action.label}
          </span>
          <span className="block text-base font-semibold text-black sm:text-lg">
            {action.detail}
          </span>
        </span>
      </span>
      <ArrowUpRight
        className="h-6 w-6 text-primary transition group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      />
    </Button>
  );
}

const VirtualBusinessCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const overlayTimer = window.setTimeout(() => setShowOverlay(false), 3200);
    return () => window.clearTimeout(overlayTimer);
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const openExternal = useCallback((url: string, message: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setFeedback(message);
  }, []);

  const handleDownloadVCard = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Pérez Cubas;Jhon Carlos;;;",
      "FN:Jhon Carlos Pérez Cubas",
      "ORG:Foton International Trade Co., Ltd.",
      "TITLE:Business Manager",
      "EMAIL;TYPE=HOME:jhoncarlosperezcubas@gmail.com",
      "TEL;TYPE=CELL:+51937375605",
      "URL:https://www.fotonmotor.com",
      "ADR:;;No.15, Shayang Road, Shahe, Changping District;Beijing;;102206;China",
      "NOTE:Tarjeta virtual de Jhon Carlos Pérez Cubas — Foton International Trade Co., Ltd.",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const link = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "Jhon_Carlos_Perez_Cubas.vcf";
    anchor.click();
    URL.revokeObjectURL(link);
    setFeedback("Descargando vCard de Jhon Carlos");
  }, []);

  const handleShare = useCallback(async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: "Tarjeta Virtual FOTON — Jhon Carlos Pérez Cubas",
      text: "Conoce la tarjeta de presentación virtual de Jhon Carlos Pérez Cubas (FOTON)",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback("Tarjeta compartida correctamente");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setFeedback("Enlace copiado al portapapeles");
      } else {
        window.prompt("Copia este enlace", shareUrl);
        setFeedback("Comparte el enlace copiado");
      }
    } catch {
      setFeedback("No fue posible compartir en este dispositivo");
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % galleryImages.length);
  }, []);

  const contactActions = useMemo<ContactAction[]>(
    () => [
      {
        label: "Teléfono",
        detail: "+51 937 375 605",
        icon: Phone,
        onClick: () =>
          openExternal(
            `https://wa.me/51937375605?text=${encodeURIComponent(whatsappMessage)}`,
            "Abriendo WhatsApp",
          ),
      },
      {
        label: "Email",
        detail: "jhoncarlosperezcubas@gmail.com",
        icon: Mail,
        onClick: () =>
          openExternal(composeGmailUrl("jhoncarlosperezcubas@gmail.com"), "Redactando correo"),
      },
      {
        label: "Sitio Web",
        detail: "www.fotonmotor.com",
        icon: Globe,
        onClick: () => openExternal("https://www.fotonmotor.com", "Abriendo sitio web"),
      },
    ],
    [openExternal],
  );

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/80" />

      {feedback && (
        <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
          <div
            role="status"
            className="flex items-center gap-3 rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary shadow-xl"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {feedback}
          </div>
        </div>
      )}

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-8 lg:px-10">
        <Card className="w-full overflow-hidden border border-white/10 bg-white text-black shadow-2xl">
          <div className="flex h-20 items-center justify-center bg-primary text-white">
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em]">
              <Sparkles className="h-4 w-4" aria-hidden /> Espacio para imagen
            </span>
          </div>

          <CardContent className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <section className="space-y-10">
                <header className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Foton Business Card
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                      Jhon Carlos Pérez Cubas
                    </h1>
                    <p className="text-base font-semibold text-primary sm:text-lg">
                      Business Manager — Foton International Trade Co., Ltd.
                    </p>
                  </div>
                </header>

                <div className="space-y-6">
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold leading-tight text-black">
                            Foton International Trade Co., Ltd.
                          </h2>
                          <p className="mt-1 text-sm text-neutral-700">
                            Oficina de representación para proyectos estratégicos en Perú y Latinoamérica.
                          </p>
                        </div>
                        <div className="space-y-3 text-sm text-neutral-800">
                          <div>
                            <span className="font-semibold text-primary">HQ Oficina Central Beijing:</span>
                            <p className="mt-1 leading-relaxed">
                              No.15, Shayang Road, Shahe, Changping District, Beijing 102206
                            </p>
                          </div>
                          <div>
                            <span className="font-semibold text-primary">FOTON Internacional (Perú):</span>
                            <p className="mt-1 leading-relaxed">
                              Av. Guardia Civil 1321, Int. 802, Surquillo, Lima
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>Peru Office</Badge>
                          <Badge variant="outline" className="gap-1 text-primary">
                            <MapPin className="h-3.5 w-3.5" aria-hidden /> Lima, Perú
                          </Badge>
                          <Badge variant="outline" className="gap-1 text-primary">
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Desde 2017
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      <Truck className="h-4 w-4" aria-hidden /> Especialización
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {[
                        { label: "PV", description: "Power Vehicles (Carga Pesada)" },
                        { label: "MT", description: "Medium Trucks" },
                        { label: "LDT", description: "Light Duty Trucks" },
                      ].map((item) => (
                        <Badge
                          key={item.label}
                          variant="outline"
                          className="rounded-full border-primary bg-white px-5 py-2 text-primary"
                        >
                          <span className="sr-only">{item.description}</span>
                          {item.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4" aria-label="Canales de contacto">
                    {contactActions.map((action) => (
                      <ContactButton key={action.detail} action={action} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4" aria-label="Acciones rápidas">
                    <Button
                      variant="secondary"
                      onClick={handleDownloadVCard}
                      className="gap-3 rounded-3xl bg-black px-6 py-5 text-base font-semibold text-white shadow hover:bg-black/80"
                    >
                      <Download className="h-5 w-5" aria-hidden />
                      Descargar vCard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleShare}
                      className="gap-3 rounded-3xl border border-primary bg-white px-6 py-5 text-base font-semibold text-primary shadow-sm hover:bg-primary/10"
                    >
                      <Share2 className="h-5 w-5" aria-hidden />
                      Compartir tarjeta
                    </Button>
                  </div>
                </div>
              </section>

              <aside className="space-y-8">
                <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black text-white shadow-2xl">
                  <div className="relative h-64 w-full overflow-hidden sm:h-72">
                    {galleryImages.map((image, index) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                          index === activeIndex ? "opacity-100" : "opacity-0",
                        )}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {showOverlay && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-sm font-semibold text-black">
                          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                          Galería corporativa FOTON
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={cn(
                            "h-3 w-3 rounded-full border border-white transition",
                            index === activeIndex ? "bg-primary" : "bg-transparent",
                          )}
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Mostrar imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <Button
                      variant="ghost"
                      onClick={goToPrevious}
                      className="ml-3 rounded-full border border-white/60 bg-white/15 p-2 text-white hover:bg-white/25"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      variant="ghost"
                      onClick={goToNext}
                      className="mr-3 rounded-full border border-white/60 bg-white/15 p-2 text-white hover:bg-white/25"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </Button>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Galería</p>
                        <p className="font-semibold">
                          {galleryImages[activeIndex]?.caption}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {activeIndex + 1}/{galleryImages.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={logoImage}
                      alt="Logotipo de FOTON"
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-600">FOTON en la región</p>
                      <p className="text-lg font-semibold text-black">
                        Innovación y soporte integral
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-700">
                    <li>
                      • Cadena de suministro optimizada para proyectos industriales, minería y construcción.
                    </li>
                    <li>
                      • Soporte técnico y capacitación personalizada para flotas en operación en Perú.
                    </li>
                    <li>
                      • Red global de repuestos y servicios con presencia en más de 110 países.
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <Badge variant="outline" className="rounded-2xl border-primary bg-primary/10 px-4 py-1 text-primary">
                      Actualidad 2025
                    </Badge>
                    <span className="text-sm text-neutral-700">
                      Estrategias comerciales y alianzas estratégicas para el portafolio FOTON en Perú.
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">Enfoque</p>
                      <p className="mt-2 text-base font-semibold text-black">
                        Movilidad sostenible para segmentos de carga pesada y ligera.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">Cobertura</p>
                      <p className="mt-2 text-base font-semibold text-black">
                        Lima y principales corredores logísticos nacionales.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </CardContent>

          <div className="border-t border-black/10 bg-black">
            <div className="relative h-56 w-full overflow-hidden sm:h-64">
              <img
                src={closingImage.src}
                alt={closingImage.alt}
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
                <p className="text-lg font-semibold uppercase tracking-[0.3em] text-primary">
                  Compromiso FOTON Perú
                </p>
                <p className="max-w-2xl text-sm sm:text-base">
                  Equipo internacional dedicado a potenciar alianzas estratégicas y soluciones de transporte innovadoras para el mercado peruano.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VirtualBusinessCard;
