import { SequelizeBase } from '../SequelizeBase';

class Store extends SequelizeBase {
  id;
  name;
  businessCode;
  industry;
  type;
  address;
  status;
  deleted_at;
}

Store.init('store', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'varchar(255)',
    allowNull: false,
  },
  businessCode: {
    type: 'varchar(50)',
    allowNull: true,
    field: 'businessCode', // DB đang camelCase
  },
  industry: {
    type: 'varchar(50)',
    allowNull: true,
  },
  type: {
    type: 'varchar(20)',
    allowNull: true,
  },
  address: {
    type: 'varchar(250)',
    allowNull: true,
  },
  status: {
    type: 'varchar(20)',
    allowNull: true,
  },
  deleted_at: {
    type: 'int',
    allowNull: true,
  },
});
export const listStoreMd = (where, transaction, page, limit, order, attributes, group) => {
  return Store.find(where, transaction, page, limit, order, attributes, group);
};

export const countStoreMd = (where, transaction) => {
  return Store.count(where, transaction);
};

export const detailStoreMd = (where, transaction) => {
  return Store.findOne(where, transaction);
};

export const createStoreMd = (data, transaction) => {
  return Store.create(data, transaction);
};

export const updateStoreMd = (data, where, transaction) => {
  return Store.update(data, where, transaction);
};

export const deleteStoreMd = (where, transaction) => {
  return Store.softDelete(where, transaction);
};

export default Store;
