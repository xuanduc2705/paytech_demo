import { detailStoreMd } from '../db/config/models/mysql/StoreMd';

export const getStoreInfo = async (req, res) => {
  try {
    const { storeId } = req.params;
    const storeInfo = await detailStoreMd({ id: storeId });
    return res.status(200).json({
      status: 'success',
      message: 'Get store detail successfull',
      data: storeInfo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching store info',
      data: {},
    });
  }
};
