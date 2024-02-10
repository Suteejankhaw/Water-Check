import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, CollectorEntity, AdminEntity } from 'src/users/user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';
import { BillEntity } from 'src/bills/bill.entity/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
 constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CollectorEntity)
    private collectorsRepository: Repository<CollectorEntity>,
    @InjectRepository(AdminEntity)
    private adminsRepository: Repository<AdminEntity>,
    @InjectRepository(LandEntity)
    private landsRepository: Repository<LandEntity>,
    @InjectRepository(BillEntity)
    private billsRepository: Repository<BillEntity>,
 ) {}

 async seed() {
  // Define seed data for users
  const users = Array.from({ length: 10 }, (_, i) => ({
     username: `User${i}`,
     password: `Password${i}`,
     phone_no: `${1234567890 + i}`,
     Image_iD: `${i}`,
     role: 'User',
  }));
 
  const collectors = Array.from({ length: 6 }, (_, i) => ({
     username: `Collector${i}`,
     password: `Password${i}`,
     phone_no: `${1234567890 + i + 10}`, // Start after the regular users
     Image_iD: `${i}`,
     role: 'Collector',
  }));
 
  const admins = Array.from({ length: 2 }, (_, i) => ({
     username: `Admin${i}`,
     password: `Password${i}`,
     phone_no: `${1234567890 + i + 16}`, // Start after the collectors
     Image_iD: `${i}`,
     role: 'Admin',
  }));
 
  // Combine all users into a single array
  const allUsers = [...users, ...collectors, ...admins];
 
  // Save users to the database
  const savedUsers = await this.usersRepository.save(allUsers);
 
  // Define seed data for lands and bills
  const landsAndBills = Array.from({ length: 20 }, (_, i) => ({
     meter_no: `Meter${i}`,
     Image_iD: `${i}`,
     userId: i + 1, // Assuming users are created first and IDs increment sequentially
     bills: [{
       cost_value: `${Math.floor(Math.random() * 100)}`,
       unit_value: `${Math.floor(Math.random() * 10)}`,
       month: `Month${i}`,
       dateTime: new Date(),
     }],
  }));
 
  // Create lands and bills associated with each user
  for (let i = 0; i < landsAndBills.length; i++) {
     const land = new LandEntity();
     land.meter_no = landsAndBills[i].meter_no;
     land.Image_iD = landsAndBills[i].Image_iD;
     land.user = savedUsers[i % savedUsers.length]; // Cycle through users
 
     const bill = new BillEntity();
     bill.cost_value = landsAndBills[i].bills[0].cost_value;
     bill.unit_value = landsAndBills[i].bills[0].unit_value;
     bill.month = landsAndBills[i].bills[0].month;
     bill.dateTime = landsAndBills[i].bills[0].dateTime;
     bill.land = land; // Associate the bill with the land
     bill.collector = savedUsers[i % savedUsers.length]; // Cycle through users
 
     await this.landsRepository.save(land);
     await this.billsRepository.save(bill);
  }
 
  console.log('Users, lands, and bills seeded successfully');
 }
 
}
