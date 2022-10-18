module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Products", [
            {
                id :"123e4567-e89b-12d3-a456-426614174123",
                name: "Kaos Partai",
                price: 45000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                category_id: 1,
                cover_imageID : 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id :"123e4567-e89b-12d3-a456-426614174321",
                name: "kemeja",
                price: 95000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                category_id: 1,
                cover_imageID : 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id :"123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                category_id: 2,
                cover_imageID : 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id :"123e4567-e89b-12d3-a456-4266141754321",
                name: "Celana pendek",
                price: 100000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                category_id: 2,
                cover_imageID : 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Products", null, {})
    }
}