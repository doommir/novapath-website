import { ArrowUpRight } from "lucide-react";
import {
  EducationFooter,
  EducationHeader,
} from "@/components/EducationChrome";
import "@/education.css";

type ProductPreviewUnavailableProps = {
  productName: string;
  area: string;
  testId: string;
};

export default function ProductPreviewUnavailable({
  productName,
  area,
  testId,
}: ProductPreviewUnavailableProps) {
  return (
    <div className="edu-site" data-testid={testId}>
      <a className="edu-skip" href="#main">
        Skip to content
      </a>
      <EducationHeader />
      <main id="main" tabIndex={-1}>
        <section className="edu-preview" aria-labelledby="preview-heading">
          <div className="edu-container">
            <div className="edu-preview-panel">
              <p className="edu-eyebrow">{area}</p>
              <p className="edu-preview-product">{productName}</p>
              <h1 id="preview-heading">Public preview unavailable</h1>
              <p>
                A live {productName} environment is not open to public
                visitors. It requires a signed-in school account, so embedding
                it here would only show a login screen — with no way back to
                this site.
              </p>
              <p>
                If you would like to see how {productName} could support your
                school, send an inquiry. We can walk through the workflow with
                you.
              </p>
              <div className="edu-preview-actions">
                <a className="edu-button" href="/#contact">
                  Inquire about {productName} <ArrowUpRight size={18} />
                </a>
                <a className="edu-text-link" href="/">
                  Back to NovaPath
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EducationFooter />
    </div>
  );
}
