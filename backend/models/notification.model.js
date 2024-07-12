 
module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define(
		"Notification",
		{
      notification_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
		},
		{timestamps:true}
	)
  Notification.associate = function(models) {
    Notification.belongsTo(models.User, { foreignKey: 'user_id' });
    Notification.belongsTo(models.Message, { foreignKey: 'message_id' });
  };
	return Notification;
}
