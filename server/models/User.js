const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: false, default: "" },
		lastName: { type: String, required: false, default: "" },
		middleName: { type: String, required: false, default: "" },
		phoneNumber: { type: String, required: false, default: "" },
		photoUrl: {
			type: String,
			default:
				"https://www.manageengine.com/images/speaker-placeholder.png",
		},
		roleId: { type: Number, required: true, default: 1 },
		isActive: { type: Boolean, default: true },
		accounts: [{ type: Types.ObjectId, ref: "Account" }],
	},
	{ timestamps: true }
);

userSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

module.exports = model("User", userSchema);
