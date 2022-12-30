
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


//Lista para modal "Eliminar Países"

const modalEliminarPaises = () => {
    const contenedorModal = document.getElementById("modal-opciones-eliminar");
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.innerHTML += `<option> ${pais.nombre} </option>`
        contenedorModal.appendChild(option);
    });
};


const btnEliminarModal = document.getElementById("btnEliminarModal");
btnEliminarModal.addEventListener("click", eliminarPais);

function eliminarPais() {
    const select = document.getElementById("modal-opciones-eliminar");
    const nombre = select.value;

    // Validar que se haya seleccionado un país
    if (nombre === "Selecciona un país de esta lista") {
        alert("Selecciona un país de la lista para eliminarlo.");
        return;
    }

    // Buscar el índice del país en el array
    const indice = paises.findIndex(pais => pais.nombre === nombre);

    // Eliminar el país del array
    paises.splice(indice, 1);

    console.log(paises);

    // Actualizar la lista de países en el modal
    modalEliminarPaises();
}

//Mostrar Países en el HTML
const pintarPaises = () => {
    const contenedor = document.getElementById("pais-contenedor");
    console.log(contenedor)
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
    modalEliminarPaises();
});