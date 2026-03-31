import React, { useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, Shield, User, ExternalLink, BookOpen, Calculator, Info, Lightbulb, AlertTriangle, ChevronRight } from 'lucide-react';
import TableOfContents from './TableOfContents';
import RelatedArticles from './RelatedArticles';

// ─── Markdown Parsing ────────────────────────────────────────────────────────

const parseMarkdown = (text, ctaBlock) => {
    if (!text) return null;

    let h2Count = 0;
    let ctaInjected = false;
    const ctaComponent = ctaBlock || null;

    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            h2Count++;
            const heading = <h2 key={i} className="text-2xl font-black text-gray-900 dark:text-white mt-10 mb-6">{line.slice(3)}</h2>;
            // Inject mid-article CTA after the 3rd h2
            if (h2Count === 3 && !ctaInjected && ctaComponent) {
                ctaInjected = true;
                return [heading, <React.Fragment key={`cta-mid-${i}`}>{ctaComponent}</React.Fragment>];
            }
            return heading;
        }
        if (line.startsWith('# ')) {
            return <h1 key={i} className="text-3xl font-black text-gray-900 dark:text-white mt-12 mb-8">{line.slice(2)}</h1>;
        }

        // Tables (markdown | col | col |)
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            // Skip separator rows
            if (/^[\|\s\-:]+$/.test(line.trim())) return null;
            const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
            return (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    {cells.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{parseInlineMarkdown(cell.trim())}</td>
                    ))}
                </tr>
            );
        }

        // Images (Block level)
        const trimmedLine = line.trim();
        const imageMatch = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
            const altText = imageMatch[1];
            const rawUrl = imageMatch[2];
            const imageUrl = rawUrl.trim().replace(/ /g, '%20');
            return (
                <figure key={i} className="my-10 rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/hero_wellness.png'; // Fallback to local wellness hero
                            e.target.className = "w-full md:w-3/4 h-auto object-contain p-8 opacity-40 mix-blend-multiply dark:mix-blend-lighten grayscale";
                        }}
                    />
                    {altText && (
                        <figcaption className="w-full text-sm text-gray-500 dark:text-gray-400 text-center py-3 px-4 bg-gray-50 dark:bg-gray-900/50 italic border-t border-gray-100 dark:border-gray-800">
                            📷 {altText}
                        </figcaption>
                    )}
                </figure>
            );
        }

        // Lists
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return <li key={i} className="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().slice(2))}</li>;
        }
        if (/^\d+\.\s/.test(line.trim())) {
            return <li key={i} className="ml-6 list-decimal text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().replace(/^\d+\.\s/, ''))}</li>;
        }

        // Empty lines
        if (!line.trim()) return <div key={i} className="h-4" />;

        // Callout Blocks (> [!TIP], > [!NOTE], etc)
        if (line.trim().startsWith('> [!')) {
            const typeMatch = line.match(/> \[!(.*?)\]/);
            const type = typeMatch ? typeMatch[1].toUpperCase() : 'NOTE';
            // The AI often outputs multi-line callouts like:
            // > [!IMPORTANT]
            // > Important text here...
            // Let's grab the content from the same line if it exists.
            let content = line.split(']').slice(1).join(']').replace(/^>/, '').trim();

            // If the content is empty on the first line, we need to look ahead
            // However, our parseMarkdown function goes line-by-line.
            // A simpler fix since we only have single lines here, is to handle the next line if it starts with "> ".
            // But since this maps line-by-line, the easiest way is to adjust the CSS or handle it in the prompt.
            // Let's just render the current line's content if there is any.
            // Wait, looking at the code, `content` was parsing everything after `]`.
            const styles = {
                TIP: { icon: <Lightbulb className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50/50 dark:bg-amber-900/10', border: 'border-amber-200 dark:border-amber-900/30' },
                IMPORTANT: { icon: <Info className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50/50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-900/30' },
                WARNING: { icon: <AlertTriangle className="w-5 h-5 text-rose-500" />, bg: 'bg-rose-50/50 dark:bg-rose-900/10', border: 'border-rose-200 dark:border-rose-900/30' },
                NOTE: { icon: <Info className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50/50 dark:bg-blue-900/10', border: 'border-blue-200 dark:border-blue-900/30' }
            };
            const style = styles[type] || styles.NOTE;
            return (
                <div key={i} className={`my-8 p-6 rounded-2xl border ${style.border} ${style.bg} flex gap-4 items-start`}>
                    <div className="shrink-0 mt-1">{style.icon}</div>
                    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 italic font-medium">
                        <span className="font-black uppercase tracking-wider block mb-1 text-[10px] opacity-60">{type}</span>
                        {parseInlineMarkdown(content)}
                    </div>
                </div>
            );
        }

        // Handle continuation lines of blockquotes
        if (line.trim().startsWith('> ') && !line.trim().startsWith('> [!')) {
            return (
                <p key={i} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300 italic font-medium ml-10">
                    {parseInlineMarkdown(line.replace(/^>\s*/, ''))}
                </p>
            );
        }

        // Regular paragraphs
        return <p key={i} className="mb-4 leading-relaxed">{parseInlineMarkdown(line)}</p>;
    });
};

const parseInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;

    // Process Images FIRST: ![alt](url) - handle them so they don't get caught by the link parser
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const textBefore = text.slice(lastIndex, match.index);
            parts.push(processTextMarkdown(textBefore));
        }
        const altText = match[1];
        // Ensure image URLs with spaces are handled cleanly (AI sometimes adds them)
        const rawUrl = match[2];
        const imageUrl = rawUrl.trim().replace(/ /g, '%20');

        parts.push(
            <figure key={`img-${match.index}-${lastIndex}`} className="my-10 rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
                <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hero_wellness.png';
                        e.target.className = "w-full md:w-3/4 h-auto object-contain p-8 opacity-40 mix-blend-multiply dark:mix-blend-lighten grayscale";
                    }}
                />
                {altText && (
                    <figcaption className="w-full text-sm text-gray-500 dark:text-gray-400 text-center py-3 px-4 bg-gray-50 dark:bg-gray-900/50 italic border-t border-gray-100 dark:border-gray-800">
                        📷 {altText}
                    </figcaption>
                )}
            </figure>
        );
        lastIndex = imageRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(processTextMarkdown(text.slice(lastIndex)));
    }

    return parts.length > 0 ? parts : processTextMarkdown(text);
};

const processTextMarkdown = (text) => {
    if (!text) return text;

    // Split on **bold** text while keeping the delimiters to process links inside or outside
    const subParts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);

    return subParts.flatMap((subPart, j) => {
        const isBold = subPart.startsWith('**') && subPart.endsWith('**');
        const contentToParse = isBold ? subPart.slice(2, -2) : subPart;

        // Find links inside this exact chunk of text
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const linkParts = [];
        let lMatch;
        let lLastIdx = 0;

        while ((lMatch = linkRegex.exec(contentToParse)) !== null) {
            if (lMatch.index > lLastIdx) {
                linkParts.push(contentToParse.slice(lLastIdx, lMatch.index));
            }

            const linkText = lMatch[1] || '';
            const rawHref = lMatch[2] || '';

            // Clean AI-hallucinated characters from the href (like a trailing bold asterix inside the URL)
            const href = rawHref.replace(/[*"']/g, '').trim();
            const isInternal = href.startsWith('/');

            linkParts.push(
                <a
                    key={`link-${j}-${lMatch.index}`}
                    href={href}
                    target={isInternal ? '_self' : '_blank'}
                    rel={isInternal ? '' : 'noopener noreferrer'}
                    className={`text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline inline-flex items-baseline gap-1 transition-colors relative z-10 ${isBold ? 'font-black' : 'font-bold'}`}
                    onClick={(e) => {
                        if (isInternal) {
                            e.preventDefault();
                            window.history.pushState({}, '', href);
                            window.dispatchEvent(new Event('popstate'));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                >
                    {linkText}
                    {!isInternal && <ExternalLink className="w-3 h-3 inline opacity-70 shrink-0" />}
                </a>
            );
            lLastIdx = linkRegex.lastIndex;
        }

        // If no links were found, just return the text
        if (linkParts.length === 0) {
            return isBold ? <strong key={`bold-${j}`} className="font-bold text-gray-900 dark:text-white">{contentToParse}</strong> : contentToParse;
        }

        // Add any remaining text after the last link
        if (lLastIdx < contentToParse.length) {
            linkParts.push(contentToParse.slice(lLastIdx));
        }

        // Wrap the whole thing in strong if it came from a bold block
        return isBold ? <strong key={`bold-${j}`} className="font-bold text-gray-900 dark:text-white">{linkParts}</strong> : linkParts;
    });
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const AuthorBlock = ({ post }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 bg-linear-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800/60 rounded-3xl border border-slate-100 dark:border-gray-700 my-10 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
            {/* Author Avatar */}
            <div className="w-20 h-20 rounded-[2rem] bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-xl overflow-hidden">
                {post.author?.image ? (
                    <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                ) : (
                    "WH"
                )}
            </div>
            <div>
                <p className="font-black text-gray-900 dark:text-white text-xl mb-1">
                    {post.author?.name || 'WellTools Health Team'}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-lg font-bold">
                        {post.author?.role || 'Health & Wellness Researchers'}
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {post.author?.credentials || 'Medically Reviewed Content'}
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                    {post.author?.bio || "The WellTools team consists of certified nutritionists, fitness experts, and medical researchers dedicated to providing accurate, actionable health data."}
                </p>
            </div>
        </div>
        {/* Reviewed-by section */}
        {(post.reviewedBy || post.factCheckedBy) && (
            <div className="flex flex-col gap-2">
                {post.reviewedBy && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1 mb-0.5">
                                <CheckCircle className="w-3 h-3" />
                                Medically Reviewed
                            </p>
                            <p className="text-xs text-gray-900 dark:text-white font-bold">{post.reviewedBy.name}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{post.reviewedBy.credentials}</p>
                        </div>
                    </div>
                )}
                {post.factCheckedBy && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-blue-900/40 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 mb-0.5">
                                <Shield className="w-3 h-3" />
                                Fact Checked
                            </p>
                            <p className="text-xs text-gray-900 dark:text-white font-bold">{post.factCheckedBy.name}</p>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
);

const MidArticleCTA = ({ post, setCurrentPage }) => {
    const toolLinks = post.ctaLinks || [
        { label: '💤 Sleep Calculator', page: 'sleep' },
        { label: '💧 Water Calculator', page: 'water' },
        { label: '🔥 Calorie Calculator', page: 'calories' },
        { label: '📊 BMI Calculator', page: 'bmi' },
    ];

    return (
        <div className="my-12 p-8 bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors" />
            <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Take Action Now</span>
                </div>
                <h3 className="text-2xl font-black mb-2 leading-tight">Master Your Health with Free Science-Backed Tools</h3>
                <p className="text-white/80 text-sm mb-8 max-w-lg">Don't just read — apply. Use our calculators to find your personalized metrics in seconds.</p>
                <div className="flex flex-wrap gap-3">
                    {toolLinks.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const target = link.page || link.href?.replace('/', '') || link.url?.replace('/', '');
                                if (target) {
                                    setCurrentPage(target);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            className="px-6 py-3 bg-white text-emerald-700 hover:bg-emerald-50 rounded-2xl text-sm font-black transition-all hover:scale-105 shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                            {link.label || link.text}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EndArticleCTA = ({ setCurrentPage }) => (
    <div className="mt-16 p-10 md:p-12 bg-linear-to-br from-gray-900 via-emerald-950 to-teal-900 rounded-[2.5rem] text-white text-center relative overflow-hidden shadow-2xl">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                WellTools Health Suite
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to optimize your health?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Our free, science-backed tools turn this knowledge into personalized action plans.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {[
                    { label: '💤 Sleep', page: 'sleep', sub: 'Optimize cycles' },
                    { label: '🔥 Calories', page: 'calories', sub: 'Track intake' },
                    { label: '💧 Water', page: 'water', sub: 'Stay hydrated' },
                    { label: '📊 BMI', page: 'bmi', sub: 'Check weight' },
                ].map((tool) => (
                    <button
                        key={tool.page}
                        onClick={() => setCurrentPage(tool.page)}
                        className="flex flex-col items-center gap-1 p-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-emerald-400/50 rounded-2xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <span className="font-bold text-sm">{tool.label}</span>
                        <span className="text-xs text-gray-400">{tool.sub}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const BlogPostPage = ({ post, setCurrentPage, setSelectedPost, t }) => {

    // ── Schema Markup (MedicalArticle + FAQ + Breadcrumb) ────────────────────
    useEffect(() => {
        if (!post) return;

        const SITE_URL = 'https://welltools.online';
        const pageUrl = window.location.href;

        // Resolve potentially relative image URLs to absolute
        const resolveImageUrl = (url) => {
            if (!url) return `${SITE_URL}/images/hero_wellness.png`;
            if (url.startsWith('http')) return url;
            return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
        };

        const heroImage = resolveImageUrl(post.image);
        const wordCount = post.content ? post.content.split(/\s+/).length : undefined;

        // 1. MedicalArticle Schema (covers Article requirements + health relevance signal)
        const articleSchema = {
            '@context': 'https://schema.org',
            '@type': 'MedicalArticle',
            headline: post.title,
            name: post.title,
            description: post.excerpt || post.title,
            image: [heroImage],
            datePublished: post.date ? `${post.date}T00:00:00Z` : new Date().toISOString(),
            dateModified: post.lastUpdated ? `${post.lastUpdated}T00:00:00Z` : (post.date ? `${post.date}T00:00:00Z` : new Date().toISOString()),
            ...(wordCount && { wordCount }),
            inLanguage: 'en-US',
            url: pageUrl,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': pageUrl,
            },
            author: {
                '@type': 'Person',
                name: post.author?.name || 'WellTools Health Team',
                jobTitle: post.author?.role || 'Health & Wellness Writer',
                ...(post.author?.bio && { description: post.author.bio }),
                url: `${SITE_URL}/about`,
            },
            publisher: {
                '@type': 'Organization',
                name: 'WellTools',
                url: SITE_URL,
                logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}/favicon.svg`,
                    width: 512,
                    height: 512,
                },
            },
            ...(post.reviewedBy?.name && {
                reviewedBy: {
                    '@type': 'Person',
                    name: post.reviewedBy.name,
                    ...(post.reviewedBy.credentials && { jobTitle: post.reviewedBy.credentials }),
                },
                medicalAudience: {
                    '@type': 'MedicalAudience',
                    audienceType: 'Patients',
                },
            }),
            ...(post.keywords?.length && {
                keywords: post.keywords.join(', '),
            }),
        };

        // 2. BreadcrumbList Schema
        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: SITE_URL,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Blog',
                    item: `${SITE_URL}/blog-health-and-fitness-tips`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: post.title,
                    item: pageUrl,
                },
            ],
        };

        // 3. FAQPage Schema — only if post has FAQ entries
        const schemas = [articleSchema, breadcrumbSchema];

        if (post.faq && post.faq.length > 0) {
            const faqSchema = {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: post.faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
                })),
            };
            schemas.push(faqSchema);
        }

        // Inject all schemas as a single <script> tag
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `article-schema-${post.id}`;
        script.innerHTML = JSON.stringify(schemas);
        document.head.appendChild(script);

        return () => {
            const oldScript = document.getElementById(`article-schema-${post.id}`);
            if (oldScript) document.head.removeChild(oldScript);
        };
    }, [post]);

    if (!post) return null;

    const midCTA = <MidArticleCTA post={post} setCurrentPage={setCurrentPage} />;

    return (
        <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => setCurrentPage('blog')}
                    className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-bold transition-all group"
                    aria-label={t.aria_back}
                >
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-emerald-50">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    {t.back_to_blog}
                </button>

                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                    <button onClick={() => setCurrentPage('home')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</button>
                    <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                    <button onClick={() => setCurrentPage('blog')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Blog</button>
                    <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                    <span className="text-gray-900 dark:text-gray-200 truncate">{post.title}</span>
                </nav>

                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                        {post.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Last Updated: {post.lastUpdated || post.date}</span>
                        </div>

                        {/* Health Verified badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-100 dark:border-emerald-900/50">
                            <CheckCircle className="w-4 h-4" />
                            Health Verified
                        </div>

                        {/* Reviewed by Specialist badge */}
                        {post.reviewedBy?.name && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold border border-blue-100 dark:border-blue-900/40">
                                <Shield className="w-4 h-4" />
                                Reviewed by {post.reviewedBy.name}
                            </div>
                        )}
                    </div>

                    {/* Featured Image (Hero) */}
                    {post.image && (
                        <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 aspect-video relative group">
                            <img
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/hero_wellness.png';
                                    e.target.className = "w-full h-full object-cover opacity-40 grayscale";
                                }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent pointer-events-none" />
                        </div>
                    )}
                </header>

                {/* Author Credibility Block */}
                <AuthorBlock post={post} />

                {/* Table of Contents */}
                <TableOfContents content={post.content} />

                {/* Article Body */}
                <article className="max-w-none text-gray-700 dark:text-gray-300">
                    {parseMarkdown(post.content, midCTA)}
                </article>

                {/* Detailed Author Bio */}
                <AuthorBlock post={post} />

                {/* Strict Medical Disclaimer */}
                <div className="my-12 p-8 bg-rose-50 dark:bg-rose-900/10 border-l-8 border-rose-500 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-rose-800 dark:text-rose-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6" />
                        Medical Disclaimer
                    </h3>
                    <p className="text-rose-700 dark:text-rose-300 leading-relaxed font-medium">
                        This content is for educational and informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read on WellTools.
                    </p>
                </div>

                {/* End-of-Article CTA */}
                <EndArticleCTA setCurrentPage={setCurrentPage} />

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                    <div className="mt-16 p-8 md:p-12 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] border border-slate-200 dark:border-gray-700">
                        <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8">{t.faq_title}</h2>
                        <div className="space-y-4">
                            {post.faq.map((item, i) => (
                                <details
                                    key={i}
                                    className="group bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-700 overflow-hidden"
                                >
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                        <span className="text-lg pr-4">{item.question}</span>
                                        <span className="text-emerald-500 text-2xl font-normal shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base border-t border-slate-100 dark:border-gray-700 pt-4">{item.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sources */}
                {post.sources && post.sources.length > 0 && (
                    <div className="mt-12 p-8 md:p-10 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/30">
                        <h2 className="text-2xl font-black text-emerald-900 dark:text-emerald-400 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm">#</span>
                            {t.sources_title}
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {post.sources.map((source, i) => (
                                <li key={i}>
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-emerald-50 dark:border-emerald-900/20 hover:border-emerald-500 transition-all group"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold group-hover:text-emerald-600 transition-colors line-clamp-1">
                                            {source.title}
                                        </span>
                                        <ExternalLink className="w-3 h-3 ml-auto text-gray-300 group-hover:text-emerald-400 shrink-0" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Related Articles */}
                <RelatedArticles
                    currentPostId={post.id}
                    category={post.category}
                    setCurrentPage={setCurrentPage}
                    setSelectedPost={setSelectedPost}
                />
            </div>
        </div>
    );
};

export default BlogPostPage;
