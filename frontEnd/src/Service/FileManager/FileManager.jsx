import { client } from '../Serivce'

let linkApi = 'file-manager/';
const getFolder = async (path) => {
    const urlGet = linkApi
    try {
        const response = await client.post(linkApi, path)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

export { getFolder }
