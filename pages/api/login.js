import db from "../../db"

export default async (req, res) => {
  try {

    const userDataFromFront = JSON.parse(req.body);
    const dbUsers = await db.any('SELECT * FROM users');
    let exist = false;
    let role;
    let name;
    let login;
    dbUsers.forEach(dbUser => {
      if (dbUser.login === userDataFromFront.login && dbUser.password === userDataFromFront.password) {
        exist = true;
        role = dbUser.role;
        name = dbUser.name;
        login = dbUser.login;
      }
    })
    res.status(200).json({
      isAuth: exist,
      role: role || "",
      name: name || "",
      login: login || "",
    })
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,true")

  } catch (error) {
    res.status(500).send({error: error})
  }
}
