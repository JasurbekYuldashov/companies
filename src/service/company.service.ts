import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../dto/ResponseDto';
import companyCreate from '../validation/company.validation';

const { company, address } = new PrismaClient();

interface QueryInterface {
  status?: string;
  type?: string;
}

@Injectable()
export class CompanyService {
  async getAll(query: QueryInterface): Promise<any> {
    const response = new ResponseDto();
    const getQuery: any = {
      status: query.status,
      type: query.type,
    };
    !getQuery.status && delete getQuery.status;
    !getQuery.type && delete getQuery.type;
    const data = await company
      .findMany({
        where: getQuery,
        include: {
          address: true,
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
    const data = await company
      .findUnique({
        where: {
          id: +id,
        },
        include: {
          address: true,
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
    const data = await company
      .update({
        where: {
          id: +id,
        },
        data: body,
        include: {
          address: true,
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

  async addNew(body?: any): Promise<any> {
    const response = new ResponseDto();
    const { error, value } = companyCreate.validate(body);
    let data: any;
    let result: any;
    if (!error) {
      result = await company
        .create({
          data: {
            name: value.name,
            type: value.type,
            status: value.status,
          },
        })
        .catch((error) => {
          throw new HttpException(
            { statusCode: 404, error, message: error.message },
            HttpStatus.NOT_FOUND,
          );
        });
      data = await address.create({
        data: {
          company_id: result.id,
          address: value.address,
        },
      });
    } else {
      throw new HttpException(
        { statusCode: 404, error, message: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
    response.statusCode = 200;
    response.result = {
      ...result,
      address: data,
    };
    response.message = 'ok';
    return response;
  }
}
