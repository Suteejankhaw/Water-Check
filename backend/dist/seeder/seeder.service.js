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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity/user.entity");
const land_entity_1 = require("../lands/land.entity/land.entity");
const bill_entity_1 = require("../bills/bill.entity/bill.entity");
const typeorm_2 = require("typeorm");
let SeederService = class SeederService {
    constructor(usersRepository, collectorsRepository, adminsRepository, landsRepository, billsRepository) {
        this.usersRepository = usersRepository;
        this.collectorsRepository = collectorsRepository;
        this.adminsRepository = adminsRepository;
        this.landsRepository = landsRepository;
        this.billsRepository = billsRepository;
    }
    async seed() {
        const users = Array.from({ length: 10 }, (_, i) => ({
            username: `User${i}`,
            password: `Password${i}`,
            phone_no: `${1234567890 + i}`,
            role: 'User',
        }));
        const collectors = Array.from({ length: 6 }, (_, i) => ({
            username: `Collector${i}`,
            password: `Password${i}`,
            phone_no: `${1234567890 + i + 10}`,
            role: 'Collector',
        }));
        const admins = Array.from({ length: 2 }, (_, i) => ({
            username: `Admin${i}`,
            password: `Password${i}`,
            phone_no: `${1234567890 + i + 16}`,
            role: 'Admin',
        }));
        const allUsers = [...users, ...collectors, ...admins];
        const savedUsers = await this.usersRepository.save(allUsers);
        const landsAndBills = Array.from({ length: 20 }, (_, i) => ({
            meter_no: `Meter${i}`,
            Image_iD: `${i}`,
            userId: i + 1,
            bills: [{
                    cost_value: `${Math.floor(Math.random() * 100)}`,
                    unit_value: `${Math.floor(Math.random() * 10)}`,
                    month: `Month${i}`,
                    dateTime: new Date(),
                }],
        }));
        for (let i = 0; i < landsAndBills.length; i++) {
            const land = new land_entity_1.LandEntity();
            land.meter_no = landsAndBills[i].meter_no;
            land.Image_iD = landsAndBills[i].Image_iD;
            land.user = savedUsers[i % savedUsers.length];
            const bill = new bill_entity_1.BillEntity();
            bill.cost_value = landsAndBills[i].bills[0].cost_value;
            bill.unit_value = landsAndBills[i].bills[0].unit_value;
            bill.month = landsAndBills[i].bills[0].month;
            bill.dateTime = landsAndBills[i].bills[0].dateTime;
            bill.land = land;
            bill.collector = savedUsers[i % savedUsers.length];
            await this.landsRepository.save(land);
            await this.billsRepository.save(bill);
        }
        console.log('Users, lands, and bills seeded successfully');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.CollectorEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.AdminEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(land_entity_1.LandEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(bill_entity_1.BillEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map