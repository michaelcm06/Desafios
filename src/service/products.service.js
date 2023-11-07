import { Product as DAO } from "../Dao/models/Product";

class ProductosService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getProductos() {
        return await this.dao.get();
    }

    async getProductoById(id) {
        return await this.dao.get({ _id: id });
    }

    async createProducto(nombre, descripcion, precio) {
        return await this.dao.create({ nombre, descripcion, precio });
    }
}

export const productosService = new ProductosService(DAO);
