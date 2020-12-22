import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: [true, 'Please provide a name for this pet.'],
    },
    address: {
      type: String,
      required: [true, 'Please provide a name for this pet.'],
    },
    created_at: {
      type: Date,
      required: [true],
    },
    updated_at: {
      type: Date,
      required: [true],
    },
  }
  // { _id: false }
);

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
