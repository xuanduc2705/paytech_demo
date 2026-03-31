import { SequelizeBase } from '../SequelizeBase';

class UserDemo extends SequelizeBase {
  id;
  name;
  account_id;
  email;
  password;
  phone;
  store_id;
}

UserDemo.init('user_demo', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'varchar(255)',
    allowNull: true,
  },
  account_id: {
    type: 'varchar(100)',
    allowNull: true,
  },
  email: {
    type: 'varchar(255)',
    allowNull: true,
  },
  password: {
    type: 'varchar(255)',
    allowNull: true,
  },
  phone: {
    type: 'varchar(20)',
    allowNull: true,
  },
  store_id: {
    type: 'int',
    allowNull: true,
  },
  deleted_at: {
    type: 'datetime',
    allowNull: true,
  },
  role: {
    type: 'varchar(50)',
    allowNull: true,
  },
});

export const listUserDemoMd = (where, transaction, page, limit, order, attributes, group) => {
  return UserDemo.find(where, transaction, page, limit, order, attributes, group);
};

export const countUserDemoMd = (where, transaction) => {
  return UserDemo.count(where, transaction);
};

export const detailUserDemoMd = (where, transaction) => {
  return UserDemo.findOne(where, transaction);
};

export const createUserDemoMd = (data, transaction) => {
  return UserDemo.create(data, transaction);
};

export const updateUserDemoMd = (data, where, transaction) => {
  return UserDemo.update(data, where, transaction);
};

export const deleteUserDemoMd = (where, transaction) => {
  return UserDemo.softDelete(where, transaction);
};

export default UserDemo;
