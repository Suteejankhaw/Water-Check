import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For creating of the test data
  const seeder = app.get(SeederService);
  await seeder.seed();
  console.log('Data seeded successfully');

  await app.listen(5000);
}
bootstrap();
