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
exports.LandEntity = void 0;
const bill_entity_1 = require("../../bills/bill.entity/bill.entity");
const user_entity_1 = require("../../users/user.entity/user.entity");
const typeorm_1 = require("typeorm");
let LandEntity = class LandEntity {
};
exports.LandEntity = LandEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], LandEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], LandEntity.prototype, "meter_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LandEntity.prototype, "Image_iD", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bill_entity_1.BillEntity, (bill) => bill.land),
    __metadata("design:type", Array)
], LandEntity.prototype, "bill", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.lands),
    __metadata("design:type", user_entity_1.UserEntity)
], LandEntity.prototype, "user", void 0);
exports.LandEntity = LandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Lands' })
], LandEntity);
//# sourceMappingURL=land.entity.js.map