const {Schema, model} = require("mongoose");

const ageSchema = new Schema({
    age: {
        type: Schema.Types.String,
    },
},{timestamps: true});

module.exports = model('age', ageSchema, 'age');