// import model here
const { product } = require("../../models");
const {user} = require('../../models')
exports.addProduct = async (req, res) => {
  try {
    console.log(req.body)
    await product.create(req.body);
    res.send({
      status: "success",
      message: "Add Product Success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await product.findAll({
      include:[{
        model:user,
        as:"user",
        attributes:{
          exclude:["createdAt","updatedAt"],
        }
      }],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await product.findOne({
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
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const update ={
      ...data,
    }
    await product.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await product.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
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
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
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
