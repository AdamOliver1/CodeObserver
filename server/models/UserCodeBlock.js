const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCodeBlockSchema = new Schema({
   token: { type: String }
}, { timestamps: true });

const UserCodeBlock = mongoose.model("UserCodeBlock", userCodeBlockSchema);

module.exports = UserCodeBlock;

