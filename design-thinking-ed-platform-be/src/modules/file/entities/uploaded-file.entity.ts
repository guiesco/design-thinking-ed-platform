import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FileStepType {
  PROTOTYPE = 'PROTOTYPE',
  CONCLUSION = 'CONCLUSION',
}

@Entity()
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  storedName: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column({ nullable: true })
  groupId: number;

  @Column({
    type: 'enum',
    enum: FileStepType,
    default: FileStepType.PROTOTYPE,
  })
  stepType: FileStepType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
