
// Función para agregar un nuevo país al array de países
const botonAgregar = document.querySelector("#btnAgregarPais");
botonAgregar.addEventListener("click", agregarPais);
const formulario = document.querySelector("#agregar-form");

function agregarPais(e) {
    e.preventDefault();
    const nombre = document.querySelector("#paisNombreNuevo").value;
    const poblacion = document.querySelector("#paisPoblacionNuevo").value;
    const superficie = document.querySelector("#paisSuperficieNuevo").value;
    const idioma = document.querySelector("#paisIdiomaNuevo").value;
    const independencia = document.querySelector("#paisAnoNuevo").value;
    const capital = document.querySelector("#paisCapitalNuevo").value;

    // Validar que el usuario haya ingresado valores válidos para la población y superficie
    if (!poblacion || isNaN(poblacion) || !superficie || isNaN(superficie)) {
        alert("La población y la superficie deben ser valores numéricos.");
        return;
    }

    // Validar que el usuario haya ingresado un año de independencia válido
    if (!independencia || isNaN(independencia) || independencia < 0) {
        alert("El año de independencia debe ser un número entero positivo.");
        return;
    }

    // Crear un nuevo objeto con la información del país
    const pais = {
        nombre: nombre,
        poblacion: poblacion,
        superficie: superficie,
        idioma: idioma,
        independencia: independencia,
        capital: capital
    };

    // Agregar el nuevo objeto al array de países
    borrarPaisesViejos();
    paises.push(pais);
    pintarPaises();
    formulario.reset();
}

// function mostrarPaises() {
//     // Ordenar el array de países por población
//     paises.sort((a, b) => a.poblacion - b.poblacion);

//     // Crear una cadena con los nombres de los países ordenados
//     let cadena = "Los países ordenados por población de menor a mayor son:\n\n";
//     for (let i = 0; i < paises.length; i++) {
//         cadena += `${i + 1}. ${paises[i].nombre}\n`;
//     }

//     // Mostrar la cadena con el método alert
//     alert(cadena);
// }

function filtrarPaises() {
    // Filtrar el array de países para obtener solo los que tienen el idioma español
    const paisesEnEspanol = paises.filter(pais => pais.idioma === "español");

    // Crear una cadena con los nombres de los países que tienen el idioma español
    let cadena = `Hay ${paisesEnEspanol.length} países con el idioma español:\n\n`;
    for (let i = 0; i < paisesEnEspanol.length; i++) {
        cadena += `${i + 1}. ${paisesEnEspanol[i].nombre}\n`;
    }

    // Mostrar la cadena con el método alert
    alert(cadena);
}

function eliminarPais() {
    // Pedir al usuario que ingrese el nombre del país que desea eliminar
    const nombre = prompt("Ingrese el nombre del país que desea eliminar:");

    // Buscar el país en el array de países
    const pais = paises.filter(pais => pais.nombre === nombre);

    // Si el array resultante está vacío, el país no se encuentra en el array
    if (pais.length === 0) {
        // Mostrar un mensaje indicando que el país no se encuentra en el array
        alert(`El país ${nombre} no se encuentra en el array de datos.`);
        return;
    }

    // Filtrar el array de países para obtener solo los que no tienen el nombre ingresado
    const paisesFiltrados = paises.filter(pais => pais.nombre !== nombre);

    // Reemplazar el array de países con el array filtrado
    paises = paisesFiltrados;
}

function verCaracteristicas() {
    // Pedir al usuario que ingrese el nombre del país
    const nombrePais = prompt("Ingrese el nombre del país:");

    // Buscar el país en el array de países
    const pais = paises.find(pais => pais.nombre === nombrePais);

    // Mostrar todas las características del país
    if (pais) {
        alert(`Nombre: ${pais.nombre}\nPoblación: ${pais.poblacion}\nSuperficie: ${pais.superficie} km²\nIdioma: ${pais.idioma}\nIndependencia: ${pais.independencia}\nCapital: ${pais.capital}`);
    } else {
        alert("No se ha encontrado el país ingresado.");
    }
}


//Mostrar Países en el HTML
const pintarPaises = () => {
    const contenedor = document.getElementById("pais-contenedor");
    paises.forEach(pais => {
        const div = document.createElement('div');
        div.classList.add('caja');
        div.innerHTML += `<div class="card-image">
                        <!-- <img src=${pais.img}> -->
                        <p class="titulos">${pais.nombre}</p>
                        </div>
                        <div class="card-content">
                            <p>Población: ${pais.poblacion.toLocaleString()} Hab.</p>
                            <p>Superficie: ${pais.superficie.toLocaleString()} Km2</p>
                            <p>Idioma: ${pais.idioma}</p>
                            <p>Año Independencia: ${pais.independencia.toLocaleString()}</p>
                            <p>Capital: ${pais.capital}</p>
                        </div>`
        contenedor.appendChild(div);
    });
};

//Borrar set de países viejos al agregar uno nuevo
const borrarPaisesViejos = () => {
    const contenedor = document.getElementById("pais-contenedor");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};

// Carga inicial de la pagina 
document.addEventListener('DOMContentLoaded', () => {
    pintarPaises();
});