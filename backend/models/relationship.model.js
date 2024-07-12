module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('PatientDoctorRelationship', {}, {});
  Relationship.associate = function(models) {
    Relationship.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
    Relationship.belongsTo(models.Patient, { foreignKey: 'patient_id' });
  };
  return Relationship;
};