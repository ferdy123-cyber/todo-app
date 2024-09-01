import User from "../model/user";
import bcrypt from "bcrypt";

export default async function login(req, res) {
  try {
    if (req.method == "POST") {
      const body = req.body;
      const user = await User.findOne({ where: { email: body.email } });
      if (!user) {
        return res.status(400).send({
          message: "email not registered",
        });
      }
      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
        return res.status(400).send({
          message: "wrong password",
        });
      }
      res.send({
        message: "success",
        data: { email: user.email, id: user.id },
      });
    } else {
      return res.status(404).send({
        message: "method not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "error service",
      data: err,
    });
  }
}
