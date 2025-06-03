document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';

    const preloader = document.querySelector('.preloader');
    const name = document.querySelector('.preloader-name');
    const paths = [
        '.path-main',
        '.path-small1', '.path-small2', '.path-small3', '.path-small4',
        '.path-small5', '.path-small6', '.path-small7', '.path-small8',
        '.path-small9', '.path-small10', '.path-small11', '.path-small12',
        '.path-small13', '.path-small14', '.path-small15', '.path-small16',
        '.path-small17', '.path-small18', '.path-small19', '.path-small20',
        '.path-small21', '.path-small22', '.path-small23', '.path-small24',
        '.path-small25', '.path-small26'
    ];

    // Set initial stroke dash properties
    paths.forEach(selector => {
        const path = document.querySelector(selector);
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, drawSVG: "0%" });
        }
    });

    // Preloader animation timeline
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, { 
                opacity: 0, 
                duration: 1.5, 
                onComplete: () => {
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    tl.to('.path-main', { strokeDashoffset: 0, duration: 3, ease: "power1.out" })
      .to('.path-small1', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.5")
      .to('.path-small2', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.4")
      .to('.path-small3', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.3")
      .to('.path-small4', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.2")
      .to('.path-small5', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.1")
      .to('.path-small6', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=2.0")
      .to('.path-small7', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.9")
      .to('.path-small8', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.8")
      .to('.path-small9', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.7")
      .to('.path-small10', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.6")
      .to('.path-small11', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.5")
      .to('.path-small12', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.4")
      .to('.path-small13', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.3")
      .to('.path-small14', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.2")
      .to('.path-small15', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.1")
      .to('.path-small16', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=1.0")
      .to('.path-small17', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.9")
      .to('.path-small18', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.8")
      .to('.path-small19', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.7")
      .to('.path-small20', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.6")
      .to('.path-small21', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.5")
      .to('.path-small22', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.4")
      .to('.path-small23', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.3")
      .to('.path-small24', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.2")
      .to('.path-small25', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" }, "-=0.1")
      .to('.path-small26', { strokeDashoffset: 0, duration: 0.8, ease: "power1.out" });

    tl.to(name, { opacity: 1, duration: 2, ease: "power1.out" }, "-=1");
    tl.duration(5);
    setTimeout(() => {
        if (tl.progress() < 1) {
            tl.progress(1);
        }
    }, 5000);

    // Toggle Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // Logo animation
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;
        ScrollTrigger.create({
            animation: gsap.from(".logo", {
                y: isDesktop ? "50vh" : isTablet ? "30vh" : "20vh",
                scale: isDesktop ? 6 : isTablet ? 4 : 3,
                yPercent: -50,
            }),
            scrub: true,
            trigger: ".hero-section",
            start: isDesktop ? "top 80%" : "top 90%",
            end: isDesktop ? "+=50%" : "+=30%",
            markers: false,
            invalidateOnRefresh: true
        });
    });

    // Line-by-line text reveal animation
    const splitText = document.querySelector(".split");
    if (splitText) {
        const mySplitText = new SplitText(splitText, { type: "lines", linesClass: "reveal-line" });
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
                        trigger: ".split",
                        start: isDesktop ? "top bottom" : "top 90%",
                        end: isDesktop ? "bottom center" : "bottom 80%",
                        scrub: 0.5,
                        markers: false,
                        invalidateOnRefresh: true
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
    }

    // Image and circle animation
    gsap.from("#content, #circle-content", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".image-wrapper",
            start: "top 95%",
            end: "top 50%",
            scrub: 0.5,
            markers: false
        }
    });

    gsap.to(".circle-path", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    // Footer Parallax Effect
    const footer = document.querySelector('.footer');
    if (footer) {
        // Animate .footer-info to move slower
        gsap.to('.footer-info', {
            y: -50, // Move up slightly
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

        // Animate .footer-nav to move faster
        gsap.to('.footer-nav', {
            y: -100, // Move up more
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

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});