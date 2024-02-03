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
exports.LandController = void 0;
const common_1 = require("@nestjs/common");
const land_entity_1 = require("./land.entity/land.entity");
const lands_service_1 = require("./lands.service");
let LandController = class LandController {
    constructor(landService) {
        this.landService = landService;
    }
    async findAll() {
        return this.landService.findAll();
    }
    async findById(id) {
        const land = await this.landService.findById(id);
        if (!land) {
            throw new common_1.NotFoundException(`Land with ID ${id} not found.`);
        }
        return land;
    }
    async create(land) {
        return this.landService.create(land);
    }
    async update(id, land) {
        return this.landService.update(id, land);
    }
    async delete(id) {
        await this.landService.delete(id);
    }
};
exports.LandController = LandController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [land_entity_1.LandEntity]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, land_entity_1.LandEntity]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "delete", null);
exports.LandController = LandController = __decorate([
    (0, common_1.Controller)('lands'),
    __metadata("design:paramtypes", [lands_service_1.LandService])
], LandController);
//# sourceMappingURL=lands.controller.js.map