import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../dto/ResponseDto';
import addressCreate from '../validation/address.validation';

const { address } = new PrismaClient();

@Injectable()
export class AddressService {
  async getAll(): Promise<any> {
    const response = new ResponseDto();
    const data = await address
      .findMany({
        include: { company: true },
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
    const data = await address
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
    const data = await address
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

  async addNew(body?: any): Promise<any> {
    const response = new ResponseDto();
    const { error, value } = addressCreate.validate(body);
    let data: any;
    if (!error) {
      data = await address
        .create({
          data: {
            company_id: value?.company_id,
            address: value.address,
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
