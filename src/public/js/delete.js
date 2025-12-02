let url = "http://localhost:3000/api/products";
let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");

getProduct_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target); //form data
    
    let data = Object.fromEntries(formData.entries()); //objeto
                    
    let idProd = data.idProd;
                    
    try {
        let respuesta = await fetch(`${url}/${idProd}`);
        
        let datos = await respuesta.json();
        
        if(respuesta.ok) {
            let producto = datos.payload[0];
            mostrarProducto(producto)

        } else {
                console.error(datos.message)
                mostrarError(datos.message)
            } 
        } catch (error) {
            console.log("Error:", error);
            mostrarError("Error al buscar el producto");
        }
        
    });
    
function mostrarProducto(producto){
    let htmlProducto = 
        `
        <ul class="ul-admin">
            <li class="li-listados">
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <p>Id: ${producto.id} | Nombre: ${producto.titulo} | Precio: $${producto.precio}</p>
            </li>
            <li>
                <input id="eliminar-boton" type="submit" value="Eliminar producto"
            </li>
        </ul>
        `;

        listaProductos.innerHTML = htmlProducto;
        let eliminarBoton = document.getElementById("eliminar-boton")

        eliminarBoton.addEventListener("click", event => {
            let confirmacion = confirm("¿Quieres eliminar este producto?");

            if (!confirmacion) {
                alert("Eliminación cancelada");
                return;
            }

            eliminarProducto(producto.id);
    });
}


async function eliminarProducto(id) {
    console.log("eliminado: ", id);
    try {
        let respuesta = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        let resultado = await respuesta.json();

        if(respuesta.ok){
            alert(resultado.message);
            listaProductos.innerHTML = "";
        } else {
            alert("Error: " + resultado.message);
        }
    
    } catch (error) {
        console.error("Error en la solicitud DELETE: ", error)
        alert("Ocurrio un error al eliminar un producto")
    }
    
}

function mostrarError(error){
    let htmlError = `
    <li class="mensaje-error">
        <p>
            <strong>Error:</strong>
            <span>${error}</span>
        </p>
    </li>
    `  
    listaProductos.innerHTML = htmlError;
}
