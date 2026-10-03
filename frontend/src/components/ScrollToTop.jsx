import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop component ensures that every navigation — whether from header,
 * footer, within pages, or clicking on a link to the same page — scrolls up
 * smoothly to the top of the viewport. It also provides a sleek floating
 * scroll-to-top button when scrolled down.
 */
const ScrollToTop = () => {
    const { pathname, search } = useLocation();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Reset scroll immediately to top whenever the route or search query changes
    useEffect(() => {
        // If there is a specific hash (e.g. #courses-catalog), let browser / hash handler target it
        if (!window.location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        } else {
            const hashElement = document.querySelector(window.location.hash);
            if (hashElement) {
                hashElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname, search]);

    // Track scroll position to show/hide floating scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 280) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Global click interceptor:
    // If clicking a link to the CURRENT page (e.g. user is on About Us and clicks About Us),
    // scroll up smoothly so they don't have to manually scroll.
    useEffect(() => {
        const handleLinkClick = (event) => {
            const anchor = event.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            // Skip external protocols and new tab links
            if (
                href.startsWith('tel:') ||
                href.startsWith('mailto:') ||
                href.startsWith('javascript:') ||
                anchor.target === '_blank'
            ) {
                return;
            }

            // Skip pure in-page section anchors like href="#courses-catalog"
            if (href.startsWith('#') && href !== '#' && href !== '#/') {
                return;
            }

            // Check if link targets the same page
            try {
                const destUrl = new URL(anchor.href, window.location.origin);
                const isSamePage = destUrl.pathname.toLowerCase() === window.location.pathname.toLowerCase() &&
                                   destUrl.search === window.location.search;

                if (isSamePage) {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            } catch {
                // Ignore URL parse errors
            }
        };

        // Use capture phase
        document.addEventListener('click', handleLinkClick, true);
        return () => document.removeEventListener('click', handleLinkClick, true);
    }, []);

    const scrollToTopSmooth = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTopSmooth}
            aria-label="Scroll to top"
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#0055ff] hover:bg-[#0040cc] text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform ${
                showScrollTop
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
            }`}
        >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
    );
};

export default ScrollToTop;
