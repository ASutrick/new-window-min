import { PdfViewer } from './pdf-viewer';
export const PdfViewerBox = (props) => {
  const { base64 } = props;
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <PdfViewer base64={base64} />
    </div>
  );
};
