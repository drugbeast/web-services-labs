const db = require('../db')

class ClubController {
  async getClubs(req, res) {
    const users = await db.query(`SELECT * FROM club`)
    res.json(users.rows)
  }

  async createClub(req, res){
    const {name, country, coach, estdate} = req.body
    const newClub = await db.query(`INSERT INTO club (name, country, coach, estdate) VALUES ($1, $2, $3, $4) RETURNING *`, [name, country, coach, estdate])
    res.json(newClub.rows[0])
  }

  async deleteClub(req, res) {
    const {id} = req.body
    const result = await db.query(`DELETE FROM club WHERE id = $1`, [id])
    res.json(result)
  }

  async updateClub(req, res) {
    const {id} = req.body
    const fieldsToUpdate = req.body; 

    const setClause = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      setClause.push(`${key} = $${i}`);
      values.push(value);
      i++;
    }
  
    values.push(id);
  
    const query = `UPDATE club SET ${setClause.join(', ')} WHERE id = $${i} RETURNING *`;
  
    const result = await db.query(query, values);

    res.json(result.rows)
  }
}

module.exports = new ClubController()