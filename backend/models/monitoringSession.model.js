 
module.exports = (sequelize, DataTypes) => {
	const MonitoringSession = sequelize.define(
		"MonitoringSession",
		{
      session_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
		},
		{timestamps:true}
	)
  MonitoringSession.associate = function(models) {
    MonitoringSession.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    MonitoringSession.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
    MonitoringSession.hasMany(models.VitalSign, { foreignKey: 'session_id' });
  };
	return MonitoringSession;
}
