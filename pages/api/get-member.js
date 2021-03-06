import { query } from '../../utils/mysql';
import dbConnect from '../../utils/mongodb';
import MemberMongodb from '../../models/MemberMongodb';

const handler = async (_, res) => {
  try {
    // get data mysql
    const resultsMysql = await query(`
      SELECT * FROM member
      ORDER BY updated_at DESC
  `);

    // get data mongodb
    await dbConnect();
    const resultsMongodb = await MemberMongodb.find({}).sort({
      updated_at: -1,
    });

    // merged data mysql and mongodb
    const mergedResult = resultsMysql.map((item, idx) => {
      for (let i = 0; i < resultsMongodb.length; i++) {
        if (item.member_id === resultsMongodb[i]._id.toString()) {
          return Object.assign({}, item, resultsMongodb[i]._doc);
        }
      }
    });

    const sortResult = mergedResult.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return res.status(200).json(sortResult);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
