import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="py-8 border-t bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors"
            data-testid="link-home"
          >
            Home
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/professional-development" 
            className="hover:text-foreground transition-colors"
            data-testid="link-pd"
          >
            Professional Development
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/science-kit" 
            className="hover:text-foreground transition-colors"
            data-testid="link-science-kit"
          >
            Science Kit
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/autograder" 
            className="hover:text-foreground transition-colors"
            data-testid="link-autograder"
          >
            Auto-Grader
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/math-moves" 
            className="hover:text-foreground transition-colors"
            data-testid="link-math-moves"
          >
            Math Moves
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/blog" 
            className="hover:text-foreground transition-colors"
            data-testid="link-blog"
          >
            Blog
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <Link 
            href="/about" 
            className="hover:text-foreground transition-colors"
            data-testid="link-about"
          >
            About Us
          </Link>
          <span className="hidden md:inline text-border">•</span>
          <a 
            href="mailto:hello@novapath.ai" 
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
