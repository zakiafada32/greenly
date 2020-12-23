import mongoose from 'mongoose';
import { query } from '../../utils/mysql';
import dbConnect from '../../utils/mongodb';
import MemberMongodb from '../../models/MemberMongodb';

const handler = async (req, res) => {
  const { name, phone, address } = req.body;
  const _id = new mongoose.Types.ObjectId();

  try {
    // add data mysql
    if (!name || !phone || !address) {
      return res.status(400).json({ message: 'Please fill the form' });
    }

    const resultsMysql = await query(
      `
      INSERT INTO member (member_id, name, created_at, updated_at)
      VALUES (?, ?, ?, ?)
      `,
      [_id.toString(), name, new Date(), new Date()]
    );

    // add data mongodb
    await dbConnect();
    const resultsMongodb = await MemberMongodb.create({
      _id,
      phone,
      address,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.json({ resultsMysql, resultsMongodb });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
