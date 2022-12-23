const {Schema, model} = require("mongoose");

const professionSchema = new Schema({
    profession: {
        type: Schema.Types.String,
    },
    professionType: [{
        isPreDefined: {
            type: Schema.Types.String,
            enum: [true, false],
            default: false
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        }
    }]
},{timestamps: true});

module.exports = model('profession', professionSchema, 'profession');