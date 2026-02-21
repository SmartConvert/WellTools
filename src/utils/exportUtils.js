import html2canvas from 'html2canvas';

/**
 * Captures a DOM element as an image and triggers a download.
 * Adds a temporary "WellTools.online" watermark during capture.
 * 
 * @param {string} elementId - The ID of the DOM element to capture.
 * @param {string} filename - The desired filename for the downloaded image.
 */
export const exportAsImage = async (elementId, filename = 'welltools-result.png') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        return false;
    }

    try {
        // Create a temporary watermark element
        const watermark = document.createElement('div');
        watermark.innerHTML = 'WellTools.online';
        watermark.id = 'temp-watermark';

        // Style the watermark
        Object.assign(watermark.style, {
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            color: '#10b981', // Emerald 500
            fontFamily: 'sans-serif',
            fontSize: '18px',
            fontWeight: '900',
            opacity: '0.8',
            pointerEvents: 'none',
            zIndex: '9999',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        });

        // Ensure the parent element has relative positioning to anchor the watermark
        const originalPosition = element.style.position;
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }

        // Append watermark before capture
        element.appendChild(watermark);

        // Capture canvas
        const canvas = await html2canvas(element, {
            scale: 2, // High resolution for social sharing
            useCORS: true,
            backgroundColor: null, // Transparent background if rounded corners
            logging: false,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById(elementId);
                if (clonedElement) {
                    clonedElement.style.borderRadius = '24px'; // Ensure crisp corners

                    // html2canvas doesn't support oklch/modern CSS color functions yet.
                    // Tailwind v4 uses oklch heavily for shadows, borders, text, and bg.
                    // We need to recursively strip or replace them in the clone.
                    const replaceOklch = (node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const style = window.getComputedStyle(node);

                            // Check typical properties that might have okl
                            ['color', 'backgroundColor', 'borderColor', 'boxShadow'].forEach(prop => {
                                let val = style[prop];
                                if (val && val.includes('okl')) {
                                    // As a crude fallback for html2canvas to not crash, 
                                    // replace the okl wrapper with a generic gray or let it inherit if we can't parse it.
                                    // A cleaner approach is forcing the cloned node inline styles to rgb equivalents 
                                    // based on original computed style, but CSSOM returns unresolved okl strings sometimes.

                                    // Safe fallback: generic gray/transparent for shadows, or inherit for text
                                    if (prop === 'boxShadow') node.style.boxShadow = 'none';
                                    if (prop === 'backgroundColor') node.style.backgroundColor = '#ffffff'; // force white bg
                                    if (prop === 'borderColor') node.style.borderColor = '#e5e7eb'; // cool-gray-200
                                    if (prop === 'color' && val.includes('okl')) node.style.color = '#1f2937'; // gray-800
                                }
                            });

                            // Check raw inline styles too
                            ['color', 'backgroundColor', 'borderColor', 'boxShadow'].forEach(prop => {
                                let val = node.style[prop];
                                if (val && val.includes('okl')) {
                                    if (prop === 'boxShadow') node.style.boxShadow = 'none';
                                    if (prop === 'backgroundColor') node.style.backgroundColor = '#ffffff';
                                    if (prop === 'borderColor') node.style.borderColor = '#e5e7eb';
                                    if (prop === 'color') node.style.color = '#1f2937';
                                }
                            });
                        }
                        node.childNodes.forEach(replaceOklch);
                    };

                    replaceOklch(clonedElement);
                }
            }
        });

        // Clean up watermark and inline styles
        element.removeChild(watermark);
        element.style.position = originalPosition;

        // Convert canvas to image blob and trigger download
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = filename;
        link.href = image;

        // Firefox requires the link to be in the body
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return true;
    } catch (error) {
        console.error('Error generating image export:', error);

        // Ensure cleanup if it fails
        const wm = document.getElementById('temp-watermark');
        if (wm) element.removeChild(wm);

        return false;
    }
};
