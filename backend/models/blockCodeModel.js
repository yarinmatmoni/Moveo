const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  code: {
    type: "string",
    required: true,
  },
  href: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("CodeBlock", codeBlockSchema);
