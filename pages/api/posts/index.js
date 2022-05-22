import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../db";

export default async function getAllPosts(req, res) {

  try {
    const data = await db.any("SELECT * FROM posts")
    res.json(data)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send({error: error})
  }
}
