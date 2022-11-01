import { DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions } from "mongoose";
import user, {UserDocument} from '../models/users';

export function createUser(input:DocumentDefinition<UserDocument>){
    return user.create(input);
}

export function findUser(query:FilterQuery<UserDocument>,options:QueryOptions={lean:true}){
    return user.find(query,{},options);
}

export function findAndUpdate(
    query:FilterQuery<UserDocument>,
    update:UpdateQuery<UserDocument>,
    options:QueryOptions
){
    return user.findOneAndUpdate(query,update,options);
}

export function deleteUser(
    query:FilterQuery<UserDocument>
){
    return user.deleteOne(query);
}
