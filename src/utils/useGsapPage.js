import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapPage(containerRef) {
  useEffect(() => {
    if (!containerRef || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Headline reveal animation
      gsap.fromTo(
        'h1, h2, .section-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06 }
      );

      // 2. Staggered Card Entrance
      gsap.fromTo(
        '.card, .hero-card, .btn-lg',
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'transform'
        }
      );

      // 3. Spring animation for badges and chips
      gsap.fromTo(
        '.badge, .chip',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)', stagger: 0.04, delay: 0.15 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
