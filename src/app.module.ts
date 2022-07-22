import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CompanyModule } from './module/company.module';
import { AddressModule } from './module/address.module';
import { WarehouseModule } from './module/warehouse.module';
import { EmployeeModule } from './module/employee.module';

@Module({
  imports: [
    CompanyModule,
    AddressModule,
    WarehouseModule,
    EmployeeModule,
    RouterModule.register([
      {
        path: 'company',
        module: CompanyModule,
      },
      {
        path: 'address',
        module: AddressModule,
      },
      {
        path: 'warehouse',
        module: WarehouseModule,
      },
      {
        path: 'employee',
        module: EmployeeModule,
      },
    ]),
  ],
})
export class AppModule {}
