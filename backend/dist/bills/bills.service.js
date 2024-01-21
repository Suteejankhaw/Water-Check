"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
let BillsService = class BillsService {
    constructor() {
        this.bills = [];
    }
    createBill(billData) {
        this.bills.push(billData);
    }
    getAllBills() {
        return this.bills;
    }
    getBillById(billId) {
        return this.bills.find((bill) => bill.id === billId);
    }
    updateBill(billId, updatedData) {
        const billIndex = this.bills.findIndex((bill) => bill.id === billId);
        if (billIndex !== -1) {
            this.bills[billIndex] = { ...this.bills[billIndex], ...updatedData };
            return this.bills[billIndex];
        }
        return undefined;
    }
    deleteBill(billId) {
        this.bills = this.bills.filter((bill) => bill.id !== billId);
    }
};
exports.BillsService = BillsService;
exports.BillsService = BillsService = __decorate([
    (0, common_1.Injectable)()
], BillsService);
//# sourceMappingURL=bills.service.js.map