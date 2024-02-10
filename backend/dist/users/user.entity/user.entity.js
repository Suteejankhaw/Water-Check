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
exports.AdminEntity = exports.CollectorEntity = exports.UserEntity = void 0;
const bill_entity_1 = require("../../bills/bill.entity/bill.entity");
const land_entity_1 = require("../../lands/land.entity/land.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phone_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "Image_iD", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => land_entity_1.LandEntity, (land) => land.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "lands", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
let CollectorEntity = class CollectorEntity extends UserEntity {
};
exports.CollectorEntity = CollectorEntity;
__decorate([
    (0, typeorm_1.OneToMany)(() => bill_entity_1.BillEntity, (bill) => bill.collector),
    __metadata("design:type", Array)
], CollectorEntity.prototype, "bill", void 0);
exports.CollectorEntity = CollectorEntity = __decorate([
    (0, typeorm_1.Entity)()
], CollectorEntity);
let AdminEntity = class AdminEntity extends UserEntity {
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.OneToMany)(() => bill_entity_1.BillEntity, (bill) => bill.collector),
    __metadata("design:type", Array)
], AdminEntity.prototype, "bills", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)()
], AdminEntity);
//# sourceMappingURL=user.entity.js.map