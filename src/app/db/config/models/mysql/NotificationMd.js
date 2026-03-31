import { Sequelize } from 'sequelize';
import { SequelizeBase } from '../SequelizeBase';

class Notification extends SequelizeBase {
  id;
  type;
  event;
  title;
  actor_id;
  actor_name;
  actor_type;
  amount_krw;
  amount_vnd;
  currency;
  order_id;
  store_id;
  is_read;
  created_at;
}

Notification.init('notification', {
  id: {
    type: 'int',
    primaryKey: true,
  },
  type: {
    type: 'varchar(50)',
    allowNull: true,
  },
  event: {
    type: 'varchar(100)',
    allowNull: true,
  },
  title: {
    type: 'varchar(255)',
    allowNull: true,
  },
  actor_id: {
    type: 'int',
    allowNull: true,
  },
  actor_name: {
    type: 'varchar(255)',
    allowNull: true,
  },
  actor_type: {
    type: 'varchar(100)',
    allowNull: true,
  },
  amount_krw: {
    type: 'bigint',
    allowNull: true,
  },
  amount_vnd: {
    type: 'bigint',
    allowNull: true,
  },
  currency: {
    type: 'varchar(10)',
    allowNull: true,
  },
  order_id: {
    type: 'varchar(100)',
    allowNull: true,
  },
  store_id: {
    type: 'int',
    allowNull: true,
  },
  is_read: {
    type: 'tinyint(1)',
    allowNull: true,
    defaultValue: 0,
  },
  created_at: {
    type: 'datetime',
    allowNull: true,
  },
  deleted_at: {
    type: 'datetime',
    allowNull: true,
  },
});
export const listNotificationMd = (where, transaction, page, limit, order, attributes, group) => {
  return Notification.find(where, transaction, page, limit, order, attributes, group);
};

export const countNotificationMd = (where, transaction) => {
  return Notification.count(where, transaction);
};

export const detailNotificationMd = (where, transaction) => {
  return Notification.findOne(where, transaction);
};

export const createNotificationMd = (data, transaction) => {
  return Notification.create(data, transaction);
};

export const updateNotificationMd = (data, where, transaction) => {
  return Notification.update(data, where, transaction);
};

export const deleteNotificationMd = (where, transaction) => {
  return Notification.softDelete(where, transaction);
};

export default Notification;
