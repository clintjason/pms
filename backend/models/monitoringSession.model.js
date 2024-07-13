module.exports = (sequelize, DataTypes) => {
	const MonitoringSession = sequelize.define(
		"MonitoringSession",
		{
      start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
		},
		{timestamps:true}
	)
  MonitoringSession.associate = function(models) {
    MonitoringSession.belongsTo(models.Session, { foreignKey: 'session_id' });
    MonitoringSession.hasMany(models.VitalSign, { foreignKey: 'monitoring_session_id' });
  };
	return MonitoringSession;
}
