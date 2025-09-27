import { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactActions, { type ContactButtonData } from "@/components/virtual-card/ContactActions";
import Gallery from "@/components/virtual-card/Gallery";
import GalleryModal from "@/components/virtual-card/GalleryModal";
import Hero from "@/components/virtual-card/Hero";
import Insights from "@/components/virtual-card/Insights";
import { businessCardConfig } from "@/data/businessCard";

const composeGmailUrl = (address: string, subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const createVCardPayload = () => {
  const { vcard } = businessCardConfig;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vcard.lastName};${vcard.firstName};;;`,
    `FN:${vcard.fullName}`,
    `ORG:${vcard.organization}`,
    `TITLE:${vcard.title}`,
    `EMAIL;TYPE=HOME:${vcard.email}`,
    `TEL;TYPE=CELL:${vcard.phone}`,
    `URL:${vcard.url}`,
    `ADR:;;${vcard.address}`,
    `NOTE:${vcard.note}`,
    "END:VCARD",
  ].join("\n");
};

const VirtualBusinessCard = () => {
  const { assets, hero, contact, gallery, insights, closing, vcard } = businessCardConfig;
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [focusedSlideIndex, setFocusedSlideIndex] = useState(0);
  const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const openExternal = useCallback((url: string, message: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setFeedback(message);
  }, []);

  const handleDownloadVCard = useCallback(() => {
    const vcardContent = createVCardPayload();
    const blob = new Blob([vcardContent], { type: "text/vcard" });
    const link = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = vcard.downloadName;
    anchor.click();
    URL.revokeObjectURL(link);
    setFeedback(contact.feedback.download);
  }, [contact.feedback.download, vcard.downloadName]);

  const handleShare = useCallback(async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: contact.shareMetadata.title,
      text: contact.shareMetadata.text,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback(contact.feedback.shareSuccess);
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
        setFeedback(contact.feedback.shareClipboard);
      } else {
        window.prompt("Copia este enlace", shareUrl);
        setFeedback(contact.feedback.sharePrompt);
      }
    } catch {
      setFeedback(contact.feedback.shareError);
    }
  }, [
    contact.feedback.shareClipboard,
    contact.feedback.shareError,
    contact.feedback.sharePrompt,
    contact.feedback.shareSuccess,
    contact.shareMetadata.text,
    contact.shareMetadata.title,
  ]);

  const contactActions = useMemo<ContactButtonData[]>(
    () =>
      contact.actions.map((action) => {
        if (action.key === "phone") {
          return {
            ...action,
            onClick: () =>
              openExternal(
                `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`,
                action.feedback,
              ),
          };
        }

        if (action.key === "email") {
          return {
            ...action,
            onClick: () =>
              openExternal(
                composeGmailUrl(contact.email.address, contact.email.subject, contact.email.body),
                action.feedback,
              ),
          };
        }

        return {
          ...action,
          onClick: () => openExternal(contact.websiteUrl, action.feedback),
        };
      }),
    [
      contact.actions,
      contact.email.address,
      contact.email.body,
      contact.email.subject,
      contact.websiteUrl,
      contact.whatsappMessage,
      contact.whatsappNumber,
      openExternal,
    ],
  );

  const handleImageClick = useCallback((index: number) => {
    setFocusedSlideIndex(index);
    setIsGalleryOpen(true);
  }, []);

  const handleProfileImageClick = useCallback(() => {
    setIsProfileImageOpen(true);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${assets.backgroundImage})` }}
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
        <Card className="w-full overflow-hidden bg-white text-black shadow-2xl">
          <div className="flex items-center gap-4 bg-primary/95 px-6 py-4 text-white">
            <img
              src={assets.profileImage.src}
              alt={assets.profileImage.alt}
              className="h-20 w-20 rounded-full border-4 border-white/40 object-cover shadow-lg cursor-zoom-in"
              loading="eager"
              onClick={handleProfileImageClick}
            />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">{hero.badge}</p>
              <p className="text-lg font-semibold">{hero.name}</p>
            </div>
          </div>

          <CardContent className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <section className="space-y-10">
                <Hero data={hero} />
                <ContactActions
                  actions={contactActions}
                  sectionLabel={contact.sectionLabel}
                  quickActions={contact.quickActions}
                  onDownload={handleDownloadVCard}
                  onShare={handleShare}
                />
              </section>

              <aside className="space-y-8">
                <Gallery data={gallery} onImageClick={handleImageClick} />
                <Insights data={insights} logoImage={assets.logoImage} />
              </aside>
            </div>
          </CardContent>

          <div className="bg-black">
            <img
              src={closing.image.src}
              alt={closing.image.alt}
              className="h-56 w-full object-cover sm:h-64"
              loading="lazy"
            />
          </div>
        </Card>
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        initialIndex={focusedSlideIndex}
        data={gallery}
        onClose={() => setIsGalleryOpen(false)}
      />

      {isProfileImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsProfileImageOpen(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsProfileImageOpen(false)}
              className="absolute -top-10 right-0 z-20 rounded-full border border-white/40 bg-black/60 p-2 text-white transition hover:bg-white/10"
              aria-label="Cerrar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={assets.profileImage.src}
              alt={assets.profileImage.alt}
              className="h-auto max-h-[80vh] w-full rounded-lg object-contain"
              loading="eager"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualBusinessCard;