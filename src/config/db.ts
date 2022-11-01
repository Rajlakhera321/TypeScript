import mongoose,{connect} from 'mongoose';
require('dotenv').config();


function connects(){
    return connect('mongodb+srv://Rajlakhera:Rajlakhera@cluster0.32vdd.mongodb.net/typescript?retryWrites=true&w=majority')
    .then(()=> {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    })
}

export default connects;