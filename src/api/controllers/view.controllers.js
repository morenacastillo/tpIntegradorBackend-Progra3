import ProductsModel from "../models/product.models.js"

export const vistaProductos = async (req, res) => {
    if(!req.session.user) {
        return res.redirect("/login")
    }
    try {
        const result = await ProductsModel.selectAllProducts();
        const [ rows ] = result;

        res.render("verAdmin", {
            productos: rows
        });

    } catch (error) {
        console.error(" ERROR en vistaProductos:", error);
    }
}