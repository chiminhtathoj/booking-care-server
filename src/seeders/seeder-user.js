'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      email: "chiminhtathoj2009@gmail.com",
      phoneNumber: "0702797119",
      password: "123456",
      firstName: "long",
      lastName: "vo",
      address: "291 cua dai",
      gender: 1,
      roleId: "1",
      image: "string",
      positionId: "1"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
