
import { client } from '../Serivce'

let linkApi = 'account/'

const getAccount = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

const getAccountID = async (userID) => {
    try {
        const linkEdit = linkApi + userID
        const response = await client.get(linkEdit, userID)
        return await response.data
    } catch (err) {
        console.log(err);
    }
}

const addAccount = async (data) => {
    const response = (await client.post(linkApi, data))
    return await response.data;
}


const updateAccount = async (userID, images, data) => {
    const Form = new FormData()
    Form.append("imagesAccount", images.imagesAccount, "user_" + userID + ".jpg")
    Form.append("data", JSON.stringify(data))
    let urlUser = linkApi + userID
    const response = (await client.put(urlUser, Form))
    return await response.data
}
const deleteAccount = async (userID) => {
    try {
        let urlUser = linkApi + userID
        const response = await client.delete(urlUser, userID)
        return await response.data
    }
    catch (err) {
        console.log(err);
    }

}

export { getAccount, getAccountID, addAccount, deleteAccount, updateAccount }