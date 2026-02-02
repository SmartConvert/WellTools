import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId, filename = 'WellTools-Report.pdf') => {
    console.log(`[PDF Export] exportToPDF called for #${elementId}`);
    const element = document.getElementById(elementId);
    if (!element) {
        const errorMsg = `Error: Element #${elementId} not found on the page.`;
        console.error(`[PDF Export] ${errorMsg}`);
        alert(errorMsg);
        return;
    }

    try {
        // Alert the user that we are starting
        // alert("Starting PDF Export... Please wait a few seconds.");
        console.log(`[PDF Export] Starting capture for #${elementId}...`);

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: true, // Enable logging for debugging
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            throw new Error('Canvas generation failed (width/height is 0)');
        }

        console.log(`[PDF Export] Canvas generated: ${canvas.width}x${canvas.height}`);

        const imgData = canvas.toDataURL('image/png');

        if (!imgData || imgData === 'data:,') {
            throw new Error('Failed to generate image data from canvas (result was empty)');
        }

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create PDF
        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        console.log(`[PDF Export] Saving PDF as ${filename}...`);
        pdf.save(filename);

        // alert("PDF Downloaded successfully!");
        console.log(`[PDF Export] Successfully exported ${filename}`);
    } catch (error) {
        const errorMsg = `PDF Export Failed: ${error.message}`;
        console.error('[PDF Export] Critical error:', error);
        alert(errorMsg);
    }
};
