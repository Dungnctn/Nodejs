export const lookup = (from, localField, foreignField, as) => {
    return {
        $lookup: {
            from,
            localField,
            foreignField,
            as
        }
    }
}
 
export const unwind = (path, preserveNullAndEmptyArrays = false) => {
    return {
        $unwind: {
            path,
            preserveNullAndEmptyArrays,
        }
    }
}

export const checkEnum = (type, enums) => {
    return Object.values(enums).includes(type)
}