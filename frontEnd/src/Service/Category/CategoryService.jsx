
import { client } from '../Serivce'

let linkApi = 'category/'

const getCategory = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

const addCategory = async (data) => {
    const response = (await client.post(linkApi, data))
    return await response.data;
}
const updateCategory = async (idCategory, data) => {
    console.log(data);
    let urlCategory = linkApi + idCategory
    const response = (await client.put(urlCategory, data))
    return await response.data
}
const deleteCategory = async (idCategory) => {
    try {
        let urlCategory = linkApi + idCategory
        const response = await client.delete(urlCategory, idCategory)
        return await response.data
    }
    catch (err) {
        console.log(err);
    }

}


export { getCategory, addCategory, updateCategory, deleteCategory }