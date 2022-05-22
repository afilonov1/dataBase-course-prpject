import db from "../../db";

export default async function getPost(req, res) {
  const id = req.query.id;
  console.log(id)
  try {
    const data = await db.one("SELECT * FROM posts where id=$1", [id])
    res.json(data)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send({error: error})
  }
}
