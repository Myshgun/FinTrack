const { Schema, model, Types } = require("mongoose");

const accountSchema = new Schema(
	{
		name: { type: String, required: true },
		type: { type: Types.ObjectId, ref: "AccountType", required: true },
		balance: { type: Number, default: 0 },
		owner: { type: Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

accountSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.owner;
	},
});

module.exports = model("Account", accountSchema);
