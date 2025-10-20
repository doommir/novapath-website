export default function Footer() {
  return (
    <footer className="py-8 border-t bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <a 
            href="#about" 
            className="hover:text-foreground transition-colors"
            data-testid="link-about"
          >
            About
          </a>
          <span className="hidden md:inline text-border">•</span>
          <a 
            href="#privacy" 
            className="hover:text-foreground transition-colors"
            data-testid="link-privacy"
          >
            Privacy
          </a>
          <span className="hidden md:inline text-border">•</span>
          <a 
            href="#contact" 
            className="hover:text-foreground transition-colors"
            data-testid="link-contact"
          >
            Contact
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4" data-testid="text-copyright">
          © {new Date().getFullYear()} NovaPath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
