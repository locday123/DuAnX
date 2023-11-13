import { client } from '../Serivce'

let linkApi = 'product/'

const getProduct = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data;``
    } catch (err) {
        console.log(err);
    }
}
const addProduct = async (data) => {
    const response = (await client.post(linkApi, data))
    return await response.data;
}

const updateProduct = async (idProduct, data) => {
    let urlProduct = linkApi + idProduct
    const response = (await client.put(urlProduct, data))
    return await response.data
}

const updateProduct2 = async (idProduct, images, data) => {
    const Form = new FormData()
    if (Object.keys(images).length != 0) {
        Form.append("uploadImages", images.imagesAccount)
    }
    Form.append("data", JSON.stringify(data))
    let urlProduct = linkApi + idProduct
    const response = (await client.put(urlProduct, Form))
    return await response.data
}

const deleteProduct = async (idProduct) => {
    try {
        let urlProduct = linkApi + idProduct
        const response = await client.delete(urlProduct, idProduct)
        return await response.data
    }
    catch (err) {
        console.log(err);
    }

}

export { getProduct, addProduct, deleteProduct, updateProduct, updateProduct2 }