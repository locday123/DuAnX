
import { client } from '../Serivce'

let linkApi = 'storage/'

const getStorage = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

const addStorage = async (data) => {
    const response = (await client.post(linkApi, data))
    return await response.data;
}
const deleteStorage = async (idStorage) => {
    try {
        let urlStorage = linkApi + idStorage
        const response = await client.delete(urlStorage, idStorage)
        return await response.data
    }
    catch (err) {
        console.log(err);
    }

}
export { getStorage, addStorage, deleteStorage }