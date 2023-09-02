import generatePdf from '$lib/server/pdf/generateChapterPdf';

export const GET = async ()=>{
    const pdf = await generatePdf();
    // setHeaders({
    //     'Content-Type': 'application/pdf',
    //     'Content-Length': pdf.size.toString(),
    //     'Last-Modified': new Date().toUTCString(),
    //     'Cache-Content': 'public, max-age=600'
    // })
    return new Response(pdf);
}