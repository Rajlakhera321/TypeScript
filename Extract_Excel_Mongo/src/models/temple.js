const {Schema, model} = require("mongoose");

const templeSchema = new Schema({
    templeName: {
        type: Schema.Types.String
    },
    image: {
        type: Schema.Types.String
    },
    location: {
        type: Schema.Types.String
    },
    coordinates: {
        type: Schema.Types.Array
    },
    totalMembers: {
        type: Schema.Types.String
    },
    totalPrayers: {
        type: Schema.Types.Number
    }
},{timestamps: true});

module.exports = model('temple', templeSchema, 'temple');