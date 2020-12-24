import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Please provide the phone number.'],
  },
  address: {
    type: String,
    required: [true, 'Please provide the address.'],
  },
  created_at: {
    type: Date,
    required: [true],
  },
  updated_at: {
    type: Date,
    required: [true],
  },
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
