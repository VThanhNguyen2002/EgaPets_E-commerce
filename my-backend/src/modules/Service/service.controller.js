const { query } = require('@shared/db/sql');
const { ok, error } = require('@shared/helpers/response');

class ServiceController {
  async getAll(req, res) {
    try {
      const services = await query(`
        SELECT 
          id,
          ten_dich_vu as name,
          mo_ta as description,
          gia_mac_dinh as default_price,
          created_at,
          updated_at
        FROM dichvu 
        ORDER BY ten_dich_vu
      `);
      
      return ok(res, { message: 'Services retrieved successfully', data: services });
    } catch (error) {
      console.error('Error getting services:', error);
      return error(res, 500, 'Failed to get services');
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const service = await query(`
        SELECT 
          id,
          ten_dich_vu as name,
          mo_ta as description,
          gia_mac_dinh as default_price,
          created_at,
          updated_at
        FROM dichvu 
        WHERE id = $1
      `, [id]);
      
      if (service.length === 0) {
        return error(res, 404, 'Service not found');
      }
      
      return ok(res, { message: 'Service retrieved successfully', data: service[0] });
    } catch (error) {
      console.error('Error getting service:', error);
      return error(res, 500, 'Failed to get service');
    }
  }

  async getServiceDetails(req, res) {
    try {
      const { id } = req.params;
      
      // Get service with details
      const serviceDetails = await query(`
        SELECT 
          dv.id,
          dv.ten_dich_vu as name,
          dv.mo_ta as description,
          dv.gia_mac_dinh as default_price,
          dvct.id as detail_id,
          dvct.can_nang as weight_range,
          dvct.loai_long as fur_type,
          dvct.gia as price
        FROM dichvu dv
        LEFT JOIN dichvuchitiet dvct ON dv.id = dvct.dich_vu_id
        WHERE dv.id = $1
        ORDER BY dvct.can_nang, dvct.loai_long
      `, [id]);
      
      if (serviceDetails.length === 0) {
        return error(res, 404, 'Service not found');
      }
      
      // Format response
      const service = {
        id: serviceDetails[0].id,
        name: serviceDetails[0].name,
        description: serviceDetails[0].description,
        default_price: serviceDetails[0].default_price,
        details: serviceDetails
          .filter(row => row.detail_id)
          .map(row => ({
            id: row.detail_id,
            weight_range: row.weight_range,
            fur_type: row.fur_type,
            price: row.price
          }))
      };
      
      return ok(res, { message: 'Service details retrieved successfully', data: service });
    } catch (error) {
      console.error('Error getting service details:', error);
      return error(res, 500, 'Failed to get service details');
    }
  }
}

module.exports = new ServiceController();