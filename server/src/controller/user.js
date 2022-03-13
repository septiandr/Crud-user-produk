// import model here
const { user } = require("../../models");

exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "success",
      message: "Add User Success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Get Users Success",
      data:{
        users
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const update ={
      ...data,
    }
    await user.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await user.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "Update Success",
      data: {
        user: updatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Delete Success",
      data:{
        id:id
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
