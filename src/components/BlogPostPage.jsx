import React from 'react';
import { ArrowLeft, Clock, CheckCircle, Shield, User, ExternalLink, BookOpen, Calculator, Info, Lightbulb, AlertTriangle, ChevronRight } from 'lucide-react';
import TableOfContents from './TableOfContents';
import RelatedArticles from './RelatedArticles';
import CommentSection from './CommentSection';

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
        const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
            const altText = imageMatch[1];
            const imageUrl = imageMatch[2];
            return (
                <figure key={i} className="my-10 rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                    {altText && (
                        <figcaption className="text-sm text-gray-500 dark:text-gray-400 text-center py-3 px-4 bg-gray-50 dark:bg-gray-800 italic">
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
            const content = line.split(']').slice(1).join(']').trim();
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

        // Regular paragraphs
        return <p key={i} className="mb-4 leading-relaxed">{parseInlineMarkdown(line)}</p>;
    });
};

const parseInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;

    // Process Images: ![alt](url) - render them properly
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
        const imageUrl = match[2];
        parts.push(
            <figure key={`img-${match.index}`} className="my-10 rounded-2xl overflow-hidden shadow-xl">
                <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
                {altText && (
                    <figcaption className="text-sm text-gray-500 dark:text-gray-400 text-center py-3 px-4 bg-gray-50 dark:bg-gray-800 italic">
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

    const subParts = text.split(/(\*\*.*?\*\*)/g);
    return subParts.flatMap((subPart, j) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
            return [<strong key={`bold-${j}`} className="font-bold text-gray-900 dark:text-white">{subPart.slice(2, -2)}</strong>];
        }

        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const linkParts = [];
        let lMatch;
        let lLastIdx = 0;
        while ((lMatch = linkRegex.exec(subPart)) !== null) {
            if (lMatch.index > lLastIdx) {
                linkParts.push(subPart.slice(lLastIdx, lMatch.index));
            }
            const href = lMatch[2];
            const isInternal = href.startsWith('/');

            linkParts.push(
                <a
                    key={`link-${lMatch.index}`}
                    href={href}
                    target={isInternal ? '_self' : '_blank'}
                    rel={isInternal ? '' : 'noopener noreferrer'}
                    className="text-emerald-600 hover:underline font-medium inline-flex items-center gap-1"
                >
                    {lMatch[1]}
                    {!isInternal && <ExternalLink className="w-3 h-3 inline" />}
                </a>
            );
            lLastIdx = linkRegex.lastIndex;
        }
        if (lLastIdx < subPart.length) {
            linkParts.push(subPart.slice(lLastIdx));
        }

        return linkParts.length > 0 ? linkParts : [subPart];
    });
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const AuthorBlock = ({ post }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-linear-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl border border-slate-100 dark:border-gray-700 mb-10">
        <div className="flex items-center gap-4 flex-1">
            {/* Author Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg">
                WH
            </div>
            <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                    {post.author?.name || 'WellTools Health Team'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {post.author?.role || 'Health & Wellness Researchers'}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
                    ✓ {post.author?.credentials || 'Research-backed content, medically reviewed'}
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

    // ── Schema Markup (Article + FAQ + MedicalWebPage) ──────────────────────
    useEffect(() => {
        if (!post) return;

        // 1. Article Schema
        const articleSchema = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            image: post.image || 'https://welltools.online/images/hero_fitness.png',
            datePublished: post.date || new Date().toISOString(),
            dateModified: post.lastUpdated || post.date || new Date().toISOString(),
            author: {
                '@type': 'Organization',
                name: post.author?.name || 'WellTools Health Team',
                url: 'https://welltools.online/about',
            },
            ...(post.reviewedBy && {
                reviewedBy: {
                    '@type': 'Person',
                    name: post.reviewedBy.name,
                    jobTitle: post.reviewedBy.credentials,
                },
            }),
            publisher: {
                '@type': 'Organization',
                name: 'WellTools',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://welltools.online/favicon.svg',
                },
            },
            description: post.excerpt || post.title,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': window.location.href,
            },
        };

        // 2. Breadcrumb Schema
        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://welltools.online' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://welltools.online/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: window.location.href },
            ],
        };

        // 3. MedicalWebPage Schema — for ALL articles
        const medicalSchema = {
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            name: post.title,
            url: window.location.href,
            description: post.excerpt || post.title,
            specialty: 'https://schema.org/DietNutrition',
            lastReviewed: post.reviewedBy?.reviewDate || post.lastUpdated || post.date,
            ...(post.reviewedBy && {
                reviewedBy: {
                    '@type': 'Person',
                    name: post.reviewedBy.name,
                    jobTitle: post.reviewedBy.credentials,
                },
            }),
            about: {
                '@type': 'MedicalEntity',
                name: post.title,
            },
            audience: {
                '@type': 'Audience',
                audienceType: 'Health-conscious individuals',
            },
            publisher: {
                '@type': 'Organization',
                name: 'WellTools',
                url: 'https://welltools.online',
            },
        };

        const schemas = [articleSchema, breadcrumbSchema, medicalSchema];

        // 4. FAQ Schema — only if post has FAQ
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
            {/* AMP Auto Ads — only for new articles (2026-02-01+) and all future posts */}
            {post.date && post.date >= '2026-02-01' && (
                <amp-auto-ads
                    type="adsense"
                    data-ad-client="ca-pub-4160895122812433">
                </amp-auto-ads>
            )}
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
                </header>

                {/* Author Credibility Block */}
                <AuthorBlock post={post} />

                {/* Table of Contents */}
                <TableOfContents content={post.content} />

                {/* Article Body */}
                <article className="max-w-none text-gray-700 dark:text-gray-300">
                    {parseMarkdown(post.content, midCTA)}
                </article>

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

                <CommentSection postId={post.id} />
            </div>
        </div>
    );
};

export default BlogPostPage;
