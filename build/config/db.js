"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require('dotenv').config();
function connects() {
    return (0, mongoose_1.connect)('mongodb+srv://Rajlakhera:Rajlakhera@cluster0.32vdd.mongodb.net/typescript?retryWrites=true&w=majority')
        .then(() => {
        console.log("DB connected successfully");
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.default = connects;
