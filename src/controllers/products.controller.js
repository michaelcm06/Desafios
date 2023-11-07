import { productosService } from "../service/products.service"

async function getProductos(req, res) {
    try {
        let productos = await productosService.getProductos();
        return res.status(200).json({ productos });
    } catch (error) {
        return res.status(500).json({ error: "Error inesperado", detalle: error.message });
    }
}

async function getProductoById(req, res) {
    try {
        let producto = await productosService.getProductoById(req.params.id);
        return res.status(200).json({ producto });
    } catch (error) {
        return res.status(500).json({ error: "Error inesperado", detalle: error.message });
    }
}

async function postProducto(req, res) {
    let { nombre, descripcion, precio } = req.body;
    if (!nombre || !descripcion || !precio) return res.status(400).json({ error: "Complete todos los datos" });

    try {
        let productoNuevo = await productosService.createProducto(nombre, descripcion, precio);
        return res.status(201).json({ productoNuevo });
    } catch (error) {
        return res.status(500).json({ error: "Error inesperado", detalle: error.message });
    }
}

export default { getProductos, postProducto, getProductoById };
