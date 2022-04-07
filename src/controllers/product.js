import Product from '../models/product'

export const create = async (req, res) => {
    try {
        const product = await new Product(req.body).save();
        res.json(product)
    } catch (error) {
        res.json({
            msg: "Khong them duoc san pham"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const product = await Product.find().exec();
        res.json(product)
    } catch (error) {
        res.json({
            msg: "Khong tim duoc san pham"
        })
    }
}

export const get = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const product = await Product.findOne(condition).exec();
        res.json(product)
    } catch (error) {
        res.json({
            msg: "Khong tim duoc san pham"
        })
    }
}

export const remove = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const product = await Product.findOneAndRemove(condition).exec();
        res.json(product)
    } catch (error) {
        res.json({
            msg: "Khong xoa duoc san pham"
        })
    }
}

export const update = async (req, res) => {
    const condition = {_id: req.params.id}
    const doc = req.body
    try {
        const product = await Product.findOneAndUpdate(condition, doc).exec();
        res.json(product)
    } catch (error) {
        res.json({
            msg: "Khong cap nhat duoc san pham"
        })
    }
}

export const search = async (req,res) => {
    const value = req.query.q
    try {
        const products = await Product.find({$text :{$search: value}}).exec()
        res.json(products)
    } catch (error) {
        res.status(400).json({
            message: "khong co du lieu"
        })
    }
}

export const limit = async (req, res) => {
    const valueLimit = req.query.limit
    try {
        const productsLimit = await Product.find().limit(valueLimit).exec();
        res.json(
            productsLimit
        )
    } catch (error) {
        res.status(400).json({
            message: "Khong hien thi duoc"
        })
    }
}

export const sort = async (req, res) => {
    const valueSort = req.query.sort
    const limit = req.query.limit
    try {
        const productsSort = await Product.find().sort({price: valueSort}).limit(limit).exec();
        res.json(
            productsSort
        )
    } catch (error) {
        res.status(400).json({
            message: "Khong hien thi duoc"
        })
    }
}