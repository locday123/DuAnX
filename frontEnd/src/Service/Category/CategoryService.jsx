
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


export { getCategory }