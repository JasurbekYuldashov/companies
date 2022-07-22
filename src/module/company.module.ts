import { Module } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CompanyController } from '../controller/company.controller';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
