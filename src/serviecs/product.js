import Product from "../models/product";
import { lookup, unwind } from "../utils/utility";

export const getProducts = async (option) => {
    const { pagination, filter, textSearch, sort } = option;
    
    console.log('getProduct Service', pagination);
    const pipeline = [
        lookup('categories', 'category', '_id', 'category'),
        unwind('$category', true),
        {
            $addFields: {
                status: {
                    $switch: {
                        branches: [
                            {
                                // status key isConnected for products => current no have isConnected
                                case: { $eq: ['$category.name', 'Balo'] },
                                then: 'Success'
                            },
                            {
                                case: { $eq: ['$category.isConnected', false] },
                                then: 'Fail'
                            },
                            {
                                case: { $eq: ['$category', []]},
                                then: 'Not Connect'
                            }
                        ],
                        default: 'Not Connect'
                    }
                }
            }
        },
    ]

    // sort
    if(sort){
        pipeline.push({
            $sort: {
                createdAt: +sort
            }
        })
    }

    const data = await Product.aggregate(pipeline);
    const _total = data.length 

    // filter
    if(filter.isActive){
        pipeline.push({
            $match: {
                property: filter.isActive
            }
        })
    }

    // search
    if(textSearch) {
        pipeline.push({
            $match: {
                name: {
                    $regex: textSearch,
                    $options: 'i'
                }
            }
        })
    }

    // // pagination
    if(pagination){
        pipeline.push(
            {
                $skip: pagination.page * pagination.limit - pagination.limit
            },
            {
                $limit: pagination.limit
            }
        )
    }
  
    pipeline.push({
        $project: {
            category: {
                updatedAt: 0,
                __v: 0
            },
        }
    })

    const products = await Product.aggregate(pipeline);
    const total = products.length
    return { products, total, _total }
}

export const detailProduct = async (_id) => {
    return await Product.findOne(_id)
}

export const updateProduct = async (_id, update) => {
    await Product.findOneAndUpdate(_id, update);
    return await Product.findOne(_id);
}

export const deleteProduct = async (_id) => {
    return await Product.findOneAndDelete(_id) 
}

export const createProduct = async (product) => {
    const newProduct = new Product(product);
    return newProduct.save()
}