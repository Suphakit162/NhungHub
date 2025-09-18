const { Admins, Movies, Users } = require('../models');

// เช็คว่าผู้ใช้เป็น admin หรือไม่
async function checkAdmin(name, password) {
  const admin = await Admins.findOne({
    where: { name, password }
  });
  return !!admin;
}

// ดูข้อมูลลงตารางตามที่ระบุ
exports.getallData = async (req, res) => {
  try {
    const { name, password, table } = req.body;

    const isAdmin = await checkAdmin(name, password);
    if (!isAdmin) return res.status(403).json({ error: 'Unauthorized: not admin' });

    let result;
    if (table === 'Movies') {
        result = await Movies.findAll();
    } else if (table === 'Users') {
        result = await Users.findAll();
    } else {
        return res.status(400).json({ error: 'Invalid table name' });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// เพิ่มข้อมูลในตารางตามที่ระบุ
exports.addData = async (req, res) => {
  try {
    const { name, password, table, data } = req.body;

    const isAdmin = await checkAdmin(name, password);
    if (!isAdmin) return res.status(403).json({ error: 'Unauthorized: not admin' });

    let result;
    if (table === 'Movies') {
      result = Array.isArray(data)
        ? await Movies.bulkCreate(data)
        : await Movies.create(data);
    } else if (table === 'Users') {
      result = Array.isArray(data)
        ? await Users.bulkCreate(data)
        : await Users.create(data);
    } else {
      return res.status(400).json({ error: 'Invalid table' });
    }

    res.json({ message: 'Data added', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// {
//   "username": "nhunghub",
//   "password": "nhunghub6789",
//   "table": "Movies",
//   "data": {
//     "name": "Inception",
//     "image": "poster.jpg",
//     "rating": 5
//     "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//     "genres": ["Sci-Fi", "Action"],
//     "reviews": ["Amazing movie!", "Mind-blowing visuals!"],
//
//   }
// }


// ลบข้อมูล
exports.deleteData = async (req, res) => {
  try {
    const { name, password, table } = req.body;
    const { id } = req.params;

    const isAdmin = await checkAdmin(name, password);
    if (!isAdmin) return res.status(403).json({ error: 'Unauthorized: not admin' });

    let result;
    if (table === 'Movies') {
        result = await Movies.destroy({ where: { id } });
    } else if (table === 'Users') {
        result = await Users.destroy({ where: { id } });
    } else {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    
    res.json({ message: 'Data deleted', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  

