import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity/user.entity';
import { LandsModule } from './lands/lands.module';
import { BillsModule } from './bills/bills.module';
import { LandEntity } from './lands/land.entity/land.entity';
import { BillEntity } from './bills/bill.entity/bill.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
 imports: 
 [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configService.get('DATABASE_PASSWORD', ''),
        database: configService.get('DATABASE_USEd', 'water_watch_db'),
        entities: [UserEntity, LandEntity, BillEntity],
        synchronize: true,
        dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    LandsModule,
    BillsModule,
    SeederModule,
 ],
 controllers: [AppController],
 providers: [AppService, ],
})
export class AppModule {
 constructor(private configService: ConfigService) {}
}
