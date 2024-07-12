module.exports = (sequelizeConnection, DataTypes) => {
    const Patient = sequelizeConnection.define("Patient", {
        patient_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        fullname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        },
      });

      Patient.associate = function(models) {
        Patient.belongsTo(models.User, { foreignKey: 'patient_id' });
        Patient.hasMany(models.VitalSign, { foreignKey: 'patient_id' });
        Patient.hasMany(models.MonitoringSession, { foreignKey: 'patient_id' });
      };
      
      return Patient;
    };