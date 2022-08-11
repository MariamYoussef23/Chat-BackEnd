import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamptz" })
  createAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
