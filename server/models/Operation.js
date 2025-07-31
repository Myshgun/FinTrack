const { Schema, model, Types } = require("mongoose");

const operationSchema = new Schema(
	{
		account: { type: Types.ObjectId, ref: "Account", required: true },
		amount: { type: Number, required: true },
		date: {
			type: Date,
			required: true,
			set: function (date) {
				if (typeof date === "string") {
					const [day, month, year] = date.split(".");
					return new Date(year, month - 1, day);
				}
				return date;
			},
		},
		category: {
			type: Types.ObjectId,
			ref: "OperationCategory",
			required: true,
		},
		description: { type: String, maxlength: 200 },
		owner: { type: Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

operationSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.owner;

		ret.date = doc.date.toISOString().split("T")[0];
	},
});

module.exports = model("Operation", operationSchema);
