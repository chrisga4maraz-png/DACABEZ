/* ========================================
   DACABEZ | MAIN.JS
   Navegación y funciones generales
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");
    const navigationLinks = document.querySelectorAll(".navigation a");
    const header = document.querySelector(".site-header");


    // ========================================
    // MENÚ DE NAVEGACIÓN
    // ========================================

    function openMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.add("active");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");

        document.body.classList.add("menu-open");
    }


    function closeMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

        document.body.classList.remove("menu-open");
    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Cerrar el menú al seleccionar una sección.

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        // Cerrar el menú con Escape.

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Cerrar el menú al hacer clic fuera de él.

        document.addEventListener("click", event => {

            const clickedInsideMenu = navigation.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });


        // Cerrar el menú al volver a una pantalla grande.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 680) {
                closeMenu();
            }

        });

    }


    // ========================================
    // ENCABEZADO AL DESPLAZARSE
    // ========================================

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // ========================================
    // ENLACES INTERNOS
    // ========================================

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});