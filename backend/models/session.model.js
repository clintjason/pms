module.exports = (sequelizeConnection, DataTypes) => {
  const Session = sequelizeConnection.define('Session', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    //tableName: 'Sessions',
  });
  Session.associate = function (models) {
    Session.belongsTo(models.User, { foreignKey: 'user_id' });
  }
  return Session;
}
