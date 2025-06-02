document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

    // Split only after DOM is ready
    let split = new SplitText(".split", { type: "words, lines" });

    // Store the lines for animation
    let lines = split.lines;

    // Set initial state
    gsap.set(lines, { rotationX: -100, opacity: 0 });

    // ScrollTrigger for hero text animation
    ScrollTrigger.create({
        trigger: ".split",
        start: "top 90%",
        end: "bottom top",
        onEnter: () => animateLines(lines),
        onEnterBack: () => animateLines(lines),
        onLeave: () => resetLines(lines),
        onLeaveBack: () => resetLines(lines),
    });

	// Skills section animation with timeline
	    const skillsContainer = document.querySelector('.skills-container');
	    const skillCards = gsap.utils.toArray('.skill-card');

	    if (!skillsContainer || skillCards.length === 0) {
	        console.warn('Skills container or skill-card elements not found');
	    } else {
	        // Set initial state for skills container and cards
	        gsap.set(skillsContainer, { opacity: 0, y: 30 });
	        gsap.set(skillCards, { x: '100%', opacity: 0 });

	        // Create timeline for skills section
	        gsap.timeline({
	            scrollTrigger: {
	                trigger: '.skills-section',
	                start: 'top 20%',
	                end: '+=150%',
	                scrub: 1,
	                pin: window.innerWidth >= 768, // Disable pinning on mobile
	                anticipatePin: 1,
	                markers: false,
	            }
	        })
	        .to(skillsContainer, {
	            opacity: 1,
	            y: 0,
	            duration: 0.5,
	            ease: 'power2.out'
	        })
	        .to(skillCards, {
	            x: 0,
	            opacity: 1,
	            duration: 0.8,
	            stagger: 0.2,
	            ease: 'power2.out'
	        }, '-=0.3'); // Overlap slightly with container animation for smoothness
	    }
	
    // Other scroll-triggered animations
    const elements = gsap.utils.toArray('.scroll-animate:not(.skill-card)');
    if (elements.length === 0) console.warn('No .scroll-animate elements found');
    elements.forEach((element) => {
        gsap.fromTo(
            element,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "restart none none none",
                    markers: false,
                },
                delay: element.classList.contains('delay-1') ? 0.1 :
                       element.classList.contains('delay-2') ? 0.2 :
                       element.classList.contains('delay-3') ? 0.3 : 0
            }
        );
    });

    // Rotate the entire circle
    gsap.to(".circle-path", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    function animateLines(lines) {
        gsap.fromTo(lines,
            { rotationX: -100, opacity: 0 },
            {
                rotationX: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2",
                stagger: 0.3
            }
        );
    }

    function resetLines(lines) {
        gsap.set(lines, { rotationX: -100, opacity: 0 });
    }

    gsap.from("#content, #circle-content", {
        opacity: 0,
        duration: 5,
        ease: "power2.out"
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
