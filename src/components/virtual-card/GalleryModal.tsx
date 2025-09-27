import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GalleryConfig } from "@/data/businessCard";

interface GalleryModalProps {
  isOpen: boolean;
  initialIndex: number;
  data: GalleryConfig;
  onClose: () => void;
}

const GalleryModal = ({ isOpen, initialIndex, data, onClose }: GalleryModalProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  const totalSlides = data.slides.length;
  

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!isOpen || totalSlides <= 1) {
      return;
    }

    const autoPlayTimer = window.setInterval(goToNext, 5000);
    return () => window.clearInterval(autoPlayTimer);
  }, [goToNext, isOpen, totalSlides]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/90 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/40 bg-black/60 p-2 text-white transition hover:bg-white/10"
          aria-label="Cerrar galería"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden">
          {data.slides.map((image, index) => (
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {data.cta ? (
            <Button
              variant="ghost"
              onClick={() => window.open(data.cta!.url, "_blank", "noopener,noreferrer")}
              className="absolute right-6 top-6 rounded-full border border-white/80 bg-transparent px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10"
            >
              {data.cta.label}
            </Button>
          ) : null}

          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              onClick={goToPrevious}
              className="ml-4 rounded-full border border-white/40 bg-white/15 p-3 text-white hover:bg-white/25"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              onClick={goToNext}
              className="mr-4 rounded-full border border-white/40 bg-white/15 p-3 text-white hover:bg-white/25"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 bg-black/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{data.sectionTitle}</p>
              <p className="text-base font-semibold text-white">{data.slides[activeIndex]?.caption}</p>
            </div>
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              {activeIndex + 1}/{totalSlides}
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {data.slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-3.5 w-3.5 rounded-full border border-white transition",
                index === activeIndex ? "bg-primary" : "bg-transparent",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Mostrar imagen ${index + 1}`}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Vista ampliada
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default GalleryModal;