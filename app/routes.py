
import json

from flask import (
    Blueprint,
    abort,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for
)

main = Blueprint("main", __name__)


def load_projects():
    """Carga los proyectos almacenados en projects.json."""
    projects_file = current_app.config["PROJECTS_FILE"]

    try:
        with open(projects_file, "r", encoding="utf-8") as file:
            projects = json.load(file)

        return projects if isinstance(projects, list) else []

    except (FileNotFoundError, json.JSONDecodeError):
        return []


@main.route("/")
def index():
    projects = load_projects()

    featured_projects = [
        project for project in projects
        if project.get("featured", False)
    ]

    return render_template(
        "index.html",
        featured_projects=featured_projects[:3]
    )


@main.route("/proyectos")
def proyectos():
    projects = load_projects()

    category = request.args.get("categoria", "").strip().lower()

    if category:
        filtered_projects = [
            project for project in projects
            if project.get("category", "").lower() == category
        ]
    else:
        filtered_projects = projects

    return render_template(
        "proyectos.html",
        projects=filtered_projects,
        selected_category=category
    )


@main.route("/proyectos/<slug>")
def proyecto(slug):
    projects = load_projects()

    selected_project = next(
        (
            project for project in projects
            if project.get("slug") == slug
        ),
        None
    )

    if selected_project is None:
        abort(404)

    return render_template(
        "proyecto.html",
        project=selected_project
    )


@main.route("/servicios")
def servicios():
    return render_template("servicios.html")


@main.route("/empresa")
def empresa():
    return render_template("empresa.html")


@main.route("/laboratorio")
def laboratorio():
    return render_template("laboratorio.html")


@main.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == "POST":
        name = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("mensaje", "").strip()

        if not name or not email or not message:
            flash(
                "Completá todos los campos para continuar.",
                "error"
            )
        else:
            # El envío real se implementará al configurar el sistema
            # de recepción de mensajes.
            flash(
                "Gracias por escribirnos. El formulario todavía está en configuración.",
                "success"
            )

        return redirect(url_for("main.contacto"))

    return render_template("contacto.html")
