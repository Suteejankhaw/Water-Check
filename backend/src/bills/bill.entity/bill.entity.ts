import { LandEntity } from "src/lands/land.entity/land.entity";
import { AdminEntity, UserEntity, CollectorEntity } from "src/users/user.entity/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";

@Entity({ name: 'bills' })
export class BillEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    cost_value: number;

    @Column()
    unit_value: number;

    @Column()
    month: string;

    @Column({ nullable: true })
    dateTime: Date;

    @ManyToOne(() => LandEntity)
    land: LandEntity
  
    @ManyToOne(() => UserEntity)
    collector: UserEntity
  
    
}
