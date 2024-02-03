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
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bill_entity_1 = require("./bill.entity/bill.entity");
let BillsService = class BillsService {
    constructor(billRepository) {
        this.billRepository = billRepository;
    }
    async findAll() {
        return this.billRepository.find({});
    }
    async findById(id) {
        return this.billRepository.findOne({
            where: { id: id },
        });
    }
    async create(bill) {
        return this.billRepository.save(bill);
    }
    async update(id, bill) {
        await this.billRepository.update(id, bill);
        return this.billRepository.findOne({ where: { id: id } });
    }
    async delete(id) {
        await this.billRepository.delete(id);
    }
    async createMultipleBills(billsData) {
        const bills = billsData.map((data) => this.billRepository.create(data));
        return this.billRepository.save(bills);
    }
};
exports.BillsService = BillsService;
exports.BillsService = BillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bill_entity_1.BillEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BillsService);
//# sourceMappingURL=bills.service.js.map