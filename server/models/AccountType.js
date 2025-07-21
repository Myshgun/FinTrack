const { Schema, model } = require("mongoose");

const accountTypeSchema = new Schema({
	type: { type: String, required: true },
	description: { type: String, required: true },
	isActive: { type: Boolean, default: true },
});

accountTypeSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

module.exports = model("AccountType", accountTypeSchema);
