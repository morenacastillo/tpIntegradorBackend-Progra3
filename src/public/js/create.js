let crearProductos = document.getElementById("crear-productos");
let altaUsers_container = document.getElementById("altaUsers-container");

let url = "http://localhost:3000";

crearProductos.addEventListener("submit", async (event) => {
    event.preventDefault(); //Evita que la página se recargue (por defecto HTML refresca la página al enviar un form).
    
    let formData = new FormData(event.target); // Agarra todos los campos del formulario (según su name="") y los convierte en pares clave-valor:

    let data = Object.fromEntries(formData.entries()); // Convierte eso en un objeto JavaScript:

    console.log(data);
    
    try {
        let respuesta = await fetch(`${url}/api/products`, { 
        method: "POST", //significa que va a crear algo nuevo en el backend.
        headers: { // decís que le estás enviando JSON.
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) //enviás el objeto convertido a texto JSON.
        //Tu backend lo recibe gracias a: app.use(express.json());

        //el controlador lo recibe  let { titulo, tipo, genero, autor, precio, imagen } = req.body;

    }); 

    let resultado = await respuesta.json();
    if (respuesta.ok) {
        alert(`Producto creado con exito con ID: ${resultado.productId}`)
    } else {
        alert(`Error en la creacion de producto: ${resultado.message}`)
    }
    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar los datos")
    }
});

altaUsers_container.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
        let respuesta = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(respuesta.ok) {
            console.log(respuesta);

            let result = await respuesta.json();
            console.log(result);
            alert(result.message)
        }

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});