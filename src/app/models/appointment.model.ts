

import { Model, Column, DataType, ForeignKey, BelongsTo, HasMany, Table } from 'sequelize-typescript';
import internal from 'stream';
import { number } from 'werift/lib/rtp/src/container/ebml';


@Table({
  tableName: "appointment",
  timestamps: false
})

export class Appointment extends Model {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false })
  id?: number;
  @Column({ type: DataType.INTEGER, allowNull: true, })
  doctor_id?: number;
  @Column({ type: DataType.STRING, allowNull: true, })
  date?: string;
  @Column({ type: DataType.STRING, allowNull: true, })
  hours?: string;
  @Column({ type: DataType.BOOLEAN, allowNull: true, })
  is_appointment?: boolean;
  @Column({ type: DataType.BOOLEAN, allowNull: true, })
  is_received?: boolean;
  @Column({ type: DataType.INTEGER, allowNull: true })
  user_id?: number;

}



export class AppointmentModel extends Model{
  doctor_username?: string;
  user_username?: string;
  date?: string;
  hours?: string;
  is_appointment?: boolean;
  is_received?: boolean;
}