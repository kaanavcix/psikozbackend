import { table } from "console";
import { Table, Model, DataType, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
    tableName: "book",
    timestamps: false
})

export class Book extends Model {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
    id?: number;

    @Column({ type: DataType.STRING, allowNull: true })
    title?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    content?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    summary?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    writer?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: any;

    @Column({ type: DataType.STRING, allowNull: true })
    created_at?: any;
    @Column({ type: DataType.STRING, allowNull: true })
    variable_id?: string;
    @HasMany(()=>BookLike)
    likes?:BookLike[];


}



@Table({
    tableName: "variable",
    timestamps: false
})

export class BookVariables extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
    id?: number;
    @Column({ type: DataType.STRING, allowNull: true })
    variable_name?: string;




}

class BookModel extends Model {
    title?: string;
    content?: string;
    summary?: string;
    writer?: string;
    image?: string;
    created_at?: string;
    variable_id?: string;
}



@Table({
    tableName: "booklike",
    timestamps: false
})
export class BookLike extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true })
    id?: number;
    @ForeignKey(()=>Book)
    book_id?: number;
    @BelongsTo(()=>Book)
    book?: Book;
    @Column({ type: DataType.INTEGER, allowNull: true })
    user_id?: number;
    
    



}