import {NextApiRequest, NextApiResponse} from "next";


export default function queryPosts(req: NextApiRequest, res: NextApiResponse) {
  res.json({id: req.query.id, msg: "bebra"})
}
