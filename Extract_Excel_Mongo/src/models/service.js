const {Schema, model} = require("mongoose");

const serviceSchema = new Schema({
    prayerId: {
        type: Schema.Types.ObjectId,
        ref: 'temple'
    },
    firstService: {
        type: Schema.Types.String
    },
    secondService: {
        type: Schema.Types.String
    },
    thirdService: {
        type: Schema.Types.String
    },
    fourthService: {
        type: Schema.Types.String
    },
},{timestamps: true});

module.exports = model('service', serviceSchema, 'service');