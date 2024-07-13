 
module.exports = (sequelize, DataTypes) => {
	const VitalSign = sequelize.define(
		"VitalSign",
		{
      vital_sign_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heart_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      respiration_rate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
		},
		{timestamps:true}
	)
  VitalSign.associate = function(models) {
    VitalSign.belongsTo(models.Patient, {foreignKey: "patient_id"});
    VitalSign.belongsTo(models.MonitoringSession, { foreignKey: 'monitoring_session_id' });
  }
	return VitalSign;
}
