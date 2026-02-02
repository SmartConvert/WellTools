import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId, filename = 'WellTools-Report.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`[PDF Export] Element with id "${elementId}" not found.`);
        return;
    }

    try {
        console.log(`[PDF Export] Starting capture for #${elementId}...`);

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            throw new Error('Canvas generation failed');
        }

        const imgData = canvas.toDataURL('image/png');

        if (!imgData || imgData === 'data:,') {
            throw new Error('Failed to generate image data from canvas');
        }

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(filename);
        console.log(`[PDF Export] Successfully exported ${filename}`);
    } catch (error) {
        console.error('[PDF Export] Critical error:', error);
    }
};
