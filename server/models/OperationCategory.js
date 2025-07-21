const { Schema, model } = require("mongoose");

const operationCategorySchema = new Schema({
	type: { type: String, required: true },
	description: { type: String, required: true },
	direction: { type: String, required: true },
	color: { type: String, required: true },
	isActive: { type: Boolean, default: true },
});

operationCategorySchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

module.exports = model("OperationCategory", operationCategorySchema);
