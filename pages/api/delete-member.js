import { query } from '../../utils/mysql';
import dbConnect from '../../utils/mongodb';
import MemberMongodb from '../../models/MemberMongodb';

const handler = async (req, res) => {
  const { id, member_id } = req.query;

  try {
    if (!id || !member_id) {
      return res.status(400).json({ message: '`id` and `member_id` required' });
    }

    // delete data mysql
    const resultsMysql = await query(
      `
      DELETE FROM member
      WHERE id = ?
  `,
      parseInt(id, 10)
    );

    // delete data mongodb
    await dbConnect();
    const resultsMongodb = await MemberMongodb.deleteOne({ _id: member_id });

    res.json(resultsMysql, resultsMongodb);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
