import mysql, { RowDataPacket } from "mysql2"


 const con = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  }
);

con.connect( function(err) {
 if(err) throw err;
  console.log("Connected successfully!");
});


con.query('SELECT * FROM `user` WHERE `name` = "Page"', function(err:mysql.RowDataPacket[],result:mysql.RowDataPacket[],field:mysql.RowDataPacket[]){
  if(err) throw err;
  console.log(result.forEach((value:mysql.RowDataPacket)=>{
    console.log(value);
  }));
});
//example query simple
export default con;