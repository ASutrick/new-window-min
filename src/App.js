import { useState, useEffect } from 'react';
import './App.css';
import NewWindow from './NewWindow';
import { PdfViewerBox } from './pdf-viewer-box';
function App() {
  const [base64, setBase64] = useState({ id: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    fetch('/image.json')
      .then((response) => response.json())
      .then((data) => {
        setBase64(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the JSON:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Image Viewer Min Repro</p>
        <button
          onClick={() => {
            setViewImage((prevState) => !prevState);
          }}>
          Toggle Image
        </button>
      </header>
      {!loading && (
        <NewWindow name='Image Viewer' title='Image Viewer'>
          {viewImage && <PdfViewerBox base64={base64} />}
        </NewWindow>
      )}
    </div>
  );
}

export default App;
