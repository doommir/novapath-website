export default function InvestorPortalEmbed() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        src="https://investor-portal--novapath.replit.app"
        className="w-full h-full border-none blur-md pointer-events-none"
        title="NovaPath Investor Portal"
        data-testid="iframe-investor-portal"
        allowFullScreen
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="text-center p-8">
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            data-testid="text-coming-soon"
          >
            Coming Soon
          </h1>
          <p className="text-xl text-white/80">
            Investor Portal launching shortly
          </p>
        </div>
      </div>
    </div>
  );
}
