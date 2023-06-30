import React, { useState } from 'react';
import pdfjs from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/{installed_npm_version}/pdf.worker.js`

const PreviewPDF = () => {
    const pdfjs = window.pdfjsLib;
    const [selectedFile, setSelectedFile] = useState(null);
    const [pages, setPages] = useState([]);

    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        console.log(event)

        setSelectedFile(event.target.files[0]);
    };

    const convertToImages = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const arrayBuffer = reader.result;
                console.log(arrayBuffer)
                const pdf = await pdfjs.getDocument(arrayBuffer).promise;
                const totalPages = pdf.numPages;
                const imagePromises = [];

                for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                    const page = await pdf.getPage(pageNumber);
                    const viewport = page.getViewport({ scale: 1.0 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    const renderTask = page.render(renderContext);
                    const imagePromise = new Promise((resolve, reject) => {
                        renderTask.promise.then(() => {
                            resolve(canvas.toDataURL('image/png'));
                        }, reject);
                    });
                    imagePromises.push(imagePromise);
                }

                Promise.all(imagePromises)
                    .then((images) => {
                        setPages(images);
                    })
                    .catch((error) => {
                        console.error('Error converting PDF to images:', error);
                    });
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={convertToImages}>Convert to Images</button>
            {pages.length > 0 &&
                pages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Page ${index + 1}`} />
                    </div>
                ))}
        </div>
    );
};

export default PreviewPDF;