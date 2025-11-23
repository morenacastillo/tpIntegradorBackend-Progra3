const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString}] ${req.method} ${req.url}`);

    next();
}

const validateId = (req, res, next) => {
    let { id } = req.params;

    // Nos aseguramos que el id no sea un numero

    if(!id || isNan(Number(id))) {
        return res.status(400).json({
            message: "El id del producto debe ser un numero"
        })
    }

    req.id = parseInt(id, 10)

    console.log("Id validado: ", req.id);
    next();
}

export {
    loggerUrl,
    validateId
}