"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./routers/users");
const db_1 = __importDefault(require("./config/db"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, db_1.default)();
app.use('/', users_1.router);
app.listen(port, () => console.log(`This index is running on port number: ${port}`));
