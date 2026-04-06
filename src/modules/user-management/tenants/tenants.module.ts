import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tenant } from './tenants.model';

@Module({
  imports: [SequelizeModule.forFeature([Tenant])],
  exports: [SequelizeModule],
})
export class TenantsModule {}
