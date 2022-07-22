const { PrismaClient, WarehouseStatus } = require("@prisma/client");
const { warehouseCreate } = require("../validation/warehouse");
const prisma = new PrismaClient();
const { warehouse } = prisma;

const getAll = async (req, res) => {
  try {
    const query = req.query;
    const getQuery = {
      status: query.status,
      company_id: +query.companyId,
    };
    !getQuery.status && delete getQuery.status;
    !getQuery.company_id && delete getQuery.company_id;
    warehouse
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
    console.log(req.params.id);
    warehouse
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
    warehouse
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
    console.log(req.params.id);
    const status = req.query.status;
    let bool = false;

    switch (status) {
      case WarehouseStatus.inactive:
      case WarehouseStatus.active: {
        bool = true;
        break;
      }
    }

    if (bool) {
      warehouse
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

const inactiveWarehouses = async (req, res) => {
  try {
    // await prisma.$transaction(
    //   users.map((user) =>
    //     prisma.user.upsert({
    //       where: { id: user.id },
    //       update: { name: user.name },
    //       create: user,
    //     })
    //   )
    // );

    const arr = req.body.id.map((item) =>
      warehouse.update({
        where: { id: item },
        data: { status: WarehouseStatus.inactive },
        // create: {
        //   description: "description",
        //   title: "title",
        //   company_id: 12,
        //   status: "active",
        // },
      })
    );
    prisma
      .$transaction(arr)
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
    const { error, value } = warehouseCreate.validate(data);
    if (!error) {
      warehouse
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
  updateStatus,
  inactiveWarehouses,
};
