import { sequelize } from "../sequelize";

class SequelizeBase {
  constructor() {}

  static init(
    tableName,
    attributes,
    options = {},
    cache = false,
    cacheTime = 0,
    indexes = [],
  ) {
    if (!sequelize) throw new Error("Sequelize not initialized");

    this.tableName = tableName;
    this.cache = Boolean(cache);
    this.cacheTime = cacheTime;

    this.model = sequelize.define(tableName, attributes, {
      tableName,
      timestamps: false,
      paranoid: false,
      indexes,
      ...options,
    });
  }

  static async find(
    where = {},
    transaction,
    page,
    limit,
    order,
    attributes,
    group,
  ) {
    const opts = {
      where: { ...where, deleted_at: null },
      raw: true,
    };

    if (transaction) opts.transaction = transaction;
    if (limit) {
      opts.limit = Number(limit);
      opts.offset = page ? (page - 1) * limit : 0;
    }
    if (order) opts.order = order;
    if (group) opts.group = group;
    if (attributes) opts.attributes = attributes;

    return this.model.findAll(opts);
  }

  static async count(where = {}, transaction) {
    const opts = {
      where: { ...where, deleted_at: null },
    };

    if (transaction) opts.transaction = transaction;
    return this.model.count(opts);
  }

  static async findOne(where = {}, transaction) {
    const opts = {
      where: { ...where, deleted_at: null },
      raw: true,
    };

    if (transaction) opts.transaction = transaction;

    if (this.cache && where.id) {
      return;
      //   return cacheRedis(`${this.tableName}:id:${where.id}`, () => this.model.findOne(opts), this.cacheTime);
    }

    return this.model.findOne(opts);
  }

  static async create(data = {}, transaction) {
    const options = {};
    if (transaction) options.transaction = transaction;

    const instance = await this.model.create(data, options);
    return instance.get({ plain: true });
  }

  static async update(data = {}, where = {}, transaction) {
    if (!where || Object.keys(where).length === 0) {
      throw new Error("Update without where is not allowed");
    }

    if (this.cache) {
      if (where.id) {
        this.clearCache(where.id);
      } else {
        const targets = await this.model.findAll({
          where,
          attributes: ["id"],
          raw: true,
        });
        targets.forEach((t) => this.clearCache(t.id));
      }
    }

    const options = { where };
    if (transaction) options.transaction = transaction;

    const [affected] = await this.model.update(data, options);
    return affected;
  }

  static async softDelete(where = {}, transaction) {
    if (!where || Object.keys(where).length === 0) {
      throw new Error("Delete without where is not allowed");
    }

    if (this.cache && where.id) this.clearCache(where.id);

    const options = { where };
    if (transaction) options.transaction = transaction;

    return this.model.update({ deleted_at: new Date() }, options);
  }

  static clearCache(id) {
    // rdDel(`${this.tableName}:id:${id}`);
  }
}

export { SequelizeBase };
