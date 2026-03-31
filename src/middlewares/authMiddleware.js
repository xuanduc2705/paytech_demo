import { detailUserDemoMd } from '../app/db/config/models';
import { verifyAccessToken } from '../utils/token';

const errorResponse = (res, status, message, code) => {
  status = typeof status === 'number' ? status : 400;
  return res.status(status).json({
    status: 'error',
    code,
    message,
  });
};
export const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return errorResponse(res, 401, '로그인되어 있지 않습니다.', 'UNAUTHORIZED');
  const token = auth.replace('Bearer ', '');
  try {
    console.log('Token:', token);

    const payload = verifyAccessToken(token);
    console.log('Payload:', payload);

    const user_id = payload.sub;
    const account = await detailUserDemoMd({ id: user_id });
    if (!account) return errorResponse(res, 401, '해당 계정은 존재하지 않습니다.', 'ACCOUNT_NOT_FOUND');
    if (account.status !== 1) return errorResponse(res, 403, '계정이 잠겼습니다.', 'ACCOUNT_DISABLED');
    req.userInfo = { ...account };
    next();
  } catch (err) {
    console.log(err);

    return errorResponse(res, 401, '토큰이 유효하지 않거나 만료되었습니다.', 'TOKEN_EXPIRED');
  }
};
