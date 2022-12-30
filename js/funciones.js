const paisesEnLS = ''
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

    localStorage.setItem("paisesEnLS", JSON.stringify(paises));
    const paisesEnLS = JSON.parse(localStorage.getItem("paisesEnLS"));

    pintarPaises();
    formulario.reset();
}

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
    while (contenedorModal.firstChild) {
        contenedorModal.removeChild(contenedorModal.firstChild);
    }
    const option = document.createElement('option');
    option.innerHTML += `<option selected>Selecciona un país de esta lista</option>`
    contenedorModal.appendChild(option);
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
    // Eliminar el país del array
    const indice = paises.findIndex(pais => pais.nombre === nombre);
    paises.splice(indice, 1);

    modalEliminarPaises();     // Actualizar la lista de países en el modal

    localStorage.setItem("paisesEnLS", JSON.stringify(paises));
    const paisesEnLS = JSON.parse(localStorage.getItem("paisesEnLS"));

    borrarPaisesViejos();
    pintarPaises();

}

//Mostrar Países en el HTML
const pintarPaises = () => {
    if (paisesEnLS === '') {
        const paisesEnLS = paises;
    }
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


// localStorage.setItem("paisesEnLS", JSON.stringify(paises));
// const paisesEnLS = JSON.parse(localStorage.getItem("paisesEnLS"));
// console.log(paisesEnLS);

// Carga inicial de la pagina 
document.addEventListener('DOMContentLoaded', () => {
    pintarPaises();
    modalEliminarPaises();
});
