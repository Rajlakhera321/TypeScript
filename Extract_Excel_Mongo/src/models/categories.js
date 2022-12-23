const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    category: {
        type: Schema.Types.String,
    },
    definition: {
        type: Schema.Types.String
    },
    frequency: {
        type: Schema.Types.String
    }
},{timestamps: true});

module.exports = model('categories', categorySchema, 'categories');