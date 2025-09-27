import { Building2, CalendarClock, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { HeroConfig, TagIconKey } from "@/data/businessCard";
import { cn } from "@/lib/utils";

const tagIconMap: Record<TagIconKey, typeof MapPin> = {
  MapPin,
  CalendarClock,
};

interface HeroProps {
  data: HeroConfig;
}

const Hero = ({ data }: HeroProps) => {
  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {data.badge}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            {data.name}
          </h1>
          <p className="text-base font-semibold text-primary sm:text-lg">{data.title}</p>
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
                <h2 className="text-xl font-semibold leading-tight text-black">{data.companyName}</h2>
                <p className="mt-1 text-sm text-neutral-700">{data.companyDescription}</p>
              </div>
              <div className="space-y-3 text-sm text-neutral-800">
                {data.addresses.map((address) => (
                  <div key={address.label}>
                    <span className="font-semibold text-primary">{address.label}</span>
                    <p className="mt-1 leading-relaxed">{address.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {data.tags.map((tag) => {
                  const Icon = tag.icon ? tagIconMap[tag.icon] : null;
                  return (
                    <Badge
                      key={tag.label}
                      variant={tag.variant}
                      className={cn(
                        tag.variant === "outline"
                          ? "gap-1 text-primary"
                          : undefined,
                      )}
                    >
                      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
                      {tag.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <Truck className="h-4 w-4" aria-hidden /> {data.specialization.label}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.specialization.items.map((item) => (
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
      </div>
    </div>
  );
};

export default Hero;