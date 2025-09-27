import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight, Download, Globe, Mail, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactActionIcon, ContactActionKey } from "@/data/businessCard";

const iconMap: Record<ContactActionIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  Phone,
  Mail,
  Globe,
};

type ContactButtonData = {
  key: ContactActionKey;
  label: string;
  detail: string;
  icon: ContactActionIcon;
  onClick: () => void;
};

interface ContactActionsProps {
  actions: ContactButtonData[];
  sectionLabel: string;
  quickActions: {
    downloadLabel: string;
    shareLabel: string;
  };
  onDownload: () => void;
  onShare: () => void | Promise<void>;
}

function ContactButton({ action }: { action: ContactButtonData }) {
  const Icon = iconMap[action.icon];

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
          <Icon className="h-5 w-5" aria-hidden />
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

const ContactActions = ({ actions, sectionLabel, quickActions, onDownload, onShare }: ContactActionsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4" aria-label={sectionLabel}>
        {actions.map((action) => (
          <ContactButton key={action.key} action={action} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4" aria-label="Acciones rápidas">
        <Button
          variant="secondary"
          onClick={onDownload}
          className="gap-3 rounded-3xl bg-black px-6 py-5 text-base font-semibold text-white shadow hover:bg-black/80"
        >
          <Download className="h-5 w-5" aria-hidden />
          {quickActions.downloadLabel}
        </Button>
        <Button
          variant="ghost"
          onClick={onShare}
          className="gap-3 rounded-3xl border border-primary bg-white px-6 py-5 text-base font-semibold text-primary shadow-sm hover:bg-primary/10"
        >
          <Share2 className="h-5 w-5" aria-hidden />
          {quickActions.shareLabel}
        </Button>
      </div>
    </div>
  );
};

export type { ContactButtonData };
export default ContactActions;
