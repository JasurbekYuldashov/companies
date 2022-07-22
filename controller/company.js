const { PrismaClient } = require("@prisma/client");
const { companyCreate } = require("../validation/company");
const { company, address } = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const query = req.query;
    const getQuery = {
      status: query.status,
      type: query.type,
    };
    !getQuery.status && delete getQuery.status;
    !getQuery.type && delete getQuery.type;
    company
      .findMany({
        where: getQuery,
        include: {
          address: true,
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
    company
      .findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          address: true,
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
    company
      .update({
        where: {
          id: +req.params.id,
        },
        data: req.body,
        include: {
          address: true,
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
    const { error, value } = companyCreate.validate(data);
    if (!error) {
      company
        .create({
          data: {
            name: value.name,
            type: value.type,
            status: value.status,
          },
        })
        .then(async (result) => {
          address
            .create({
              data: {
                company_id: result.id,
                address: value.address,
              },
            })
            .then((address) => {
              delete address.company_id;
              res.status(200).send({
                code: 200,
                result: {
                  ...result,
                  address: address,
                },
                message: "ok",
              });
            })
            .catch((error) => {
              res.status(404).send({ code: 404, error, message: error.message });
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
