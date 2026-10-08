/* =========================================
   YELLÓ — ANIMATIONS & INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================
       REDUCED MOTION
       ===================================== */

    if (reducedMotion) {
        document.documentElement.classList.add(
            "reduced-motion"
        );
    }


    /* =====================================
       SCROLL REVEAL
       ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =====================================
       STAGGERED CARDS
       ===================================== */

    const staggerGroups =
        document.querySelectorAll(
            "[data-stagger]"
        );

    if (staggerGroups.length) {

        const staggerObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const children =
                            entry.target.children;

                        Array.from(children).forEach(
                            (child, index) => {

                                child.style.transitionDelay =
                                    `${index * 120}ms`;

                            }
                        );

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.18
                }
            );

        staggerGroups.forEach((group) => {
            staggerObserver.observe(group);
        });
    }


    /* =====================================
       HERO NETWORK
       
       IMPORTANT:
       No mouse tracking.
       No cursor parallax.
       Cards orbit through CSS.
       ===================================== */

    const networkCards =
        document.querySelectorAll(
            ".network-card"
        );

    networkCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "is-active"
                );

                networkCards.forEach(
                    (otherCard) => {

                        if (otherCard !== card) {
                            otherCard.classList.add(
                                "is-dimmed"
                            );
                        }

                    }
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "is-active"
                );

                networkCards.forEach(
                    (otherCard) => {

                        otherCard.classList.remove(
                            "is-dimmed"
                        );

                    }
                );
            }
        );

    });


    /* =====================================
       HERO CARD BACKLIGHT
       
       The cursor controls ONLY the
       position of the purple light.
       The card itself does NOT move.
       ===================================== */

    networkCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) /
                        rect.width) *
                    100;

                const y =
                    ((event.clientY - rect.top) /
                        rect.height) *
                    100;

                card.style.setProperty(
                    "--spot-x",
                    `${x}%`
                );

                card.style.setProperty(
                    "--spot-y",
                    `${y}%`
                );
            }
        );

    });


    /* =====================================
       OTHER CARD TILT
       
       Hero network cards are intentionally
       excluded because they are orbiting.
       ===================================== */

    const tiltCards =
        document.querySelectorAll(
            "[data-tilt]:not(.network-card)"
        );

    if (
        tiltCards.length &&
        !reducedMotion &&
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        tiltCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height;

                    const rotateY =
                        (x - 0.5) * 8;

                    const rotateX =
                        (0.5 - y) * 8;

                    card.style.setProperty(
                        "--rx",
                        `${rotateX}deg`
                    );

                    card.style.setProperty(
                        "--ry",
                        `${rotateY}deg`
                    );

                    card.style.setProperty(
                        "--spot-x",
                        `${x * 100}%`
                    );

                    card.style.setProperty(
                        "--spot-y",
                        `${y * 100}%`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--rx",
                        "0deg"
                    );

                    card.style.setProperty(
                        "--ry",
                        "0deg"
                    );

                }
            );

        });
    }


    /* =====================================
       CURSOR SPOTLIGHT
       ===================================== */

    const spotlightElements =
        document.querySelectorAll(
            ".cursor-spotlight, .profile-card"
        );

    spotlightElements.forEach((element) => {

        element.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) /
                        rect.width) *
                    100;

                const y =
                    ((event.clientY - rect.top) /
                        rect.height) *
                    100;

                element.style.setProperty(
                    "--spot-x",
                    `${x}%`
                );

                element.style.setProperty(
                    "--spot-y",
                    `${y}%`
                );

            }
        );

    });


    /* =====================================
       JOURNEY PROGRESS
       ===================================== */

    const journey = document.querySelector(".journey");
const journeyProgress = document.querySelector(".journey-progress");
const journeySteps = document.querySelectorAll(".journey-step");

if (journey && journeyProgress && journeySteps.length) {
    const updateJourney = () => {
        const rect = journey.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const start = viewportHeight * 0.75;
        const end = viewportHeight * 0.25;

        let progress = (start - rect.top) / (start - end);

        progress = Math.max(0, Math.min(1, progress));

        journeyProgress.style.width = `${progress * 100}%`;

        const activeIndex = Math.min(
            journeySteps.length - 1,
            Math.floor(progress * journeySteps.length)
        );

        journeySteps.forEach((step, index) => {
            step.classList.toggle(
                "is-active",
                index <= activeIndex
            );
        });
    };

    window.addEventListener("scroll", updateJourney, {
        passive: true
    });

    updateJourney();
}


    /* =====================================
       MATCH SCORE COUNTERS
       ===================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const element =
                            entry.target;

                        const target =
                            Number(
                                element.dataset.counter
                            );

                        if (Number.isNaN(target)) {
                            return;
                        }

                        if (reducedMotion) {

                            element.textContent =
                                `${target}%`;

                            observer.unobserve(
                                element
                            );

                            return;
                        }

                        let current = 0;

                        const duration = 900;

                        const start =
                            performance.now();

                        const animateCounter =
                            (time) => {

                                const progress =
                                    Math.min(
                                        (time - start) /
                                        duration,
                                        1
                                    );

                                const eased =
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        3
                                    );

                                current =
                                    Math.round(
                                        target * eased
                                    );

                                element.textContent =
                                    `${current}%`;

                                if (progress < 1) {

                                    requestAnimationFrame(
                                        animateCounter
                                    );

                                } else {

                                    element.textContent =
                                        `${target}%`;

                                }
                            };

                        requestAnimationFrame(
                            animateCounter
                        );

                        observer.unobserve(
                            element
                        );
                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }


    /* =====================================
       ACTIVE SECTION TRACKING
       ===================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.navbar-links a[href^="#"]'
        );

    if (
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navLinks.forEach((link) => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            );

                        });

                    });

                },
                {
                    threshold: 0.45
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================
       FINAL INITIALIZATION
       ===================================== */

    document.body.classList.add(
        "animations-ready"
    );

});