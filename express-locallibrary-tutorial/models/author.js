const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
    return `${this.family_name}, ${this.first_name}`;
});

AuthorSchema.virtual('url').get(function () {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('formatted_lifespan').get(function () {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}`
})

module.exports =  mongoose.model('Author', AuthorSchema);
