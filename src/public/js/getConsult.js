let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let url = "http://localhost:3000/api/products";

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
                
                mostrarProducto(producto);

            } else {
                console.error(datos.message)
                mostrarError(datos.message)
            }
        
        } catch (error) {
            console.log(error); 
        }
        
    });

    function mostrarProducto (producto){
        let htmlProducto = 
                `
                <ul class="ul-admin">
                    <li class="li-listados">
                        <img src="${producto.imagen}" alt="${producto.titulo}">
                        <p>Id: ${producto.id} | Nombre: ${producto.titulo} | Precio: $${producto.precio}</p>
                    </li>
                </ul>
                `;

        listaProductos.innerHTML = htmlProducto;
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