import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity/user.entity';
import { LandsModule } from './lands/lands.module';
import { BillsModule } from './bills/bills.module';
import { LandEntity } from './lands/land.entity/land.entity';
import { BillEntity } from './bills/bill.entity/bill.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'water_watch_DB',
      entities: [UserEntity, LandEntity, BillEntity],
      synchronize: true,
      dropSchema: true,
    }),
    LandsModule,
    BillsModule,],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
