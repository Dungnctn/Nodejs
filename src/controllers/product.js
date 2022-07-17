import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants/constants';
import Product from '../models/product'
import { createProduct, deleteProduct, detailProduct, getProducts, updateProduct } from '../serviecs/product';

export const create = async (req, res) => {
    const newData = req.body;
    try {
        await createProduct(newData);
        res.status(200).json('Thêm sản phẩm thành công')
    } catch (error) {
        res.json({
            msg: "Khong them duoc san pham"
        })
    }
}

export const getAll = async (req, res) => {
    const { limit, page, sort, textSearch, isActive } = req.query;
    try {

        const pagination = {
            limit: +limit || DEFAULT_LIMIT,
            page: +page || DEFAULT_PAGE
        }

        const filter = {
            isActive,
        }

        const {products, total, _total} = await getProducts({ pagination, textSearch, sort, filter })

        return res.json({
            product: 
            products,
            pagination: {
                ...pagination,
                total
            },
            _total
        })
    } catch (error) {
        res.json({
            msg: "Khong tim duoc san pham"
        })
    }
}

export const get = async (req, res) => {
    const _id = {_id: req.params.id}
    try {
        const listProduct = await detailProduct(_id);

        res.json({product: listProduct })
    } catch (error) {
        res.json({
            msg: "Khong tim duoc san pham"
        })
    }
}

export const remove = async (req, res) => {
    const _id = {_id: req.params.id}
    try {
        await deleteProduct(_id)
        res.status(200).json('Xóa sản phẩm thành công')
    } catch (error) {
        res.json({
            msg: "Khong xoa duoc san pham"
        })
    }
}

export const update = async (req, res) => {
    const _id = {_id: req.params.id}
    const updateData = req.body
    try {
        await updateProduct(_id, updateData)
        res.status(400).json("Cập nhật sản phẩm thành công")
    } catch (error) {
        res.json({
            msg: "Khong cap nhat duoc san pham"
        })
    }
}