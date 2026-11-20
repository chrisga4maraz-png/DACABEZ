/* ========================================
   DACABEZ | ANIMATIONS.JS
   Animaciones y efectos visuales
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // PREFERENCIAS DE MOVIMIENTO
    // ========================================

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }


    // ========================================
    // ELEMENTOS ANIMABLES
    // ========================================

    const animatedElements = document.querySelectorAll(
        [
            ".service-preview-card",
            ".contact-preview-content",
            ".intro-content",
            ".laboratory-preview-content",
            ".contact-layout",
            ".project-card"
        ].join(",")
    );


    // Si el navegador no admite IntersectionObserver,
    // los elementos permanecen visibles normalmente.

    if (!("IntersectionObserver" in window)) {
        return;
    }


    // ========================================
    // OBSERVADOR DE ANIMACIONES
    // ========================================

    const animationObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                element.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(28px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 750,
                        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        fill: "both"
                    }
                );

                observer.unobserve(element);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }
    );


    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });


    // ========================================
    // EFECTO DE ENTRADA PARA TARJETAS
    // ========================================

    const cardGroups = document.querySelectorAll(
        ".services-preview-grid"
    );

    cardGroups.forEach(group => {

        const cards = group.querySelectorAll(".service-preview-card");

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--animation-delay",
                `${index * 100}ms`
            );

        });

    });

});