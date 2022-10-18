module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Image_Products", [
            {
                url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663376529/default_product_opdem9.jpg',
                cover_image : true,
                product_id :  "123e4567-e89b-12d3-a456-426614174123",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663376529/default_product_opdem9.jpg',
                cover_image : true,
                product_id : "123e4567-e89b-12d3-a456-426614174321",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663376529/default_product_opdem9.jpg',
                cover_image : true,
                product_id :  "123e4567-e89b-12d3-a456-111114174123",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663376529/default_product_opdem9.jpg',
                cover_image : true,
                product_id :  "123e4567-e89b-12d3-a456-4266141754321",
                createdAt: new Date(),
                updatedAt: new Date()
            }
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Image_Products", null, {})
    }
}