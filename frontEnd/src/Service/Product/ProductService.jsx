import { client } from '../Serivce'

let linkApi = 'product/'

const getProduct = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

export { getProduct }