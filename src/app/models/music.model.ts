import { Model, Column, DataType, ForeignKey, BelongsTo, HasMany, Table } from 'sequelize-typescript';




@Table({
  tableName: 'music',
  timestamps: false,
})
export class Music extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING, allowNull:true})
  title?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  content?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  url?:string;
  @HasMany(()=>LikeMusic)
  likes?:LikeMusic[];


}

@Table({
  tableName: 'podcast',
  timestamps: false,
})

export class Podcast extends Model {
  @Column({ primaryKey: true, autoIncrement: true,  type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING, allowNull:true})
  title?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  content?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  podcast_path?:string;
  @Column({ type: DataType.STRING, allowNull:true})
  created_at?: string

 @HasMany(()=>LikePodcast)
  likes?:LikePodcast[];
}


@Table({
  tableName: 'likepodcast',
  timestamps: false,
})
export class LikePodcast extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: true, type:DataType.INTEGER})
  id?: number;
  @Column({ type: DataType.INTEGER, allowNull:true})
  like_id?: number;
  @ForeignKey(()=>Podcast)
  @Column({ type: DataType.INTEGER, allowNull:true})
  item_id?: number;
  
  @BelongsTo(()=>Podcast)
  podcast?:Podcast;
}


@Table({
  tableName: 'likemusic',
  timestamps: false,
})
export class LikeMusic extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type:DataType.INTEGER})
  id?: number;
  @Column({ type: DataType.INTEGER, allowNull:true})
  like_id?: number;
  @ForeignKey(()=>Music)
  @Column({ type: DataType.INTEGER, allowNull:true})
  item_id?: number;
  @BelongsTo(()=>Music)
  music?:Music;
}