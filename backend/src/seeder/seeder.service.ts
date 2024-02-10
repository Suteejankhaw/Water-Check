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
  ) { }

  async seed() {
    const conUnit = 7;
    const realNames = [
      'John', 'Jane', 'Michael', 'Emily', 'Robert', 'Linda', 'William', 'Patricia', 'James', 'Elizabeth',
      // Add more names as needed
    ];

    const generateUsername = (index, baseName) => {
      return `${baseName}${index}`;
    };

    const users = Array.from({ length: 10 }, (_, i) => ({
      username: generateUsername(i, realNames[i % realNames.length]),
      fullname: realNames[i % realNames.length] + ' Doe',
      password: `Password${i}`,
      phone_no: `${1234567890 + i}`,
      role: 'User',
    }));

    const collectors = Array.from({ length: 3 }, (_, i) => ({
      username: generateUsername(i + 10, realNames[(i + 10) % realNames.length]),
      fullname: realNames[(i + 10) % realNames.length] + ' Smith',
      password: `Password${i}`,
      phone_no: `${1234567890 + i + 10}`,
      role: 'Collector',
    }));

    const admins = Array.from({ length: 2 }, (_, i) => ({
      username: generateUsername(i + 13, realNames[(i + 13) % realNames.length]),
      fullname: realNames[(i + 13) % realNames.length] + ' Miller',
      password: `Password${i}`,
      phone_no: `${1234567890 + i + 13}`,
      role: 'Admin',
    }));

    const allUsers = [...users, ...collectors, ...admins];
    const savedUsers = await this.usersRepository.save(allUsers);

    // Define seed data for lands and bills
    const totalUsersWithLands = allUsers.length;
    const landsAndBills = Array.from({ length: totalUsersWithLands }, (_, i) => {
      // Each user will have one land
      const land = new LandEntity();
      land.meter_no = `Meter${i}`;
      land.user = savedUsers[i]; // Assign the land to the corresponding user
      land.address = `24/7 somewhere Thailand Zipcode 99999`;

      // Generate a random number of bills between  5 and  10 for each land
      const numBills = Math.floor(Math.random() * 6) + 5; // Random number between  5 and  10
      const bills = Array.from({ length: numBills }, () => {
        const date = new Date();
        date.setMonth(Math.floor(Math.random() * 12)); // Random month
        const monthName = date.toLocaleString('default', { month: 'long' });

        return {
          cost_value: Math.floor(Math.random() * 100),
          unit_value: conUnit,
          month: monthName,
          dateTime: date.toISOString(), // Format the date as a readable string
        };
      });

      return { land, bills };
    });

    // Save the lands and their associated bills
    for (const { land, bills } of landsAndBills) {
      await this.landsRepository.save(land);
      for (const billData of bills) {
        const bill = new BillEntity();
        bill.cost_value = billData.cost_value;
        bill.unit_value = billData.unit_value;
        bill.month = billData.month;
        bill.dateTime = new Date(billData.dateTime); // Convert the string back to a Date object
        bill.land = land;
        bill.collector = savedUsers[Math.floor(Math.random() * savedUsers.length)]; // Random collector

        // Set the bill.month to a formatted string like "January   2023"
        const dateForMonth = new Date(bill.dateTime);
        dateForMonth.setDate(1); // Set the day to the first of the month
        dateForMonth.setFullYear(2020 + Math.floor(Math.random() * 4)); // Set the year to a random value between  2020 and  2023
        bill.month = dateForMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

        await this.billsRepository.save(bill);
      }
    }

    // ... (existing code)

    console.log('Users, lands, and bills seeded successfully');

// ... (existing code)

console.log('Users, lands, and bills seeded successfully');

// Create two new users with common real names
const newUsers = [
  {
    username: 'alex',
    fullname: 'Alex Smith',
    password: 'AlexPassword',
    phone_no: '1234567890',
    role: 'User',
  },
  {
    username: 'alisa',
    fullname: 'Alisa Johnson',
    password: 'AlisaPassword',
    phone_no: '1234567891',
    role: 'User',
  },
];
const savedNewUsers = await this.usersRepository.save(newUsers);

// Create a land and two bills for each new user with bill.month set to January and February   2024
for (const newUser of savedNewUsers) {
  const land = new LandEntity();
  land.meter_no = `Meter${newUser.id}`;
  land.user = newUser;
  land.address = `99/1 forest road field 2 Alien Earth 22222`;
  await this.landsRepository.save(land);

  for (let j =   0; j <   2; j++) {
    const bill = new BillEntity();
    bill.cost_value = Math.floor(Math.random() *   100);
    bill.unit_value = conUnit;
    bill.month = j ===   0 ? 'January2024' : 'February2024'; // Set the month to January or February   2024
    bill.dateTime = new Date(2024, j,   1); // Create a Date object for January or February   2024
    bill.land = land;
    bill.collector = savedUsers[Math.floor(Math.random() * savedUsers.length)]; // Random collector

    await this.billsRepository.save(bill);
  }
}

console.log('Additional users, lands, and bills seeded successfully');

  }
}
