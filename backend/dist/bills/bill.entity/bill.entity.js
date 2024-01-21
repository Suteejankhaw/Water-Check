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
exports.BillEntity = void 0;
const land_entity_1 = require("../../lands/land.entity/land.entity");
const user_entity_1 = require("../../users/user.entity/user.entity");
const typeorm_1 = require("typeorm");
let BillEntity = class BillEntity {
};
exports.BillEntity = BillEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], BillEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillEntity.prototype, "cost_value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillEntity.prototype, "unit_value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillEntity.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], BillEntity.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => land_entity_1.LandEntity),
    __metadata("design:type", land_entity_1.LandEntity)
], BillEntity.prototype, "land", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], BillEntity.prototype, "collector", void 0);
exports.BillEntity = BillEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bills' })
], BillEntity);
//# sourceMappingURL=bill.entity.js.map