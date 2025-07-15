const { query } = require('@shared/db/sql');
const { ok, error } = require('@shared/helpers/response');

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await query(`
        SELECT 
          id,
          ten_danh_muc as name
        FROM danhmucsanpham 
        ORDER BY ten_danh_muc
      `);
      
      return ok(res, { message: 'Categories retrieved successfully', data: categories });
    } catch (error) {
      console.error('Error getting categories:', error);
      return error(res, 500, 'Failed to get categories');
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await query(`
        SELECT 
          id,
          ten_danh_muc as name
        FROM danhmucsanpham 
        WHERE id = $1
      `, [id]);
      
      if (category.length === 0) {
        return error(res, 404, 'Category not found');
      }
      
      return ok(res, { message: 'Category retrieved successfully', data: category[0] });
    } catch (error) {
      console.error('Error getting category:', error);
      return error(res, 500, 'Failed to get category');
    }
  }
}

module.exports = new CategoryController();