import { detailUserDemoMd, listNotificationMd } from '../db/config/models';

export const listNotification = async (req, res) => {
  const { id } = req.userInfo || {};
  const { page, limit } = req.query || {};
  const user = await detailUserDemoMd({ id });
  if (!user) {
    return res.status(404).json({
      status: 0,
      message: '사용자를 찾을 수 없습니다.',
      data: {},
    });
  }
  const list = await listNotificationMd({ store_id: user.store_id }, null, Number(page), Number(limit), [['created_at', 'DESC']]);
  return res.status(200).json({
    status: 1,
    message: 'Get notifications successfully',
    data: {
      item: list,
      pagination: {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        total: list?.length || 0,
        unreadCount: list?.filter((n) => n.is_read === 0)?.length || 0,
      },
    },
  });
};
