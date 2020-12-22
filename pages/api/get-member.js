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
      updated_at: 'desc',
    });

    const mergedResult = resultsMysql.map((item, idx) =>
      Object.assign({}, item, resultsMongodb[idx]._doc)
    );

    const sortResult = mergedResult.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    console.log(sortResult);

    return res.json(sortResult);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;