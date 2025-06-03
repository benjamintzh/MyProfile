document.addEventListener('DOMContentLoaded', () => { 
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Toggle Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Existing logo animation with dynamic trigger
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

    // Existing line-by-line text reveal animation with scrub
    const aboutText = document.querySelector(".about-text p");
    const mySplitText = new SplitText(aboutText, { type: "lines", linesClass: "reveal-line" });
    gsap.set(mySplitText.lines, { overflow: "hidden" });

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
                markers: false
            }
        }
    );

    // Existing video animation: Slide with Rotation
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
                markers: false
            }
        }
    );

    // Education Section Animations
    // Pin the section title at the top-left
    ScrollTrigger.create({
        trigger: ".education-section",
        start: "top top",
        end: "bottom top",
        pin: ".section-title",
        pinSpacing: false,
        markers: false
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        mySplitText.revert();
        mySplitText.split({ type: "lines", linesClass: "reveal-line" });
        gsap.set(mySplitText.lines, { overflow: "hidden", y: 30, opacity: 0 });
        ScrollTrigger.refresh();
    });
});