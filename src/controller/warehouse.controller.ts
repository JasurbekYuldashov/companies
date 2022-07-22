import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ResponseDto } from '../dto/ResponseDto';
import { WarehouseService } from '../service/warehouse.service';
import { WarehouseStatus } from '@prisma/client';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('getAll')
  async getAll(@Query() query): Promise<ResponseDto> {
    return this.warehouseService.getAll(query);
  }

  @Post('addNew')
  async addNew(@Body() body: any): Promise<ResponseDto> {
    return this.warehouseService.addNew(body);
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.warehouseService.getOne(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<ResponseDto> {
    return this.warehouseService.update(id, body);
  }

  @Put('updateStatusOnly/:id')
  async updateStatus(
    @Param('id') id: number,
    @Query('status') status: WarehouseStatus,
  ): Promise<ResponseDto> {
    return this.warehouseService.updateStatus(id, status);
  }

  @Post('inactive-warehouses')
  async inactiveWarehouses(@Body() body: any): Promise<ResponseDto> {
    return this.warehouseService.inactiveWarehouses(body);
  }
}
//router.get("/getAll",warehouse.getAll)
// router.post("/addNew",warehouse.addNew)
// router.get("/getOne/:id",warehouse.getOne)
// router.put("/update/:id",warehouse.update)
// router.put("/updateStatusOnly/:id",warehouse.updateStatus)
// router.post("/inactive-warehouses",warehouse.inactiveWarehouses)
