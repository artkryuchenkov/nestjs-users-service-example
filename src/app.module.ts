import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectorModule } from './modules/db-connector/db-connector.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbConnectorModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
