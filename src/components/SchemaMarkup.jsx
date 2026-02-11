import React, { useEffect } from 'react';

const SchemaMarkup = ({ toolId, content }) => {
    useEffect(() => {
        if (!content) return;

        // 1. FAQ Schema
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": content.seo_faqs?.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            })) || []
        };

        // 2. Calculator Schema
        const calculatorSchema = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": content.hero_title || "Health Calculator",
            "url": window.location.href,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "abstract": content.hero_subtitle || "",
            "description": content.seo_what_content || ""
        };

        // 3. MedicalWebPage Schema for health calculators
        const medicalSchema = {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": content.hero_title || "Health Calculator",
            "url": window.location.href,
            "description": content.seo_what_content || content.hero_subtitle || "",
            "mainContentOfPage": {
                "@type": "WebPageElement",
                "cssSelector": ".calculator-container"
            },
            "specialty": "https://schema.org/DietNutrition",
            "about": {
                "@type": "MedicalEntity",
                "name": content.hero_title || "Health Metrics"
            }
        };

        const scriptFaq = document.createElement('script');
        scriptFaq.type = 'application/ld+json';
        scriptFaq.id = `faq-schema-${toolId}`;
        scriptFaq.innerHTML = JSON.stringify(faqSchema);

        const scriptCalc = document.createElement('script');
        scriptCalc.type = 'application/ld+json';
        scriptCalc.id = `calc-schema-${toolId}`;
        scriptCalc.innerHTML = JSON.stringify(calculatorSchema);

        const scriptMedical = document.createElement('script');
        scriptMedical.type = 'application/ld+json';
        scriptMedical.id = `medical-schema-${toolId}`;
        scriptMedical.innerHTML = JSON.stringify(medicalSchema);

        document.head.appendChild(scriptFaq);
        document.head.appendChild(scriptCalc);
        document.head.appendChild(scriptMedical);

        return () => {
            const oldFaq = document.getElementById(`faq-schema-${toolId}`);
            const oldCalc = document.getElementById(`calc-schema-${toolId}`);
            const oldMedical = document.getElementById(`medical-schema-${toolId}`);
            if (oldFaq) document.head.removeChild(oldFaq);
            if (oldCalc) document.head.removeChild(oldCalc);
            if (oldMedical) document.head.removeChild(oldMedical);
        };
    }, [toolId, content]);

    return null;
};

export default SchemaMarkup;
