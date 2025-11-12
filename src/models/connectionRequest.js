const moongose = require("mongoose");

const connectionRequestSchema = new moongose.Schema(
  {
    fromUserId: {
      type: moongose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: moongose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  { timestamps: true }
);

const ConnectionRequestModel = new moongose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;