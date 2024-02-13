import { successResponse } from "../Red/responses.js";
import { getUserByIDModel } from "../models/userModel.js";

export async function getUserByIDController(req, res) {
  const user = await getUserByIDModel(req.params.id);
  successResponse(req, res, user);
}
