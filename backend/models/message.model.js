 
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		"Message",
		{
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
		},
		{timestamps:true}
	)
  Message.associate = function(models) {
    Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'sender_id' });
    Message.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiver_id' });
  };
	return Message;
}
