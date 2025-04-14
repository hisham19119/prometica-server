const User = require("../models/user.model");

const getAll = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 200;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
};

module.exports = {
  getAll,
};
