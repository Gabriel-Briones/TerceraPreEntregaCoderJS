
// Función para agregar un nuevo país al array de países
function agregarPais() {
    // Pedir al usuario que ingrese la información del nuevo país
    const nombre = prompt("Ingrese el nombre del país:");
    const poblacion = prompt("Ingrese la población del país (en números):");
    const superficie = prompt("Ingrese la superficie del país en km² (en números):");
    const idioma = prompt("Ingrese el idioma oficial del país:");
    const independencia = prompt("Ingrese el año de independencia del país (en números):");
    const capital = prompt("Ingrese la capital del país:");

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
    paises.push(pais);
}

function mostrarPaises() {
    // Ordenar el array de países por población
    paises.sort((a, b) => a.poblacion - b.poblacion);

    // Crear una cadena con los nombres de los países ordenados
    let cadena = "Los países ordenados por población de menor a mayor son:\n\n";
    for (let i = 0; i < paises.length; i++) {
        cadena += `${i + 1}. ${paises[i].nombre}\n`;
    }

    // Mostrar la cadena con el método alert
    alert(cadena);
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

// while (true) {
//     // Mostrar un menú con las opciones disponibles
//     const opcion = prompt(
//         "Elige una opción:\n\n" +
//         "1. Agregar un nuevo país\n" +
//         "2. Mostrar la lista de países ordenada por población\n" +
//         "3. Filtrar los países que tienen el idioma español\n" +
//         "4. Eliminar un país\n" +
//         "5. Ver características\n" +
//         "6. Salir"
//     );

//     // Realizar una acción según la opción elegida por el usuario
//     switch (opcion) {
//         case "1":
//             agregarPais();
//             break;
//         case "2":
//             mostrarPaises();
//             break;
//         case "3":
//             filtrarPaises();
//             break;
//         case "4":
//             eliminarPais();
//             break;
//         case "5":
//             verCaracteristicas();
//             break;
//         case "6":
//             alert("¡Hasta luego!");
//             break;
//         default:
//             alert("Opción inválida. Por favor, elige una opción válida.");
//             break;
//     }
// }


document.addEventListener('DOMContentLoaded', () => {
    pintarPaises();

    // if (localStorage.getItem('carrito')) {
    //     carrito = obtenerCarritoStorage();
    //     console.log(carrito)
    //     actualizarCarrito(carrito);
    // }
});

//Mostrar Países

const pintarPaises = () => {
    const contenedor = document.getElementById("pais-contenedor");
    paises.forEach(pais => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${pais.img}>
                          <span class="card-title">${pais.nombre}</span>
                          <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${pais.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>Población: ${pais.poblacion}</p>
                            <p>Superficie: ${pais.superficie}</p>
                            <p>Idioma: ${pais.idioma}</p>
                            <p>Año Independencia:${pais.independencia}</p>
                            <p>Capital: ${pais.capital}</p>
                        </div>
                       `
      contenedor.appendChild(div);
    });
  };

// MODO OSCURO
const botonColorMode = document.querySelector("#color-mode");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("text-bg-dark");
    localStorage.setItem("dark-mode", "activado");
    document.getElementById("color-mode").innerText = "Modo Claro";
}

function desactivarDarkMode() {
    body.classList.remove("text-bg-dark");
    localStorage.setItem("dark-mode", "desactivado");
    document.getElementById("color-mode").innerText = "Modo Oscuro";
}

if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})
