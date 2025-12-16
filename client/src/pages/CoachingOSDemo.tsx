import Footer from "@/components/Footer";

export default function CoachingOSDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 w-full">
        <iframe
          src="https://school-os.replit.app/"
          className="w-full h-screen border-0"
          title="Coaching OS Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="iframe-coaching-os-demo"
        />
      </div>
      <Footer />
    </div>
  );
}
