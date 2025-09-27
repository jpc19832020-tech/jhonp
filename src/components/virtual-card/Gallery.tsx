import { useCallback, useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GalleryConfig } from "@/data/businessCard";

interface GalleryProps {
  data: GalleryConfig;
  onImageClick?: (index: number) => void;
}

const Gallery = ({ data, onImageClick }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const totalSlides = data.slides.length;

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const overlayTimer = window.setTimeout(() => setShowOverlay(false), 3200);
    return () => window.clearTimeout(overlayTimer);
  }, []);

  useEffect(() => {
    if (totalSlides <= 1) {
      return;
    }

    const autoPlayTimer = window.setInterval(goToNext, 5000);
    return () => window.clearInterval(autoPlayTimer);
  }, [goToNext, totalSlides]);

  const handleImageClick = useCallback(() => {
    if (onImageClick) {
      onImageClick(activeIndex);
    }
  }, [activeIndex, onImageClick]);

  const handleOpenCta = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (data.cta) {
        window.open(data.cta.url, "_blank", "noopener,noreferrer");
      }
    },
    [data.cta],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleImageClick();
      }
    },
    [handleImageClick],
  );

  

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black text-white shadow-2xl">
      <div
        className="relative h-64 w-full overflow-hidden sm:h-72"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {data.slides.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={cn(
              "absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-opacity duration-500",
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
              {data.overlayLabel}
            </div>
          </div>
        )}

        {data.cta ? (
          <Button
            type="button"
            variant="ghost"
            onClick={handleOpenCta}
            className="absolute right-4 top-4 rounded-full border border-white/80 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10"
          >
            {data.cta.label}
          </Button>
        ) : null}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {data.slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-3 w-3 rounded-full border border-white transition",
                index === activeIndex ? "bg-primary" : "bg-transparent",
              )}
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(index);
              }}
              aria-label={`Mostrar imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();
            goToPrevious();
          }}
          className="ml-3 rounded-full border border-white/60 bg-white/15 p-2 text-white hover:bg-white/25"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();
            goToNext();
          }}
          className="mr-3 rounded-full border border-white/60 bg-white/15 p-2 text-white hover:bg-white/25"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">{data.sectionTitle}</p>
            <p className="font-semibold">{data.slides[activeIndex]?.caption}</p>
          </div>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold">
            {activeIndex + 1}/{totalSlides}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;