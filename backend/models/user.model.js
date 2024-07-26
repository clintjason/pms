//const models = require('../models');
module.exports = (sequelizeConnection, DataTypes) => {
    const User = sequelizeConnection.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        avatar: {
          type: DataTypes.STRING
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        timestamps: true,
      });

      User.associate = function(models) {
        User.hasOne(models.Patient, { foreignKey: 'patient_id' });
        User.hasOne(models.Doctor, { foreignKey: 'doctor_id' });
        User.hasMany(models.Message, { as: 'SentMessages', foreignKey: 'sender_id' });
        User.hasMany(models.Message, { as: 'ReceivedMessages', foreignKey: 'receiver_id' });
        User.hasMany(models.Notification, { foreignKey: 'user_id' });
        User.hasMany(models.Session, { foreignKey: 'user_id' });
        User.hasMany(models.MonitoringSession, { foreignKey: 'user_id' });
      };
      return User;
    };