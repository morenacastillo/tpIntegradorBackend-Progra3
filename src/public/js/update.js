let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let updateFormularioContenedor = document.getElementById("update-formulario-contenedor")
let url = "http://localhost:3000/api/products";

getProduct_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target); //form data
    
    let data = Object.fromEntries(formData.entries()); //objeto
                    
    let idProd = data.idProd;
                    
    try {
        let repuesta = await fetch(`${url}/${idProd}`);
        
        let datos = await repuesta.json();

        let producto = datos.payload[0];
        
        mostrarProducto(producto); 
        
    
    } catch (error) {
        console.log(error); 
    }
    
})


function mostrarProducto(producto) {
    let htmlProducto = `
        <ul class="ul-admin">
            <li class="li-listados">
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <p>Id: ${producto.id} | Nombre: ${producto.titulo} | Precio: $${producto.precio}</p>
            </li>
            <li>
            <input type="button" id="modificar_boton" value="Modificar producto"
        </li>
        </ul>
        `;

        listaProductos.innerHTML = htmlProducto;

        let modificar_boton = document.getElementById("modificar_boton");

        modificar_boton.addEventListener("click", event => {
            formularioPutProducto(event, producto);

        });
}

function formularioPutProducto(event, producto) {
    event.stopPropagation();

    let updateFormularioHTML =  `
        <form id="modificar-productos">

            <label for="idProd">Id</label>
            <input type="hidden" name="id" id="idProd" value="${producto.id}" required>

            <label for="activoProd">Activo</label>
            <select name="activo" id="activoProd" required> 
                <option value="0">Inactivo</option>
                <option value="1">Activo</option>
            </select>
            
            <label for="tituloProd">Titulo</label>
            <input type="text" name="titulo" id="tituloProd" value="${producto.titulo}" required>

            <label for="tipoProd">Tipo</label>
            <select name="tipo" id="tipoProd">
                <option value="Vinilo">Vinilo</option>
                <option value="Cd">Cd</option>
                <option value="Cassette">Cassette</option>
            </select>
            
            <label for="generoProd">Genero</label>
            <input type="text" name="genero" id="generoProd" value="${producto.genero}" required>
            
            <label for="autorProd">Autor</label>
            <input type="text" name="autor" id="autorProd" value="${producto.autor}" required>

            <label for="precioProd">Precio</label>
            <input type="number" name="precio" id="precioProd" value="${producto.precio}" required>
            
            <label for="imagenProd">Imagen</label>
            <input type="text" name="imagen" id="imagenProd" value="${producto.imagen}" required>

            <input type="submit" value="Modificar producto">
        </form> 
    `
    updateFormularioContenedor.innerHTML = updateFormularioHTML;

    let modificarProductos = document.getElementById("modificar-productos")
    modificarProductos.addEventListener("submit", async event => {
        event.preventDefault();

        let formData = new FormData(event.target);

        let data = Object.fromEntries(formData.entries()); 
    
        
        try {
            
            let respuesta = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            let resultado = await respuesta.json(); 
            
            if (respuesta.ok){
                console.log(resultado.message);
                alert(resultado.message)

                listaProductos.innerHTML = "";
                updateFormularioContenedor = "";
            } else {
                console.error("Error: ", resultado.message);
                alert(resultado.message);
            }

        } catch (error) {
            console.error("Error al enviar los datos: ", error);
            alert("Error al procesar la solicitud")
        }
    })
}
