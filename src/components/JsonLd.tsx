export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Kodingin",
        url: "https://kodingin.com",
        logo: "https://kodingin.com/kodingin-logo.svg",
        description: "Professional website development and SaaS solutions provider.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. Nakula No. 48",
            addressLocality: "Semarang",
            postalCode: "50131",
            addressCountry: "ID",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-823-1311-2227",
            contactType: "customer service",
            availableLanguage: ["English", "Indonesian"],
        },
        sameAs: [
            "https://wa.me/6282313112227",
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Kodingin",
        url: "https://kodingin.com",
        description: "Transform your ideas into stunning, high-performance websites and SaaS applications.",
        publisher: {
            "@type": "Organization",
            name: "Kodingin",
        },
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Development",
        provider: {
            "@type": "Organization",
            name: "Kodingin",
        },
        areaServed: {
            "@type": "Country",
            name: "Indonesia",
        },
        description: "Professional website development, SaaS applications, automation, and SEO services.",
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    );
}
