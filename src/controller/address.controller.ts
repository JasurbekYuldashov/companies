import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { CompanyService } from '../service/company.service';
import { ResponseDto } from '../dto/ResponseDto';
import { AddressService } from '../service/address.service';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseDto> {
    return this.addressService.getAll();
  }

  @Post('addNew')
  async addNew(@Body() body: any): Promise<ResponseDto> {
    return this.addressService.addNew(body);
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.addressService.getOne(id);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<ResponseDto> {
    return this.addressService.update(id, body);
  }
}
