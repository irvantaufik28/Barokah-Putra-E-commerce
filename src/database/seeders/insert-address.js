const bcrypt = require("bcrypt")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Addresses", [
            {
                province: "Jawa Barat",
                city : "Garut",
                postal_code : "44151",
                detail_address : "Jl.abc no 123",
                user_id : 2,
                main_address : true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Addresses", null, {})
    }
}