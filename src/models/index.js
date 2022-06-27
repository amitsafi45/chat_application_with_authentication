import Sequelize, { DataTypes } from 'sequelize'
import schema from './user_schema_registration.js'
const sequelize=new Sequelize(process.env.DB_NAME,process.env.USER_NAME,process.env.PASSWORD,{
     host:process.env.HOST,
     dialect:process.env.DIALECT,
     pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    define:{
       timestamps:false,
       freezeTableName:true
    }
})
const db={}
 db.Sequelize=Sequelize
 db.sequelize=sequelize
 db.schema=schema(sequelize,DataTypes)
 export default db