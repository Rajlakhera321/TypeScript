const {Schema, model} = require("mongoose");

const prayerSchema = new Schema({
    templeId: {
        type: Schema.Types.ObjectId,
        ref: 'temple'
    },
    prayerType: {
        type: Schema.Types.String
    }
},{timestamps: true});

module.exports = model('prayer', prayerSchema, 'prayer');