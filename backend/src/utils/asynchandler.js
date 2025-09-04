const asyncHandler = (reqhandler) => {
  return function (req, res, next) {
    Promise.resolve(reqhandler(req, res, next)).catch(function (err) {
      next(err);
    });
  };
};

export default asyncHandler;
