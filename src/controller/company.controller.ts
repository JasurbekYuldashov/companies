import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { ResponseDto } from '../dto/ResponseDto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('getAll')
  async getAll(@Query() query): Promise<ResponseDto> {
    return this.companyService.getAll(query);
  }

  @Post('addNew')
  async addNew(@Body() body: any): Promise<ResponseDto> {
    return this.companyService.addNew(body);
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.companyService.getOne(id);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<ResponseDto> {
    return this.companyService.update(id, body);
  }
}
