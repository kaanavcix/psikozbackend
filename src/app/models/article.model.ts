import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';




@Table({
  tableName: "article"
  , timestamps: false
})

export class Article extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING, allowNull: true })
  title?: string;
  @Column({ type: DataType.STRING, allowNull: true })
  content?: string;
  @Column({ type: DataType.STRING, allowNull: true })
  image?: string;
  @Column({ type: DataType.STRING, allowNull: true })
  writer?: string
  @Column({ type: DataType.INTEGER, allowNull: true })
  created_at?: any;

  @Column({ type: DataType.INTEGER, allowNull: true })
  category_id?: number;
  @HasMany(() => ArticleLike)
  likes?: ArticleLike[];
}


@Table({
  tableName: "categoryarticle"
  , timestamps: false
})
export class CategoryArticle extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING })
  name?: CategoryArticle;



}



@Table({
  tableName: "articlelike",
  timestamps: false
})


export class ArticleLike extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false,autoIncrement:true,primaryKey:true,})
  id?: number;

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, allowNull: false })
  article_id?: number;

  @BelongsTo(() => Article)
  article?: Article;


  @Column({ type: DataType.INTEGER, allowNull: true, })
  user_id?: number;
}



@Table({
  tableName: "psikoeducation",
  timestamps: false
})

export class PsikoEduction extends Model {


  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id?: number;
  @Column({ type: DataType.STRING, allowNull: false, })
  title?: number;
  @Column({ type: DataType.STRING, allowNull: false, })
  content?: number;
  @Column({ type: DataType.STRING, allowNull: false, })
  subtitle?: number;
  @Column({ type: DataType.INTEGER, allowNull: false, })
  user_id?: number;
}