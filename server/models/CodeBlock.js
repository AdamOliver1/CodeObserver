const mongoose = require('mongoose');
const { Schema } = mongoose;

const codeBlockSchema = new Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    solution: { type: String, required: true, unique: true }

}, { timestamps: true });

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

module.exports = CodeBlock;

