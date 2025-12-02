import connection from "../database/db.js";

export const crearVenta = async (req, res) => {
    try {
        const { nombreUsuario, precioTotal, fechaEmision, productos } = req.body;

        if(!nombreUsuario || !precioTotal || !fechaEmision || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({
                message: "Datos inválidos, debes enviar nombreUsuario, precioTotal, fechaEmision y productos"
            });
        }

        const sqlTicket = "INSERT INTO tickets (nombreUsuario, precioTotal, fechaEmision) VALUES (?, ?, ?)";
        const [resultadoTicket] = await connection.query(sqlTicket, [
            nombreUsuario, 
            precioTotal, 
            fechaEmision
        ]);

        const ticketId = resultadoTicket.insertId;

        const sqlProductoTickets = "INSERT INTO productos_tickets (idProducto, idTicket) VALUES (?, ?)";
        for (const idProducto of productos) {
            await connection.query(sqlProductoTickets, [idProducto, ticketId]);
        }

        res.status(200).json({
            message: "Venta registrada con éxito!",
            ticketId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};