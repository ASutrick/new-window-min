import { useEffect, useRef } from 'react';

export const PdfViewer = (props) => {
  let PSPDFKit;
  const { height = '100%', base64 } = props;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (base64) {
      (async () => {
        PSPDFKit = await import('pspdfkit');
        try {
          console.log('PSPDFKit Container Element: ', container);
          await PSPDFKit.load({
            theme: PSPDFKit.Theme.AUTO,
            container: container,
            document: `data:application/pdf;base64,${base64.image}`,
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
            printOptions: {
              mode: PSPDFKit.PrintMode.EXPORT_PDF,
              quality: PSPDFKit.PrintQuality.HIGH,
            },
            licenseKey: process.env.REACT_APP_PSPDFKIT_KEY,
          });
        } catch (e) {
          console.warn(e);
          return;
        }
      })();
    }
    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [base64]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: height }}
    />
  );
};
