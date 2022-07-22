import { Module } from '@nestjs/common';
import { WarehouseController } from '../controller/warehouse.controller';
import { WarehouseService } from '../service/warehouse.service';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
