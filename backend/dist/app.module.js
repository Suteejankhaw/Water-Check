"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/user.entity/user.entity");
const lands_module_1 = require("./lands/lands.module");
const bills_module_1 = require("./bills/bills.module");
const land_entity_1 = require("./lands/land.entity/land.entity");
const bill_entity_1 = require("./bills/bill.entity/bill.entity");
const seeder_module_1 = require("./seeder/seeder.module");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                ignoreEnvFile: false,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: configService.get('DATABASE_PASSWORD', ''),
                    database: configService.get('DATABASE_USEd', 'water_watch_db'),
                    entities: [user_entity_1.UserEntity, land_entity_1.LandEntity, bill_entity_1.BillEntity],
                    synchronize: true,
                    dropSchema: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            lands_module_1.LandsModule,
            bills_module_1.BillsModule,
            seeder_module_1.SeederModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map