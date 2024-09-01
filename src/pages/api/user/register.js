import User from "../model/user";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

export default async function register(req, res) {
  try {
    if (req.method == "POST") {
      const body = req.body;
      const user = await User.findOne({ where: { email: body.email } });
      if (user) {
        return res.status(400).send({
          message: "email has been registered",
        });
      }
      const emailFormat =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!body.email.match(emailFormat)) {
        return res.status(400).send({
          message: "wrong email format",
        });
      }
      if (body.password !== body.repassword) {
        return res.status(400).send({
          message: "password not match",
        });
      }
      await User.create({
        ...body,
        id: v4(),
        password: bcrypt.hashSync(body.password, 10),
      });
      res.send({ message: "success" });
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
