var nombres = [];
var asignaciones = [];
var indiceActual = 0;
var nombresConsultados = [];

function obtenerNombres() {
    var cantidadPersonas = document.getElementById("cantidadPersonas").value;
    var nombresContainer = document.getElementById("nombresContainer");
    nombresContainer.innerHTML = "";
    nombresContainer.style.display = "block";

    nombres = [];
    asignaciones = [];
    indiceActual = 0;
    nombresConsultados = [];

    for (var i = 1; i <= cantidadPersonas; i++) {
        var label = document.createElement("label");
        label.textContent = "Nombre de la persona " + i + ":";
        nombresContainer.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.name = "nombre" + i;
        nombresContainer.appendChild(input);
    }
}

function realizarSorteo() {
    if (nombresConsultados.length > 0) {
        alert("El sorteo ya ha sido consultado. Reinicia el sorteo para realizar nuevamente.");
        return;
    }

    var inputs = document.querySelectorAll("#nombresContainer input");

    nombres = [];
    asignaciones = [];
    indiceActual = 0;

    inputs.forEach(function (input) {
        var nombre = input.value.trim();
        if (nombre !== "") {
            nombres.push(nombre);
        }
    });

    // Verificar que haya al menos 2 personas
    if (nombres.length < 2) {
        alert("Debe ingresar al menos dos nombres para realizar el sorteo.");
        return;
    }

    // Verificar que no haya nombres duplicados
    if (new Set(nombres).size !== nombres.length) {
        alert("No puede haber nombres duplicados. Por favor, verifique la lista de nombres.");
        return;
    }

    // Realizar el sorteo evitando asignaciones a uno mismo
    asignaciones = realizarSorteoEvitarUnoMismo([...nombres]);

    // Mostrar la sección de resultados
    document.getElementById("resultados").style.display = "block";
    document.getElementById("consultaContainer").style.display = "block";
    document.getElementById("nombresContainer").style.display = "none";
}

function realizarSorteoEvitarUnoMismo(array) {
    // Función para mezclar aleatoriamente un array (algoritmo de Fisher-Yates)
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Evitar asignaciones a uno mismo
    do {
        shuffleArray(array);
    } while (!array.every((value, index) => value !== nombres[index]));

    return array;
}

function consultarAsignacionPorNombre() {
    var consultaInput = document.getElementById("nombreConsulta");
    var nombreConsulta = consultaInput.value.trim();

    if (nombreConsulta === "") {
        alert("Por favor, ingrese su nombre para consultar la asignación.");
        return;
    }

    if (nombresConsultados.includes(nombreConsulta)) {
        alert("Ya has consultado la asignación para este nombre. Elige otro nombre.");
        return;
    }

    if (nombres.includes(nombreConsulta)) {
        nombresConsultados.push(nombreConsulta);
        var indice = nombres.indexOf(nombreConsulta);
        var asignacion = asignaciones[indice];
        var asignacionActual = document.getElementById("asignacionActual");
        asignacionActual.textContent = "Hola " + nombreConsulta + ", tu asignación es: " + asignacion;
    } else {
        alert("El nombre ingresado no está en la lista de participantes.");
    }
}

function limpiarAsignacion() {
    var asignacionActual = document.getElementById("asignacionActual");
    asignacionActual.textContent = "";
}

function reiniciarSorteo() {
    document.getElementById("resultados").style.display = "none";
    document.getElementById("consultaContainer").style.display = "none";
    document.getElementById("nombresContainer").style.display = "none";
    document.getElementById("nombresContainer").innerHTML = "";
    document.getElementById("nombreConsulta").value = "";
    var asignacionActual = document.getElementById("asignacionActual");
    asignacionActual.textContent = "";
    nombresConsultados = [];
}
