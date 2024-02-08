import { getUserByIDModel } from "../models/userModel.js";

export async function getUserByIDController(req, res) {
  const user = await getUserByIDModel(req.params.id);
  res.status(200).send(user);
}
