import Category from "../models/category";
import Product from "../models/product";

export const create = async (req, res) => {
    try {
        const category = await new Category(req.body).save();
        res.json(category)
    } catch (error) {
        res.json({
            msg: "Khong them duoc danh muc"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const category = await Category.find().exec();
        res.json(category)
    } catch (error) {
        res.json({
            msg: "Khong tim duoc danh muc"
        })
    }
}

export const readProduct = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const category = await Category.findOne(condition).exec();
        const product = await Product.find({category}).select("-category").exec();
        res.json({
            category, product
        })
    } catch (error) {
        res.status(400).json({
            message: "Khong tim thay san pham theo danh muc"
        })
    }
}

export const get = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const category = await Category.findOne(condition).exec();
        res.json(category)
    } catch (error) {
        res.json({
            msg: "Khong tim duoc danh muc"
        })
    }
}

export const remove = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const category = await Category.findOneAndRemove(condition).exec();
        res.json(category)
    } catch (error) {
        res.json({
            msg: "Khong xoa duoc danh muc"
        })
    }
}

export const update = async (req, res) => {
    const condition = {_id: req.params.id}
    const doc = req.body
    try {
        const category = await Category.findOneAndUpdate(condition, doc).exec();
        res.json(category)
    } catch (error) {
        res.json({
            msg: "Khong cap nhat duoc danh muc"
        })
    }
}

