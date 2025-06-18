"use client"; // if using App Router

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const PdfThumbnail = ({ fileUrl, downloadName }:any) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-full lg:w-[50%]">
      <div className="shadow-md hover:shadow-lg transition">
        <Document
          file={fileUrl}
          onLoadSuccess={() => setLoaded(true)}
          loading={<div className="w-[400px] h-[550px] bg-gray-100 flex items-center justify-center">Loading preview...</div>}
           onLoadError={(error) => {
          console.error('Error loading PDF (onLoadError):', error.message);
        }}
        onSourceError={(error) => {
          console.error('Error with PDF source (onSourceError):', error.message);
        }}
        >
          <Page pageNumber={1} width={400} />
        </Document>
      </div>

      <div className="mt-2 bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center w-full text-sm">
        ⬇️ {downloadName || 'Download PDF'}
      </div>
    </a>
  );
};

export default PdfThumbnail;