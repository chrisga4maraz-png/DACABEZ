/* ========================================
   DACABEZ | PROJECTS.JS
   Archivo y filtros de proyectos
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const filtersContainer = document.querySelector(".projects-filters");
    const projectCards = document.querySelectorAll(".catalog-project-card");
    const catalogGrid = document.querySelector(".projects-catalog-grid");


    // ========================================
    // COMPROBAR ELEMENTOS NECESARIOS
    // ========================================

    // Si no estamos en la página de proyectos,
    // no ejecutamos el sistema de filtros.

    if (
        !filtersContainer ||
        !catalogGrid ||
        projectCards.length === 0
    ) {
        return;
    }


    // ========================================
    // CATEGORÍAS DE LOS PROYECTOS
    // ========================================

    const projectCategories = {

        "el-quebradiso": ["web"],

        "escuela-provincial-comercio-1": ["web"],

        "nexo-gaming": ["gaming"],

        "gaming-o-nada": ["diseno", "experimental"]

    };


    // ========================================
    // ELEMENTOS DE INTERFAZ
    // ========================================

    const filterLinks = filtersContainer.querySelectorAll(".project-filter");


    // Mensaje de resultados.

    const resultsMessage = document.createElement("p");

    resultsMessage.className = "projects-results-message";
    resultsMessage.setAttribute("aria-live", "polite");

    catalogGrid.insertAdjacentElement("beforebegin", resultsMessage);


    // ========================================
    // OBTENER IDENTIFICADOR DEL PROYECTO
    // ========================================

    function getProjectSlug(card) {

        const projectLink = card.querySelector(".project-card-link");

        if (!projectLink) return null;

        const url = new URL(projectLink.href);

        return url.pathname.split("/").filter(Boolean).pop();

    }


    // ========================================
    // FILTRAR PROYECTOS
    // ========================================

    function filterProjects(category = "todos") {

        let visibleProjects = 0;

        projectCards.forEach(card => {

            const slug = getProjectSlug(card);

            const categories = projectCategories[slug] || [];

            const shouldShow =
                category === "todos" ||
                categories.includes(category);

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleProjects++;
            }

        });


        // Actualizar categoría seleccionada.

        filterLinks.forEach(link => {

            const url = new URL(link.href, window.location.origin);

            const linkCategory =
                url.searchParams.get("categoria") || "todos";

            const isActive = linkCategory === category;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }

        });


        // Actualizar mensaje de resultados.

        if (visibleProjects === 0) {

            resultsMessage.textContent =
                "No hay proyectos disponibles en esta categoría.";

        } else {

            resultsMessage.textContent =
                `${visibleProjects} ${
                    visibleProjects === 1
                        ? "proyecto encontrado"
                        : "proyectos encontrados"
                }`;

        }

    }


    // ========================================
    // NAVEGACIÓN ENTRE CATEGORÍAS
    // ========================================

    filterLinks.forEach(link => {

        link.addEventListener("click", event => {

            const url = new URL(link.href, window.location.origin);

            const category =
                url.searchParams.get("categoria") || "todos";

            // Evitar recargar la página.

            event.preventDefault();


            // Actualizar dirección del navegador.

            const newUrl = category === "todos"
                ? "/proyectos"
                : `/proyectos?categoria=${encodeURIComponent(category)}`;

            window.history.pushState(
                { category },
                "",
                newUrl
            );

            filterProjects(category);

        });

    });


    // ========================================
    // ATRÁS Y ADELANTE DEL NAVEGADOR
    // ========================================

    window.addEventListener("popstate", () => {

        const params = new URLSearchParams(window.location.search);

        const category = params.get("categoria") || "todos";

        filterProjects(category);

    });


    // ========================================
    // FILTRO INICIAL
    // ========================================

    const initialParams = new URLSearchParams(window.location.search);

    const initialCategory =
        initialParams.get("categoria") || "todos";

    const validCategories = [
        "todos",
        "web",
        "diseno",
        "gaming",
        "experimental"
    ];

    filterProjects(
        validCategories.includes(initialCategory)
            ? initialCategory
            : "todos"
    );

});