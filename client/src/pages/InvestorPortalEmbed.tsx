export default function InvestorPortalEmbed() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://investor-portal--NovaPath.replit.app"
        className="w-full h-full border-none"
        title="NovaPath Investor Portal"
        data-testid="iframe-investor-portal"
        allowFullScreen
      />
    </div>
  );
}
