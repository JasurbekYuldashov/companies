const { PrismaClient } = require("@prisma/client");
const { addressCreate } = require("../validation/address");
const {  address } = new PrismaClient();

const getAll = async (req, res) => {
  try {
    address
      .findMany({
        include: {
          company: true,
        },
      })
      .then((data) => {
        res.status(200).send({ code: 200, result: data, message: "ok" });
      })
      .catch((error) => {
        res.status(404).send({ code: 404, error, message: error.message });
      });
  } catch (error) {
    res.status(500).send({ code: 500, error, message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    console.log(req.params.id);
    address
      .findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          company: true,
        },
      })
      .then((data) => {
        res.status(200).send({ code: 200, result: data, message: "ok" });
      })
      .catch((error) => {
        res.status(404).send({ code: 404, error, message: error.message });
      });
  } catch (error) {
    res.status(500).send({ code: 500, error, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    console.log(req.params.id);
    address
      .update({
        where: {
          id: +req.params.id,
        },
        data: req.body,
        include: {
          company: true,
        },
      })
      .then((data) => {
        res.status(200).send({ code: 200, result: data, message: "ok" });
      })
      .catch((error) => {
        res.status(404).send({ code: 404, error, message: error.message });
      });
  } catch (error) {
    res.status(500).send({ code: 500, error, message: error.message });
  }
};

const addNew = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = addressCreate.validate({
      address: data.address,
      company_id: data.company_id,
    });
    if (!error) {
      address
        .create({
          data: {
            company_id: value.company_id,
            address: value.address,
          },
          include:{
            company: true,
          }
        })
        .then((address) => {
          res.status(200).send({
            code: 200,
            result: address,
            message: "ok",
          });
        })
        .catch((error) => {
          res.status(404).send({ code: 404, error, message: error.message });
        });
    } else {
      res.status(404).send({ code: 404, error, message: error.message });
    }
  } catch (error) {
    res.status(500).send({ code: 500, error, message: error.message });
  }
};

module.exports = {
  getAll,
  addNew,
  getOne,
  update,
};
