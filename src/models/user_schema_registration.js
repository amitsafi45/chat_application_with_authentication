export default(sequelize,DataTypes)=>{
    const schema=sequelize.define('user_account',{
        UserName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        emailAddress:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true 
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true 

        }
           })
    return schema
}