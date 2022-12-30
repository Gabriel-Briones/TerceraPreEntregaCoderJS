// Chequear si hay una base de datos previa en la memoria local
const paisesEnLS = JSON.parse(localStorage.getItem("paisesEnLS"));
if (paisesEnLS !== null) {
    paises = paisesEnLS;
    console.log("Lista de paises ya en memoria local");
} else {
    const paisesEnLS = paises;
    console.log("Se asignaron los valores de la base de datos en JS");
}

// Modal "Agregar país": Función para agregar un nuevo país al array
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

    pintarPaises();
    formulario.reset();
}

//Borrar set de países viejos al agregar uno nuevo
const borrarPaisesViejos = () => {
    const contenedor = document.getElementById("pais-contenedor");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};

//Modal "Eliminar Países": Lista de opciones
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


// Modal "Eliminar Países": Funcionalidad botón Eliminar
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

    borrarPaisesViejos();
    pintarPaises();
}

//Cuerpo HTML: Mostrar Países
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
    modalEliminarPaises(); //Refrescar la lista de países en el modal
};

// Carga inicial de la pagina 
document.addEventListener('DOMContentLoaded', () => {
    pintarPaises();
    modalEliminarPaises();
});
