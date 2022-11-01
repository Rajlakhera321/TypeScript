import { Request, Response } from "express";
import userModel from "../models/users";
import { createUser,findAndUpdate,deleteUser,findUser } from "../service/user.service";

const addDetail = async(req: Request, res: Response) => {

    const myData = await createUser({name: "xyz",dept: "abc"})
    res.json({
        message: "Home page data",
        myData: myData
    })
}

const homeDetail = async(req: Request, res: Response) => {
    const myData = await findUser({_id: '634538167afc902faebf0a5d'}) 
    res.json({
        message: "Detail found",
        myData: myData
    })
}

const updateDetail = async(req: Request, res: Response) => {
    const myData = await findAndUpdate({name:"xyz"},{name: "hari"},{new: true})
    res.json({
        message: "Detail Updated",
        myData: myData
    })
}

const deleteDetail = async(req: Request, res: Response) => {
    const myData = await deleteUser({_id: '634538167afc902faebf0a5d'}) 
    res.json({
        message: "Detail deleted",
        myData: myData
    })
}


export {
    addDetail,
    homeDetail,
    updateDetail,
    deleteDetail
}