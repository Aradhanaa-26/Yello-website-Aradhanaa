/* =========================================
   YELLÓ — NAVIGATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    /* =====================================
       NAVBAR SCROLL STATE
       ===================================== */

    if (navbar) {

        const updateNavbar = () => {
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );
    }


    /* =====================================
       SMOOTH ANCHOR NAVIGATION
       ===================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =====================================
       MOBILE MENU
       ===================================== */

    const menuButton =
        document.querySelector(
            ".navbar-menu"
        );

    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );
            }
        );


        /* Close menu after selecting link */

        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );

        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );
                }
            );

        });
    }


    /* =====================================
       ESCAPE KEY
       ===================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape" ||
                !mobileMenu
            ) {
                return;
            }

            mobileMenu.classList.remove(
                "open"
            );

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.classList.remove(
                "menu-open"
            );
        }
    );

});