import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
    tableName: "books",
    timestamps: false
})

export class Book extends Model {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
    id?: number;

    @Column({ type: DataType.STRING, allowNull: true})
    title?: string;

    @Column({ type: DataType.STRING, allowNull: true})
    content?: string;

    @Column({ type: DataType.STRING, allowNull: true})
    summary?: string;

    @Column({ type: DataType.STRING, allowNull: true})
    writer?: string;

    @Column({ type: DataType.STRING, allowNull: true})
    image: any;

    @Column({ type: DataType.STRING, allowNull: true})
    created_at?: any;
}

class BookModel extends Model {
    title?: string;
    content?: string;
    summary?: string;
    writer?: string;
    image?: string;
    created_at?: string;
}
