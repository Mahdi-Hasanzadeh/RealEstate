const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case 400:
      res.json({
        succeess: false,
        title: "VALIDATION ERROR",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 401:
      res.json({
        succeess: false,

        title: "UNAUTHORIZED",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 403:
      res.json({
        succeess: false,

        title: "FORBIDDEN",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 404:
      res.json({
        succeess: false,

        title: "NOT FOUND",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 500:
      res.json({
        title: "SERVER ERROR",
        message: error.message,
        stackTrace: error.stack,
      });
  }
};

export default errorHandler;
