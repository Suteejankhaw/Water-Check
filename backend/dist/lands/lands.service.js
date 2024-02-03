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
exports.LandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const land_entity_1 = require("./land.entity/land.entity");
let LandsService = class LandsService {
    constructor(landRepository) {
        this.landRepository = landRepository;
    }
    async findAll() {
        return this.landRepository.find({});
    }
    async findById(id) {
        return this.landRepository.findOne({
            where: { id: id },
        });
    }
    async create(land) {
        return this.landRepository.save(land);
    }
    async update(id, land) {
        await this.landRepository.update(id, land);
        return this.landRepository.findOne({ where: { id: id } });
    }
    async delete(id) {
        const billsCount = await this.landRepository.count({
            where: { id },
        });
        if (billsCount > 0) {
            console.error(`Pls delete all Bill in land ID ${id}.`);
            return;
        }
        await this.landRepository.delete(id);
        console.log(`success delete Land ID ${id}.`);
    }
    async createMultipleLands(landsData) {
        const lands = landsData.map((data) => this.landRepository.create(data));
        return this.landRepository.save(lands);
    }
};
exports.LandsService = LandsService;
exports.LandsService = LandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_entity_1.LandEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LandsService);
//# sourceMappingURL=lands.service.js.map