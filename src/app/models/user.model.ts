import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "user",
    timestamps: false,
})
export class UserModel extends Model {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
    id?: number;

    @Column({ allowNull: false, type: DataType.STRING })
    token?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    username?: string;

    @Column({ allowNull: true, type: DataType.STRING })
    avatar?: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    age?: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    gender?: number;

    @Column({ allowNull: false, type: DataType.STRING })
    joined_at?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    password?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    email?: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    is_patient?: boolean;
}

export class LoginModel extends Model {
    email?: string;
    password?: string;
}

// TODO: Taslak model sen bi yine de bakarsın
export class RegisterModel extends Model {
    username?: string;
    email?: string;
    password?: string;
    age?: string;
    gender?: string;
}
