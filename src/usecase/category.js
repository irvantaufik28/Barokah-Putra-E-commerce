class Category {
   constructor(categoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async getCategoryByID(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
      }
      let category = await this.categoryRepository.getCategoryByID(id);
      if (category == null) {
         result.reason = "category not found"
         return result
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async getCategory(filters) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
      }
     let category = await this.categoryRepository.getCategory(filters)
      if (category == null) {
         result.reason = "category not found"
         return result
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async getProductByCategoryID(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let category = await this.categoryRepository.getProductByCategoryID(id)
      if (category == null) {
         result.reason = "product not found"
         return result
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async createCategory(data_category) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let category = await this.categoryRepository.createCategory(data_category);
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async updateCategory(category_data, id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let existCategory = await this.categoryRepository.getCategoryByID(id)
      if (existCategory == null) {
         result.reason = "category not found"
         return result
      }
      let category = await this.categoryRepository.updateCategory(category_data, id)
      if (category == null) {
         result.reason = "internal server error"
         result.status = 500
         return result 
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async deleteCategory(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let existCategory = await this.categoryRepository.getCategoryByID(id)
      if (existCategory == null) {
         result.reason = "category not found"
         return result
      }
      let category = await this.categoryRepository.deleteCategory(id)
     
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
}

module.exports = Category;