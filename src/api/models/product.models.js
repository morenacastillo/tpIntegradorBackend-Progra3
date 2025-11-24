import connection from "../database/db.js";

const selectAllProducts = async () => {
    const sql = "SELECT * FROM productos";
    
    return await connection.query(sql); //guardamos las filas de las consultas sql
}

const selectProductWhereId = (id) => {
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
    return connection.query(sql, [id]);

}

const insertProduct = (titulo, tipo, genero, autor, precio, imagen) => {
    let sql = `INSERT INTO productos (titulo, tipo, genero, autor, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)`;
        
    return connection.query(sql, [titulo, tipo, genero, autor, precio, imagen]);
}

const updateProduct = (titulo, tipo, genero, autor, precio, imagen, activo, id) => {
    let sql = `
            UPDATE productos
            SET titulo = ?, tipo = ?, genero = ?, autor = ?, precio = ?, imagen = ?, activo = ?
            WHERE id = ?
            `;

        return connection.query(sql, [titulo, tipo, genero, autor, precio, imagen,
            activo, id]);
}

const removeProduct = (id) => {
    let sql = "DELETE FROM productos WHERE id = ?"

    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    removeProduct
}