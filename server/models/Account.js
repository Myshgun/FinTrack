const { Schema, model, Types } = require("mongoose");

const accountSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: "User" },
});

accountSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.owner;
	},
});

module.exports = model("Account", accountSchema);
