 
module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define(
		"Notification",
		{
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
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
