import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ResponseDto } from '../dto/ResponseDto';
import { EmployeeService } from '../service/employee.service';
import { EmployeeStatus } from '@prisma/client';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseDto> {
    return this.employeeService.getAll();
  }

  @Post('addNew')
  async addNew(@Body() body: any): Promise<ResponseDto> {
    return this.employeeService.addNew(body);
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.employeeService.getOne(id);
  }

  @Put('updateStatusOnly/:id')
  async updateStatus(
    @Param('id') id: number,
    @Query('status') status: EmployeeStatus,
  ): Promise<ResponseDto> {
    return this.employeeService.updateStatus(id, status);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<ResponseDto> {
    return this.employeeService.update(id, body);
  }
}

