// const ResponseHandler = require("../utils/responsehandler");

// module.exports = (err, req, res, next) => {
//     res.statusCode = res.statusCode || 200;
//     res.message = res.message || "OK";

//     // Mongoose duplicate key error
//   if (res.code === 200) {
//     const message = `OK Done`;
//     res = new ResponseHandler(message, 200);
//   }
//   if (res.code === 201) {
//     const message = `Content created`;
//     res = new ResponseHandler(message, 201);
//   }


//     res.status(res.statusCode).json({
//         success: true,
//         message: res.message,
//       });
//     };
  