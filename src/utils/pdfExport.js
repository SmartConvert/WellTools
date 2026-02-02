import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId, filename = 'WellTools-Report.pdf') => {
    const element = document.getElementById(elementId);

    if (!element) {
        const errorMsg = `Error: Element #${elementId} not found on the page.`;
        console.error(`[PDF Export] ${errorMsg}`);
        return;
    }

    try {
        console.log(`[PDF Export] Starting capture for #${elementId} with modern color compatibility mode...`);

        // Fix for Tailwind 4 / modern CSS (oklch/oklab parsing error in html2canvas)
        const canvas = await html2canvas(element, {
            scale: 1.5, // High quality, but memory efficient for mobile
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
                // Force light mode in the PDF even if the user is in dark mode
                const clonedRoot = clonedDoc.documentElement;
                if (clonedRoot.classList.contains('dark')) {
                    clonedRoot.classList.remove('dark');
                }

                const clonedElement = clonedDoc.getElementById(elementId);
                if (!clonedElement) return;

                // Force a white background for the cloned result card
                clonedElement.style.backgroundColor = '#ffffff';

                // Recursively convert all computed styles to inline RGB styles
                // This ensures html2canvas doesn't try to parse oklch/oklab strings
                const allElements = [clonedElement, ...clonedElement.getElementsByTagName("*")];
                const originalElements = [element, ...element.getElementsByTagName("*")];

                allElements.forEach((el, index) => {
                    const originalEl = originalElements[index];
                    if (!originalEl) return;

                    try {
                        const computed = window.getComputedStyle(originalEl);

                        // Assign standard properties that often use modern color functions in Tailwind 4
                        // window.getComputedStyle naturally returns standard rgb()/rgba() values
                        el.style.backgroundColor = computed.backgroundColor;
                        el.style.color = computed.color;
                        el.style.borderColor = computed.borderColor;

                        // Gradients using oklab/oklch are the main crash cause in html2canvas
                        if (computed.backgroundImage && (computed.backgroundImage.includes('oklab') || computed.backgroundImage.includes('oklch'))) {
                            el.style.backgroundImage = 'none'; // Fallback to background color
                        }
                    } catch (e) {
                        // Silently skip if an element style is unreadable
                    }
                });
            }
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            throw new Error('Canvas generation failed');
        }

        const imgData = canvas.toDataURL('image/png');

        if (!imgData || imgData === 'data:,') {
            throw new Error('Failed to generate image data');
        }

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create PDF with orientation based on dimensions
        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'l' : 'p',
            unit: 'px',
            format: [imgWidth, imgHeight]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(filename);
        console.log(`[PDF Export] Successfully exported ${filename}`);
    } catch (error) {
        console.error('[PDF Export] Critical error:', error);
        alert(`حدث خطأ أثناء تصدير PDF: ${error.message}\nيرجى المحاولة مجدداً أو استخدام متصفح ديسكتوب.`);
    }
};
