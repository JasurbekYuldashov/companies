import { Module } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { AddressController } from '../controller/address.controller';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
