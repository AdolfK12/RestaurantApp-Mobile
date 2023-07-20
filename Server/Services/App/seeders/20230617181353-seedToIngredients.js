"use strict";

const data = [
  {
    ItemId: 1,
    name: "Crab",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 1,
    name: "Cucumber",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 1,
    name: "Avocado",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 1,
    name: "Sushi Rice",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 1,
    name: "Seaweed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 2,
    name: "Salmon",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 2,
    name: "Wasabi",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 2,
    name: "Soy Sauce",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 3,
    name: "Tuna",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ItemId: 3,
    name: "Sushi Rice",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ingredients", data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ingredients", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
