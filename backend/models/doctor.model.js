module.exports = (sequelizeConnection, DataTypes) => {
    const Doctor = sequelizeConnection.define("Doctor", {
      doctor_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
    });
    Doctor.associate = function(models) {
      Doctor.belongsTo(models.User, { foreignKey: 'doctor_id' });
      //Doctor.hasMany(models.MonitoringSession, { foreignKey: 'doctor_id' });
      Doctor.belongsToMany(models.Patient, {
        through: 'PatientDoctorRelationship',
        foreignKey: 'doctor_id'
      });
    };
    return Doctor;
  };