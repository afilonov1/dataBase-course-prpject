import db from "../../../db"

export default async (req, res) => {
  try {

    const idFromFront = JSON.parse(req.body);
    console.log(idFromFront)

    await db.none(
      'DELETE FROM comments WHERE post_id=$1; DELETE FROM posts WHERE id=$1',
      [idFromFront]
    );
    const posts = await db.any(
      'SELECT * FROM posts',
      [idFromFront]
    );
    res.status(200).json({
      isSuccess: true,
      posts
    })
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,true")

  } catch (error) {
    res.status(500).send({isSuccess: false, error: error})
  }
}
