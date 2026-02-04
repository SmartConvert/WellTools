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

        const scriptFaq = document.createElement('script');
        scriptFaq.type = 'application/ld+json';
        scriptFaq.id = `faq-schema-${toolId}`;
        scriptFaq.innerHTML = JSON.stringify(faqSchema);

        const scriptCalc = document.createElement('script');
        scriptCalc.type = 'application/ld+json';
        scriptCalc.id = `calc-schema-${toolId}`;
        scriptCalc.innerHTML = JSON.stringify(calculatorSchema);

        document.head.appendChild(scriptFaq);
        document.head.appendChild(scriptCalc);

        return () => {
            const oldFaq = document.getElementById(`faq-schema-${toolId}`);
            const oldCalc = document.getElementById(`calc-schema-${toolId}`);
            if (oldFaq) document.head.removeChild(oldFaq);
            if (oldCalc) document.head.removeChild(oldCalc);
        };
    }, [toolId, content]);

    return null;
};

export default SchemaMarkup;
