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
exports.BillsController = void 0;
const common_1 = require("@nestjs/common");
const bills_service_1 = require("./bills.service");
let BillsController = class BillsController {
    constructor(billsService) {
        this.billsService = billsService;
    }
    getAllBills() {
        return this.billsService.getAllBills();
    }
    getBillById(id) {
        return this.billsService.getBillById(id);
    }
    createBill(billData) {
        this.billsService.createBill(billData);
        return 'Bill created successfully';
    }
    updateBill(id, updatedData) {
        const updatedBill = this.billsService.updateBill(id, updatedData);
        if (updatedBill) {
            return 'Bill updated successfully';
        }
        else {
            return 'Bill not found';
        }
    }
    deleteBill(id) {
        this.billsService.deleteBill(id);
        return 'Bill deleted successfully';
    }
};
exports.BillsController = BillsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BillsController.prototype, "getAllBills", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], BillsController.prototype, "getBillById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "createBill", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "updateBill", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "deleteBill", null);
exports.BillsController = BillsController = __decorate([
    (0, common_1.Controller)('bills'),
    __metadata("design:paramtypes", [bills_service_1.BillsService])
], BillsController);
//# sourceMappingURL=bills.controller.js.map