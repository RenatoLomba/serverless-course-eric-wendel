"use strict";

module.exports.hello = async (event) => {
  console.log('LOCAL TEST')
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello Serverless Framework!",
      },
      null,
      2
    ),
  };
};
