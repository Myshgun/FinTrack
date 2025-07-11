const { Schema, model, Types } = require("mongoose");

const { transform } = require("./transformer");

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	first_name: { type: String, required: false, default: "" },
	last_name: { type: String, required: false, default: "" },
	middle_name: { type: String, required: false, default: "" },
	phone_number: { type: String, required: false, default: "" },
	registered_at: { type: Date, required: true, default: Date.now },
	updated_at: { type: Date, required: true, default: Date.now },
	photo_url: {
		type: String,
		default: "https://www.manageengine.com/images/speaker-placeholder.png",
	},
	role_id: { type: Number, required: true, default: 1 },
	accounts: [{ type: Types.ObjectId, ref: "Account" }],
});

userSchema.set("toObject", {
	transform,
});

module.exports = model("User", userSchema);
