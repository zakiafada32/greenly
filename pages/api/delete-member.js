import { query } from '../../utils/mysql';
import dbConnect from '../../utils/mongodb';
import MemberMongodb from '../../models/MemberMongodb';

const handler = async (req, res) => {
  const { id, memberId } = req.query;

  try {
    if (!id || !memberId) {
      return res.status(400).json({ message: '`id` and `memberId` required' });
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
    const resultsMongodb = await MemberMongodb.deleteOne({ _id: memberId });

    res.json(resultsMysql, resultsMongodb);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
