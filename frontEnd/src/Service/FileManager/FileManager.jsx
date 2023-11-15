import { client } from '../Serivce'

let linkApi = 'file-manager/';
const getAll = async (path) => {
    try {
        const response = await client.get(linkApi)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}
export { getAll }
