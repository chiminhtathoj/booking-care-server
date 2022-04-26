'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT("LONG"),
                allowNull: false
            },
            contentMarkdown: {
                type: Sequelize.TEXT("LONG"),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT("LONG"),
                allowNull: true
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            clinicId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('markdowns');
    }
};