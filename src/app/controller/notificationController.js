import { detailUserDemoMd, listNotificationMd } from "../db/config/models";

export const listNotification = async (req, res) => {
  const { id } = req.userInfo || {};
  const user = await detailUserDemoMd({ id });
  if (!user) {
    return res.status(404).json({
      status: 0,
      mess: "사용자를 찾을 수 없습니다.",
      data: {},
    });
  }
  const list = await listNotificationMd({ store_id: user.store_id });
  return res.status(200).json({
    status: 1,
    mess: "알림 목록을 성공적으로 조회했습니다.",
    data: list,
  });
};
