export const validateMiddleware = (input) => {
  return (req, res, next) => {
    try {
      if (input) {
        const merged = {
          ...(req.params ?? {}),
          ...(req.query ?? {}),
          ...(req.body ?? {}),
        };
        req.input = input.parse(merged);
      }

      next();
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        messageage: 'Internal server error',
        data: {},
      });
    }
  };
};
