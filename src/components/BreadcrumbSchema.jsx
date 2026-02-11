import React, { useEffect } from 'react';

const BreadcrumbSchema = ({ items }) => {
    useEffect(() => {
        if (!items || items.length === 0) return;

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'breadcrumb-schema';
        script.innerHTML = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);

        return () => {
            const oldScript = document.getElementById('breadcrumb-schema');
            if (oldScript) document.head.removeChild(oldScript);
        };
    }, [items]);

    return null;
};

export default BreadcrumbSchema;
