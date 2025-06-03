document.addEventListener('DOMContentLoaded', () => { 
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Normalize scroll for iOS Safari
    ScrollTrigger.normalizeScroll(true);

    // Toggle Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Logo animation with responsive adjustments
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;

        // Logo animation for all views
        ScrollTrigger.create({
            animation: gsap.from(".logo", {
                y: isDesktop ? "50vh" : isTablet ? "30vh" : "20vh",
                scale: isDesktop ? 6 : isTablet ? 4 : 3,
                yPercent: -50,
            }),
            scrub: true,
            trigger: ".content",
            start: isDesktop ? "top 80%" : "top 90%",
            end: isDesktop ? "+=50%" : "+=30%",
            markers: false,
            invalidateOnRefresh: true
        });

        if (!isDesktop) {
            // Tablet and Mobile: Fade out logo before education section
            ScrollTrigger.create({
                trigger: ".education-section",
                start: "top 20%",
                end: "top 10%",
                scrub: 0.5,
                onEnter: () => gsap.to(".logo", { opacity: 0, duration: 0.5 }),
                onLeaveBack: () => gsap.to(".logo", { opacity: 1, duration: 0.5 }),
                markers: false,
                invalidateOnRefresh: true
            });
        }
    });

    // Line-by-line text reveal animation with responsive trigger points
    const aboutText = document.querySelector(".about-text p");
    if (aboutText) {
        const mySplitText = new SplitText(aboutText, { type: "lines", linesClass: "reveal-line" });
        gsap.set(mySplitText.lines, { overflow: "hidden", y: 30, opacity: 0 });

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            let { isDesktop, isTablet, isMobile } = context.conditions;

            gsap.fromTo(
                mySplitText.lines,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".about-text",
                        start: isDesktop ? "top bottom" : "top 90%",
                        end: isDesktop ? "bottom center" : "bottom 80%",
                        scrub: 0.5,
                        markers: false,
                        invalidateOnRefresh: true,
                        onEnter: () => console.log("Text animation entered"),
                        onLeave: () => console.log("Text animation left"),
                        onRefresh: (self) => {
                            if (ScrollTrigger.isInViewport(aboutText) || self.progress > 0) {
                                gsap.set(mySplitText.lines, { y: 0, opacity: 1 });
                            }
                        }
                    }
                }
            );
        });

        window.addEventListener("resize", () => {
            mySplitText.revert();
            mySplitText.split({ type: "lines", linesClass: "reveal-line" });
            gsap.set(mySplitText.lines, { overflow: "hidden", y: 30, opacity: 0 });
            ScrollTrigger.refresh();
        });
    } else {
        console.error("Error: .about-text p not found");
    }

    // Video animation: Slide with Rotation
    gsap.fromTo(
        ".video-container",
        { x: -200, rotation: -10, opacity: 0 },
        {
            x: 0,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".video-section",
                start: "top 95%",
                end: "top 50%",
                scrub: 0.5,
                markers: false,
                invalidateOnRefresh: true
            }
        }
    );

    // Education Section Animations
    mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;

        if (isDesktop) {
            ScrollTrigger.create({
                trigger: ".education-section",
                start: "top top",
                end: "bottom top",
                pin: ".education-section .section-title",
                pinSpacing: false,
                markers: false,
                invalidateOnRefresh: true
            });
        } else {
            gsap.set(".education-section .section-title", { opacity: 1 });
            ScrollTrigger.create({
                trigger: ".education-section",
                start: "top top",
                end: "bottom top",
                pin: ".education-section .section-title",
                pinSpacing: false,
                markers: false,
                invalidateOnRefresh: true,
                onEnter: () => gsap.to(".logo", { opacity: 0, duration: 0.5 }),
                onLeaveBack: () => gsap.to(".logo", { opacity: 1, duration: 0.5 })
            });

            ScrollTrigger.create({
                trigger: ".achievement-section",
                start: "top 20%",
                end: "top 10%",
                scrub: 0.5,
                onEnter: () => gsap.to(".education-section .section-title", { opacity: 0, duration: 0.5 }),
                onLeaveBack: () => gsap.to(".education-section .section-title", { opacity: 1, duration: 0.5 }),
                markers: false,
                invalidateOnRefresh: true
            });
        }
    });

    // Achievement Section Animations
    mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;

        if (isDesktop) {
            ScrollTrigger.create({
                trigger: ".achievement-section",
                start: "top top",
                end: "bottom top",
                pin: ".achievement-section .section-title",
                pinSpacing: false,
                markers: false,
                invalidateOnRefresh: true
            });
        } else {
            gsap.set(".achievement-section .section-title", { opacity: 1 });
            ScrollTrigger.create({
                trigger: ".achievement-section",
                start: "top top",
                end: "bottom top",
                pin: ".achievement-section .section-title",
                pinSpacing: false,
                markers: false,
                invalidateOnRefresh: true
            });

            ScrollTrigger.create({
                trigger: ".skills-section",
                start: "top 20%",
                end: "top 10%",
                scrub: 0.5,
                onEnter: () => gsap.to(".achievement-section .section-title", { opacity: 0, duration: 0.5 }),
                onLeaveBack: () => gsap.to(".achievement-section .section-title", { opacity: 1, duration: 0.5 }),
                markers: false,
                invalidateOnRefresh: true
            });
        }
    });

    // Skills Section Horizontal Scroll
    mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;
        const skillsCards = document.querySelector(".skills-cards");
        if (skillsCards) {
            const cards = gsap.utils.toArray(".skill-card");
            const cardsWidth = skillsCards.scrollWidth;

            gsap.set(cards, { x: () => window.innerWidth, opacity: 0 });

            gsap.to(cards, {
                x: () => -(cardsWidth + 100),
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top top",
                    end: () => `+=${cardsWidth * 2}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    markers: false,
                    anticipatePin: 1
                }
            });

            if (isDesktop) {
                ScrollTrigger.create({
                    trigger: ".skills-section",
                    start: "top top",
                    end: () => `+=${cardsWidth * 2}`,
                    pin: ".skills-section .section-title",
                    pinSpacing: false,
                    markers: false,
                    invalidateOnRefresh: true
                });
            } else {
                gsap.set(".skills-section .section-title", { opacity: 1 });
                ScrollTrigger.create({
                    trigger: ".skills-section",
                    start: "top top",
                    end: () => `+=${cardsWidth * 2}`,
                    pin: ".skills-section .section-title",
                    pinSpacing: false,
                    markers: false,
                    invalidateOnRefresh: true
                });
            }
        }
    });

    // Footer Parallax Effect
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.to('.footer', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true
            }
        });
    }

    // Refresh ScrollTrigger on load to handle iOS Safari quirks
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});