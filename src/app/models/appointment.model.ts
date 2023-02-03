

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
  is_received?: boolean;
  @Column({ type: DataType.INTEGER, allowNull: true })
  user_id?: number;
  @Column({ type: DataType.INTEGER, allowNull:true})
  post_id?:number;

}



export class AppointmentModel extends Model{
  doctor_username?: string;
  user_username?: string;
  post_id?: number;
  date?: string;
  hours?: string;
  is_appointment?: boolean;
  is_received?: boolean;
}



@Table({
  tableName:"appointmentIsNeed"
  ,timestamps:false
})
export class AppointmentIsNeed extends Model{

  @Column({autoIncrement:true,primaryKey:true,allowNull:false,type:DataType.INTEGER})
  id?:number;
  @Column({allowNull:true,type:DataType.INTEGER})
  user_id?:number;
  @Column({allowNull:true,type:DataType.INTEGER})
  doctor_id?:number;
  @Column({allowNull:true,type:DataType.BOOLEAN})
  isNeeded?:boolean;
  @Column({allowNull:true,type:DataType.INTEGER})
  post_id?:number;

} 


export class AppointmentNeedModel {
  user_id?:number;
  doctor_id?:number;
  post_id?:number;
  isNeeded?:boolean;
  
}