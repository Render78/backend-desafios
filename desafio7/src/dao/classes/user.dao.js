import userModel from "../models/user.model.js"

export default class User {
    getUsers = async () => {
        try {
            let users = await userModel.find()
            return users
        } catch (error) {
            console.error(error)
            return null
        }
    }
}