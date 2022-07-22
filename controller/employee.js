const {
  PrismaClient,
  WarehouseStatus,
  EmployeeStatus,
} = require("@prisma/client");
const { employeeCreate } = require("../validation/employee");
const prisma = new PrismaClient();
const { warehouse, employee } = prisma;

const getAll = async (req, res) => {
  try {
    const query = req.query;
    const getQuery = {
      status: query.status,
      company_id: +query.companyId,
    };
    !getQuery.status && delete getQuery.status;
    !getQuery.company_id && delete getQuery.company_id;
    employee
      .findMany({
        where: getQuery,
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
    employee
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
    employee
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

const updateStatus = async (req, res) => {
  try {
    const status = req.query.status;
    let bool = false;

    switch (status) {
      case EmployeeStatus.block:
      case EmployeeStatus.active: {
        bool = true;
        break;
      }
    }

    if (bool) {
      employee
        .update({
          where: {
            id: +req.params.id,
          },
          data: {
            status: status,
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
    } else {
      res
        .status(404)
        .send({ code: 404, error: {}, message: "not correct variable" });
    }
  } catch (error) {
    res.status(500).send({ code: 500, error, message: error.message });
  }
};

// const inactiveWarehouses = async (req, res) => {
//   try {
//     const arr = req.body.id.map((item) =>
//       warehouse.update({
//         where: { id: item },
//         data: { status: WarehouseStatus.inactive },
//       })
//     );
//     prisma
//       .$transaction(arr)
//       .then((data) => {
//         res.status(200).send({ code: 200, result: data, message: "ok" });
//       })
//       .catch((error) => {
//         res.status(404).send({ code: 404, error, message: error.message });
//       });
//   } catch (error) {
//     res.status(500).send({ code: 500, error, message: error.message });
//   }
// };

const addNew = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = employeeCreate.validate(data);
    if (!error) {
      employee
        .create({
          data: value,
          include: { company: true },
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
  updateStatus
};
