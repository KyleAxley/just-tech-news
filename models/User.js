//dependacies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create our user model
class User extends Model {}

//define/set up table columns and configuration
User.init(
  {
    //define an id column
    id: {
      //use the special sequelize Datatypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this is equivalent of SQL's `NOT NULL` option
      allowNull: false,
      //instruct that this is the Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define a user coulmn
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define an email coumn
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email vaules in this table
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    //define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means teh password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    //pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    //don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name or database table
    freezeTableName: true,
    //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
