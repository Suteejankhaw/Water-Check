"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seeder_service_1 = require("./seeder/seeder.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const seeder = app.get(seeder_service_1.SeederService);
    await seeder.seed();
    console.log('Data seeded successfully');
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map