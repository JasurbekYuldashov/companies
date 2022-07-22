import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, EmployeeStatus } from '@prisma/client';
import { ResponseDto } from '../dto/ResponseDto';
import employeeCreate from '../validation/employee.validation';

const { employee } = new PrismaClient();

@Injectable()
export class EmployeeService {
  async getAll(): Promise<any> {
    const response = new ResponseDto();
    const data = await employee
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
    const data = await employee
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
    const data = await employee
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

  async updateStatus(id: any, status: EmployeeStatus): Promise<any> {
    const response = new ResponseDto();
    let bool = false;
    switch (status) {
      case EmployeeStatus.block:
      case EmployeeStatus.active: {
        bool = true;
        break;
      }
    }
    let data;
    if (bool) {
      data = await employee
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

  async addNew(body?: any): Promise<any> {
    const response = new ResponseDto();
    const { error, value } = employeeCreate.validate(body);
    let data: any;
    if (!error) {
      data = await employee
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
