import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { TenantsModule } from './modules/user-management/tenants/tenants.module'
import { UsersModule } from './modules/user-management/users/users.module'

@Module({
  imports: [ConfigModule, DatabaseModule, TenantsModule, UsersModule],
})
export class AppModule {}
