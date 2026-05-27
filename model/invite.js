const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema(
  {
    inviter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    projectName: {
      type: String,
      trim: true,
      default: 'CreatorOS Collaboration',
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired'],
      default: 'pending',
    },
    message: {
      type: String,
      trim: true,
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const MongooseInviteModel = mongoose.model('Invite', inviteSchema);

const emptyInviteQuery = {
  sort() {
    return this;
  },
  limit() {
    return this;
  },
  lean() {
    return Promise.resolve([]);
  },
  then(resolve, reject) {
    return Promise.resolve([]).then(resolve, reject);
  },
};

const MockInviteModel = {
  countDocuments: async () => 0,
  findOne: async () => null,
  findByIdAndDelete: async () => null,
  find: () => emptyInviteQuery,
};

const InviteModel =
  process.env.USE_MOCK_DB === "true"
    ? MockInviteModel
    : MongooseInviteModel;

module.exports = InviteModel;
