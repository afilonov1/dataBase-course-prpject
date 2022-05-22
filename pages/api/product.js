import db from "../../db"
const pgp = require('pg-promise')({
  noWarnings: true
})

// const db = pgp("next_db://admin:admin@localhost:5432/next_db_project")
export default async (req, res) => {
  try {
    // const { name, price,  imageUrl, description } = req.query
    //
    // if(!name || !price || !imageUrl || !description){
    //   return res.status(422).send({error: ['Missing one or more fields']})
    // }
    const name = "1", price = "2", imageUrl = "3", description = "4";
    const values  = [name, price, imageUrl, description];
    console.log(values)
    // const product = await db.one('INSERT INTO products(name, price, image_url, description) VALUES($1, $2, $3, $4) RETURNING *', values)
    // const product = await db.one('INSERT INTO products(name, image_url, description) VALUES($2, $1, $3) RETURNING *', [name, price, description])
    const product = await db.any('SELECT * FROM products');

    res.status(200).json(product)
    // res.status(228).send({message: ["Error creating on the server"], error: error})

  } catch (error) {
    // console.error(error);
    res.status(500).send({error: error})
  }
}
