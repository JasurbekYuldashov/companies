// const inactiveWarehouses = async (req, res) => {
//   try {
//     // await prisma.$transaction(
//     //   users.map((user) =>
//     //     prisma.user.upsert({
//     //       where: { id: user.id },
//     //       update: { name: user.name },
//     //       create: user,
//     //     })
//     //   )
//     // );
//
//     const arr = req.body.id.map((item) =>
//       warehouse.update({
//         id: {
//           where: { id: item },
//           data: { status: WarehouseStatus.inactive },
//           // create: {
//           //   description: "description",
//           //   title: "title",
//           //   company_id: 12,
//           //   status: "active",
//           // },
//         }
//       })
//     );
//     prisma
//       .$transaction(arr)
//       .then((data) => {
//         res.status(200).send({ statusCode: 200, result: data, message: "ok" });
//       })
//       .catch((error) => {
//         res.status(404).send({ statusCode: 404, error, message: error.message });
//       });
//   } catch (error) {
//     res.status(500).send({ statusCode: 500, error, message: error.message });
//   }
// };

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, WarehouseStatus } from '@prisma/client';
import { ResponseDto } from '../dto/ResponseDto';
import warehouseCreate from '../validation/warehouse.validation';

const prisma = new PrismaClient();
const { warehouse } = prisma;

interface queryInterface {
  status: string;
  companyId: number;
}

@Injectable()
export class WarehouseService {
  async getAll(query?: any): Promise<any> {
    console.log(query);
    const getQuery: any = {
      status: query?.status,
      company_id: +query?.companyId,
    };
    !getQuery.status && delete getQuery.status;
    !getQuery.company_id && delete getQuery.company_id;
    const response = new ResponseDto();
    const data = await warehouse
      .findMany({
        where: getQuery,
        include: {
          company: true,
        },
      })
      .catch((error) => {
        throw new HttpException(
          { statusCode: 404, error, message: error.message },
          HttpStatus.NOT_FOUND,
        );
      });
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }

  async getOne(id?: any): Promise<any> {
    const response = new ResponseDto();
    const data = await warehouse
      .findUnique({
        where: {
          id: +id,
        },
        include: {
          company: true,
        },
      })
      .catch((error) => {
        throw new HttpException(
          { statusCode: 404, error, message: error.message },
          HttpStatus.NOT_FOUND,
        );
      });
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }

  async update(id: any, body: any): Promise<any> {
    const response = new ResponseDto();
    const data = await warehouse
      .update({
        where: {
          id: +id,
        },
        data: body,
        include: {
          company: true,
        },
      })
      .catch((error) => {
        throw new HttpException(
          { statusCode: 404, error, message: error.message },
          HttpStatus.NOT_FOUND,
        );
      });
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }

  async updateStatus(id: any, status: WarehouseStatus): Promise<any> {
    const response = new ResponseDto();
    let bool = false;
    switch (status) {
      case WarehouseStatus.inactive:
      case WarehouseStatus.active: {
        bool = true;
        break;
      }
    }
    let data;
    if (bool) {
      data = await warehouse
        .update({
          where: {
            id: +id,
          },
          data: {
            status,
          },
          include: {
            company: true,
          },
        })
        .catch((error) => {
          throw new HttpException(
            { statusCode: 404, error, message: error.message },
            HttpStatus.NOT_FOUND,
          );
        });
    } else {
      throw new HttpException(
        { statusCode: 404, error: {}, message: 'not correct value' },
        HttpStatus.NOT_FOUND,
      );
    }
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }

  async inactiveWarehouses(body: any): Promise<any> {
    const response = new ResponseDto();
    const arr = body.id.map((item) => {
      return warehouse.update({
        where: { id: item },
        data: { status: WarehouseStatus.inactive },
      });
    });

    const data = await prisma.$transaction(arr).catch((error) => {
      throw new HttpException(
        { statusCode: 404, error, message: error.message },
        HttpStatus.NOT_FOUND,
      );
    });
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }

  async addNew(body?: any): Promise<any> {
    const response = new ResponseDto();
    const { error, value } = warehouseCreate.validate(body);
    let data: any;
    if (!error) {
      data = await warehouse
        .create({
          data: value,
          include: { company: true },
        })
        .catch((error) => {
          throw new HttpException(
            { statusCode: 404, error, message: error.message },
            HttpStatus.NOT_FOUND,
          );
        });
    } else {
      throw new HttpException(
        { statusCode: 404, error, message: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
    response.statusCode = 200;
    response.result = data;
    response.message = 'ok';
    return response;
  }
}
