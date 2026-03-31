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
  deleted_at;
  status;
  actor_method;
  bank;
  card_number;
  customer_name;
  check_code;
}

Notification.init('notification', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
  },
  type: { type: 'varchar(50)' },
  event: { type: 'varchar(100)' },
  title: { type: 'varchar(255)' },
  actor_id: { type: 'int' },
  actor_name: { type: 'varchar(255)' },
  actor_type: { type: 'varchar(100)' },
  amount_krw: { type: 'bigint' },
  amount_vnd: { type: 'bigint' },
  currency: { type: 'varchar(10)' },
  order_id: { type: 'varchar(100)' },
  store_id: { type: 'int' },
  is_read: { type: 'tinyint(1)', defaultValue: 0 },
  created_at: { type: 'datetime' },
  deleted_at: { type: 'datetime' },
  status: { type: 'tinyint(1)' },
  actor_method: { type: 'varchar(50)' },
  bank: { type: 'varchar(50)' },
  card_number: { type: 'varchar(50)' },
  customer_name: { type: 'varchar(150)' },
  check_code: { type: 'varchar(50)' },
});
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
  deleted_at;
  status;
  actor_method;
  bank;
  card_number;
  customer_name;
  check_code;
}

Notification.init('notification', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
  },
  type: { type: 'varchar(50)' },
  event: { type: 'varchar(100)' },
  title: { type: 'varchar(255)' },
  actor_id: { type: 'int' },
  actor_name: { type: 'varchar(255)' },
  actor_type: { type: 'varchar(100)' },
  amount_krw: { type: 'bigint' },
  amount_vnd: { type: 'bigint' },
  currency: { type: 'varchar(10)' },
  order_id: { type: 'varchar(100)' },
  store_id: { type: 'int' },
  is_read: { type: 'tinyint(1)', defaultValue: 0 },
  created_at: { type: 'datetime' },
  deleted_at: { type: 'datetime' },
  status: { type: 'tinyint(1)' },
  actor_method: { type: 'varchar(50)' },
  bank: { type: 'varchar(50)' },
  card_number: { type: 'varchar(50)' },
  customer_name: { type: 'varchar(150)' },
  check_code: { type: 'varchar(50)' },
});
export const listNotificationMd = (where, transaction, page, limit, order, attributes) => {
  return Notification.find(where, transaction, page, limit, order, attributes);
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
