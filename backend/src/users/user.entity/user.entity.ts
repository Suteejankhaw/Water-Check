import { BillEntity } from "src/bills/bill.entity/bill.entity";
import { LandEntity } from "src/lands/land.entity/land.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    phone_no: string;

    @Column({ nullable: true })
    role: string;
    
    @OneToMany(() => LandEntity, (land) => land.user)
    lands: LandEntity[];
  
  }
  
  @Entity()
  export class collectorEntity extends UserEntity {
      @OneToMany(() => BillEntity, (bill) => bill.collector)
      bill: BillEntity[]
  }
  
  @Entity()
  export class AdminEntity extends UserEntity {
      @OneToMany(() => BillEntity, (bill) => bill.collector)
      bills: BillEntity[];
  }

  
