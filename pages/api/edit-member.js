import { query } from '../../utils/mysql';
import dbConnect from '../../utils/mongodb';
import MemberMongodb from '../../models/MemberMongodb';

const handler = async (req, res) => {
  const { id, member_id, name, phone, address } = req.body;
  console.log(req.body);
  try {
    if (!id || !member_id || !name || !phone || !address) {
      return res.status(400).json({
        message:
          '`id`,`member_id`, `name`, `phone`, `address`, and created_at are all required',
      });
    }
    // edit data mysql
    const resultsMysql = await query(
      `
      UPDATE member
      SET name = ?, updated_at = ?
      WHERE id = ?
      `,
      [name, new Date(), parseInt(id, 10)]
    );

    // edit data mongodb
    await dbConnect();
    const resultsMongodb = await MemberMongodb.findByIdAndUpdate(
      member_id,
      {
        phone,
        address,
        updated_at: new Date(),
      },
      {}
    );

    return res.status(200).json(resultsMysql, resultsMongodb);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
