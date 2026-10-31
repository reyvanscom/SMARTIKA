/**
 * Universal Print & PDF Helper
 * Works 100% reliably in standard browsers, standalone tabs, and restricted iframes (like AI Studio preview).
 */

interface PrintOptions {
  title: string;
  contentHtml: string;
  landscape?: boolean;
  paperSize?: 'F4' | 'A4';
}

export function printHtmlDocument({
  title,
  contentHtml,
  landscape = false,
  paperSize = 'A4'
}: PrintOptions): Promise<boolean> {
  return new Promise((resolve) => {
    // 1. Try hidden iframe printing first (bypasses parent iframe restrictions and prints only the document)
    try {
      // Remove any existing print iframe
      const oldIframe = document.getElementById('spenmakro-print-iframe');
      if (oldIframe) {
        oldIframe.remove();
      }

      const iframe = document.createElement('iframe');
      iframe.id = 'spenmakro-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (!doc) {
        throw new Error('Iframe document not accessible');
      }

      // Collect parent styles so Tailwind classes and font styles work inside the iframe
      const parentStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map((node) => node.outerHTML)
        .join('\n');

      const pageSizeCss =
        paperSize === 'F4'
          ? landscape
            ? '330mm 215mm'
            : '215mm 330mm'
          : landscape
          ? 'A4 landscape'
          : 'A4 portrait';

      const pageMarginCss =
        paperSize === 'F4'
          ? landscape
            ? '8mm 10mm'
            : '8mm 10mm 8mm 10mm'
          : landscape
          ? '8mm 10mm'
          : '8mm 10mm 8mm 10mm';

      const fullPageHeightCss = paperSize === 'F4' ? '312mm' : '279mm';

      const fullHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  ${parentStyles}
  <style>
    @page {
      size: ${pageSizeCss};
      margin: ${pageMarginCss};
    }
    html, body {
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 10.5pt;
      line-height: 1.4;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .lkpd-full-page {
      width: 100%;
      min-height: ${fullPageHeightCss};
      height: ${fullPageHeightCss};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .lkpd-body-fill {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .lkpd-table-fill {
      width: 100%;
      flex: 1 1 auto;
      height: 100%;
      border-collapse: collapse;
    }
    .page-break {
      page-break-before: always !important;
      break-before: page !important;
    }
    .avoid-break {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: bold; }
    .uppercase { text-transform: uppercase; }
    .kop-surat {
      border-bottom: 3px double #0f172a;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .kop-logo {
      width: 70px;
      height: 70px;
      object-fit: contain;
    }
    .kop-text {
      flex: 1;
      text-align: center;
      line-height: 1.25;
    }
    .kop-text h4 {
      margin: 0;
      font-size: 11pt;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .kop-text h2 {
      margin: 2px 0;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .kop-text p {
      margin: 2px 0 0;
      font-size: 9pt;
      color: #334155;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9pt;
      font-weight: bold;
    }
    .badge-success { background: #dcfce7; color: #166534; }
    .badge-primary { background: #e0f2fe; color: #075985; }
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 40px;
      text-align: center;
      page-break-inside: avoid;
    }
    .signature-space {
      height: 65px;
    }
    #certificate-print-area {
      box-shadow: none !important;
      border: 8px double #d97706 !important;
      border-radius: 16px !important;
      padding: 28px 36px !important;
      background: #ffffff !important;
      color: #0f172a !important;
      margin: 0 auto !important;
      page-break-inside: avoid !important;
      width: 100% !important;
      max-width: 980px !important;
    }
  </style>
</head>
<body>
  ${contentHtml}
</body>
</html>
      `;

      doc.open();
      doc.write(fullHtml);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          resolve(true);
        } catch (e) {
          console.warn('Iframe print error, falling back to window.print():', e);
          window.print();
          resolve(true);
        }
      }, 500);
    } catch (err) {
      console.warn('Print iframe creation failed, falling back to window.print():', err);
      window.print();
      resolve(true);
    }
  });
}
