import { Database } from '../config/database.js';
import logger from '../utils/logger.js';

class BaseService {
  constructor(modelName) {
    this.modelName = modelName;
  }


  get model() {
    const db = Database.getInstance();
    return db.getClient()[this.modelName];
  }


 
  async findById(id, options = {}) {
    return this.model.findUnique({ where: { id }, ...options });
  }


  async findOne(where, options = {}) {
    return this.model.findFirst({ where, ...options });
  }

  async findMany({ where = {}, skip = 0, take = 10, orderBy = { createdAt: 'desc' }, include } = {}) {
    const [data, total] = await Promise.all([
      this.model.findMany({ where, skip, take, orderBy, include }),
      this.model.count({ where }),
    ]);
    return { data, total };
  }

 
  async create(data, options = {}) {
    return this.model.create({ data, ...options });
  }

  async update(id, data, options = {}) {
    return this.model.update({ where: { id }, data, ...options });
  }

  async delete(id, soft = true) {
    if (soft) {
      return this.model.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }
    return this.model.delete({ where: { id } });
  }

  async count(where = {}) {
    return this.model.count({ where });
  }
}

export default BaseService;
