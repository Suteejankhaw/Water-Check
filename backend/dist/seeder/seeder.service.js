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
        const conUnit = 7;
        const realNames = [
            'John', 'Jane', 'Michael', 'Emily', 'Robert', 'Linda', 'William', 'Patricia', 'James', 'Elizabeth',
        ];
        const generateUsername = (index, baseName) => {
            return `${baseName}${index}`;
        };
        const users = Array.from({ length: 10 }, (_, i) => ({
            username: generateUsername(i, realNames[i % realNames.length]),
            fullname: realNames[i % realNames.length] + ' Doe',
            password: `Password${i}`,
            phone_no: `${1234567890 + i}`,
            role: 'User',
        }));
        const collectors = Array.from({ length: 3 }, (_, i) => ({
            username: generateUsername(i + 10, realNames[(i + 10) % realNames.length]),
            fullname: realNames[(i + 10) % realNames.length] + ' Smith',
            password: `Password${i}`,
            phone_no: `${1234567890 + i + 10}`,
            role: 'Collector',
        }));
        const admins = Array.from({ length: 2 }, (_, i) => ({
            username: generateUsername(i + 13, realNames[(i + 13) % realNames.length]),
            fullname: realNames[(i + 13) % realNames.length] + ' Miller',
            password: `Password${i}`,
            phone_no: `${1234567890 + i + 13}`,
            role: 'Admin',
        }));
        const allUsers = [...users, ...collectors, ...admins];
        const savedUsers = await this.usersRepository.save(allUsers);
        const totalUsersWithLands = allUsers.length;
        const landsAndBills = Array.from({ length: totalUsersWithLands }, (_, i) => {
            const land = new land_entity_1.LandEntity();
            land.meter_no = `Meter${i}`;
            land.user = savedUsers[i];
            land.address = `24/7 somewhere Thailand Zipcode 99999`;
            const numBills = Math.floor(Math.random() * 6) + 5;
            const bills = Array.from({ length: numBills }, () => {
                const date = new Date();
                date.setMonth(Math.floor(Math.random() * 12));
                const monthName = date.toLocaleString('default', { month: 'long' });
                return {
                    cost_value: Math.floor(Math.random() * 100),
                    unit_value: conUnit,
                    month: monthName,
                    dateTime: date.toISOString(),
                };
            });
            return { land, bills };
        });
        for (const { land, bills } of landsAndBills) {
            await this.landsRepository.save(land);
            for (const billData of bills) {
                const bill = new bill_entity_1.BillEntity();
                bill.cost_value = billData.cost_value;
                bill.unit_value = billData.unit_value;
                bill.month = billData.month;
                bill.dateTime = new Date(billData.dateTime);
                bill.land = land;
                bill.collector = savedUsers[Math.floor(Math.random() * savedUsers.length)];
                const dateForMonth = new Date(bill.dateTime);
                dateForMonth.setDate(1);
                dateForMonth.setFullYear(2020 + Math.floor(Math.random() * 4));
                bill.month = dateForMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
                await this.billsRepository.save(bill);
            }
        }
        console.log('Users, lands, and bills seeded successfully');
        console.log('Users, lands, and bills seeded successfully');
        const newUsers = [
            {
                username: 'alex',
                fullname: 'Alex Smith',
                password: 'AlexPassword',
                phone_no: '1234567890',
                role: 'User',
            },
            {
                username: 'alisa',
                fullname: 'Alisa Johnson',
                password: 'AlisaPassword',
                phone_no: '1234567891',
                role: 'User',
            },
        ];
        const savedNewUsers = await this.usersRepository.save(newUsers);
        for (const newUser of savedNewUsers) {
            const land = new land_entity_1.LandEntity();
            land.meter_no = `Meter${newUser.id}`;
            land.user = newUser;
            land.address = `99/1 forest road field 2 Alien Earth 22222`;
            await this.landsRepository.save(land);
            for (let j = 0; j < 2; j++) {
                const bill = new bill_entity_1.BillEntity();
                bill.cost_value = Math.floor(Math.random() * 100);
                bill.unit_value = conUnit;
                bill.month = j === 0 ? 'January2024' : 'February2024';
                bill.dateTime = new Date(2024, j, 1);
                bill.land = land;
                bill.collector = savedUsers[Math.floor(Math.random() * savedUsers.length)];
                await this.billsRepository.save(bill);
            }
        }
        console.log('Additional users, lands, and bills seeded successfully');
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