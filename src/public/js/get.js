let url = "http://localhost:3000/api/products";
let tbody = document.getElementById("tabla-productos-body");

// Cuando cargue la página, traer todos los productos
window.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();

        if(respuesta.ok) {
            let productos = datos.payload;
            mostrarProductos(productos);
        } else {
            console.error(datos.message);
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

function mostrarProductos(productos) {
    tbody.innerHTML = ""; // limpiar tabla

    productos.forEach(prod => {
        let fila = `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.titulo}</td>
                <td>${prod.tipo}</td>
                <td>${prod.genero}</td>
                <td>$${prod.precio}</td>
                <td>${prod.autor}</td>
                <td>
                    <img src="${prod.imagen}" alt="${prod.titulo}" style="width:70px; border-radius:5px;">
                </td>
                <td>${prod.activo == 1 ? "Activo" : "Inactivo"}</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}