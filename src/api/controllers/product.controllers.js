import ProductsModels from "../models/product.models.js"

/*
Controller:
El controller recibe el id validado previamente y hace la consulta a ProductsModels (models -> contiene las sentencias sql para consultar a la BD) con selectProductWhereId (ejemplo), si el id coincide con uno existente en la BD arma el json y lo devuelve en la response al usuario
*/

export const getAllProducts = async (req, res) => {
    
    try {
        
        const [rows] = await ProductsModels.selectAllProducts();
        
        res.status(200).json({ //estado 200 ok
            payload: rows
        });
        
    } catch (error) { //estado 500 error
        console.error("Error obteniendo productos", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos",
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        if(!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: "El id del producto debe ser un numero valido"
            })
        }

        let [ rows ] = await ProductsModels.selectProductWhereId(id)
        console.log(rows);

        if(rows.length === 0) {
            console.log("Error. No existe producto con ese id");
            return res.status(404).json({
                message: "No se encontro producto con id:", id
            })
        }
        
        res.status(200).json({
            payload: rows
        });
        
    } catch (error) {
        console.error(`Error obteniendo productos con id ${id}`, error.message);
        
        res.status(500).json({
            message: "Error interno al obtener producto in id"
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        let { titulo, tipo, genero, autor, precio, imagen } = req.body;

        if(!titulo ||!tipo ||!genero ||!autor ||!precio ||!imagen) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los datos requeridos"
            });
        }
        
        let [resultado] = await ProductsModels.insertProduct(titulo, tipo, genero, autor, precio, imagen);

        res.status(201).json({
            message: "producto creado con exito",
            productId: resultado.insertId
        })
        
    } catch(error) {
        console.error("Error interno del servidor");

        res.status(500).json ({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        let { id, titulo, tipo, genero, autor, precio, imagen, activo } = req.body;

        if(!id ||!titulo ||!tipo ||!genero ||!autor ||!precio ||!imagen ||!activo) {
            return res.status(400).json({
                message: "Faltan campso requeridos"
            });
        }

        let [resultado] = await ProductsModels.updateProduct(titulo, tipo, genero, autor, precio, imagen,
            activo, id);

        if(resultado.affectedRows === 0) { // No se actualizo nada
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(201).json({
            message: `Producto con ID ${id} actualizado correctamente`,
        })
        
    } catch(error) {
        console.error("Error al actualizar productos", error);

        res.status(500).json ({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let [ resultado ] = await ProductsModels.removeProduct(id);
        console.log(resultado);
        
        if(resultado.affectedRows === 0) { 
            return res.status(400).json({
                message: "No se elimino el producto"
            });
        }

        return res.status(200).json({
            message: `Producto in id ${id} eliminado correctamente`
        });
        
    } catch (error) {
        console.log("Error al eliminar un producto: ", error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}: `, error,
            error: error.message
        })
    }
};