import db from "../../../db"

export default async (req, res) => {
  try {

    const postFromFront = JSON.parse(req.body);
    const {author, text, date, title} = postFromFront;
    const dbPost = await db.any(
      'INSERT INTO posts (author, text, date, title) VALUES($1, $2, $3, $4)',
      [author, text, date, title]
      );

    res.status(200).json({
      isSuccess: true
    })
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,true")

  } catch (error) {
    res.status(500).send({isSuccess: false, error: error})
  }
}
