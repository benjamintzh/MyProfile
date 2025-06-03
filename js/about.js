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

    // Logo animation with dynamic trigger
    ScrollTrigger.create({
        animation: gsap.from(".logo", {
            y: "50vh",
            scale: 6,
            yPercent: -50,
        }),
        scrub: true,
        trigger: ".content",
        start: "top 80%",
        end: "+=50%",
        markers: false
    });

    // Line-by-line text reveal animation with scrub
    const aboutText = document.querySelector(".about-text p");
    if (aboutText) {
        const mySplitText = new SplitText(aboutText, { type: "lines", linesClass: "reveal-line" });
        gsap.set(mySplitText.lines, { overflow: "hidden", y: 30, opacity: 0 });

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
                    start: "top 90%", 
                    end: "bottom 80%", 
                    scrub: 0.5,
                    markers: false,
                    invalidateOnRefresh: true,
                    onEnter: () => console.log("Text animation entered"),
                    onLeave: () => console.log("Text animation left"),
                    onRefresh: () => {
                        if (ScrollTrigger.pos(aboutText) >= ScrollTrigger.start) {
                            gsap.set(mySplitText.lines, { y: 0, opacity: 1 });
                        }
                    }
                }
            }
        );

        // Handle window resize and revert SplitText
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
    ScrollTrigger.create({
        trigger: ".education-section",
        start: "top top",
        end: "bottom top",
        pin: ".section-title",
        pinSpacing: false,
        markers: false,
        invalidateOnRefresh: true
    });

    // Refresh ScrollTrigger on load to handle iOS Safari quirks
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});
