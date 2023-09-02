import PdfPrinter from 'pdfmake';
import blobStream from 'blob-stream';

const fonts = {
	Inter: {
		normal: 'src/lib/server/pdf/fonts/Inter-Regular.ttf',
		bold: 'src/lib/server/pdf/fonts/Inter-bold.ttf'
	}
};

const printer = new PdfPrinter(fonts);

async function generatePdf() {
	const file = {
		content: ['Hello Yana'],
		defaultStyle: {
			font: 'Inter'
		}
	};

	return new Promise((resolve, reject) => {
		const pdf = printer.createPdfKitDocument(file);
		pdf.pipe(blobStream()).on('finish', function (IBlobStream) {
			console.log('Finished generating PDF');
            resolve(this.toBlob('application/pdf'))
        }).on('error', (err)=>{
            console.error('err', err);
            reject(err);
        })

        pdf.end();
	});
}
export default generatePdf;