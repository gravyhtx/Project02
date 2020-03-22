/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
module.exports = function(sequelize, DataTypes) {
    const Subscription = sequelize.define("Subscription", {
        subscription_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coffee_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Subscription.associate = function(models) {
        // a subscription can't be made if not a registered User due to foreign key restraints
        Subscription.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            } 
        });
    };
    return Subscription;
};