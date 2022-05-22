import db from "../../db";

export default async function getComments(req, res) {
  const post_id = req.query.id;
  try {
    const data = await db.any("SELECT * FROM comments where post_id=$1", [post_id])
    res.json(data)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send({error: error})
  }
}
