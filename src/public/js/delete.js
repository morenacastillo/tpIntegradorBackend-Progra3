let url = "http://localhost:3000/api/products";
let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");


getProduct_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target); //form data
    
    let data = Object.fromEntries(formData.entries()); //objeto
                    
    let idProd = data.idProd;
                    
    try {
        let repuesta = await fetch(`${url}/${idProd}`);
        
        let datos = await repuesta.json();

        let producto = datos.payload[0];
        
        let htmlProducto = 
        `
        <ul class="ul-admin">
            <li class="li-listados">
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <p>Id: ${producto.id} | Nombre: ${producto.titulo} | Precio: $${producto.precio}</p>
            </li>
            <li>
                <input type="button" id="eliminar_boton" value="Eliminar producto"
            </li>
        </ul>
        `;

        listaProductos.innerHTML = htmlProducto;
    
        let eliminar_boton = document.getElementById("eliminar_boton")

        eliminar_boton.addEventListener("click", event => {
            event.stopPropagation();
            let confirmacion = confirm("¿Quieres eliminar este producto?")
            if(!confirmacion) {
                alert("Eliminacion cancelada");
            } else {
                eliminarProducto(idProd);
            }
        });

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
                }
            
            } catch (error) {
                console.error("Error en la solicitud DELETE: ", error)
                alert("Ocurrio un error al eliminar un producto")
            }
            
        }



    } catch (error) {
        console.log(error); 
    }
        
    });
