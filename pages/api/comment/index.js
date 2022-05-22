import db from "../../../db"

export default async (req, res) => {
  try {
    const id = req.query.id;
    const method = req.method;
    if (method === "DELETE") {
      await db.any(
        'DELETE FROM comments WHERE id=$1',
        [id]
      );
      const comments = await db.any(
        'SELECT * FROM comments',
        [id]
      );
      res.status(200).json({
        isSuccess: true,
        comments: comments
      })
    } else if (method === "POST") {
      const body = JSON.parse(req.body);
      await db.any(
        'INSERT INTO comments (text, author, post_id) VALUES($1, $2, $3)',
        [body.text, body.author, body["post_id"]]
      );
      const comments = await db.any(
        'SELECT * FROM comments',
        [id]
      );
      res.status(200).json({
        isSuccess: true,
        comments: comments.filter(item => item["post_id"] === body["post_id"])
      })
    } else {
      res.status(400).json({
        isSuccess: false,
        error: "Не правильный метод"
      })
    }
    res.status(400).json({
          isSuccess: false,
          error: "Не правильный метод"
        })
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,true")

  } catch (error) {
    res.status(500).send({isSuccess: false, error: error})
  }
}
