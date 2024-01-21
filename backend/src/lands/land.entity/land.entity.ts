import { BillEntity } from "src/bills/bill.entity/bill.entity";
import { UserEntity } from "src/users/user.entity/user.entity";
import { Column, Entity, Generated, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity({ name: 'Lands' })
export class LandEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({nullable : false})
    meter_no: string;

    @OneToMany(() => BillEntity, (bill) => bill.land)
    bill: BillEntity[]

    @ManyToOne(() => UserEntity, (user) => user.lands)
    user: UserEntity;
}
