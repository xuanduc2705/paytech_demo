import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { createUserDemoMd, detailUserDemoMd } from '../db/config/models';
import { generateAccessToken, generateRefreshToken } from '../../utils/token';

const errorResponse = (res, status, message, code) => {
  status = typeof status === 'number' ? status : 400;
  return res.status(status).json({
    status: 'error',
    code,
    message,
  });
};
const successResponse = (res, data = {}, message) => {
  return res.json({
    status: 'success',
    data,
    message,
  });
};
export const login = async (req, res) => {
  const { accountId, password } = req.body;
  const authAccount = await detailUserDemoMd({ account_id: accountId });
  const dummyHash = '$2b$10$S8Z9vH6.96i6u.rD98m96uX9p8yI9q9a9b9c9d9e9f9g9h9i9j9k9';
  const targetPassword = authAccount ? authAccount.password : dummyHash;
  const isMatch = await bcrypt.compare(password, targetPassword);

  if (!authAccount || !isMatch) {
    return errorResponse(res, 401, '잘못된 사용자 이름 또는 비밀번호입니다.');
  }

  const accessToken = generateAccessToken({ sub: authAccount.id });
  const refreshToken = generateRefreshToken();
  return successResponse(
    res,
    {
      accessToken,
      refreshToken,
      user: {
        id: authAccount.id,
        accountId: authAccount.account_id,
        name: authAccount.name,
        role: authAccount.role,
        store_id: authAccount.store_id,
      },
    },
    'Login successful'
  );
};
export const register = async (req, res) => {
  try {
    const { accountId, password, email, phone, name } = req.body;
    if (!accountId || !password) {
      return errorResponse(res, 400, 'Thiếu accountId hoặc password');
    }

    const existedUser = await detailUserDemoMd({
      [Op.or]: [{ account_id: accountId }, ...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])],
    });
    if (existedUser) {
      return errorResponse(res, 400, 'Tài khoản hoặc email hoặc số điện thoại đã tồn tại');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await createUserDemoMd({
      account_id: accountId,
      password: hashedPassword,
      email,
      phone,
      name,
    });

    const accessToken = generateAccessToken({ sub: newUser.id });
    const refreshToken = generateRefreshToken();
    return successResponse(res, {
      accessToken,
      refreshToken,
      user_id: newUser.id,
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, 'Lỗi server');
  }
};
