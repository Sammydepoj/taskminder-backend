const { Users } = require("../models/Authentication");
const { ResponsCode } = require("../responseCode");
const { createToken } = require("../utils/createToken");

const otpVerification = async (request, response) => {
  try {
    const otp = request.body.otp;
    if (!otp)
      return response.status(400).send({
        responseCode: ResponsCode.INVALID_OTP,
        responseMessage: "Invalid OTP",
        data: null,
      });

    const user = await Users.findOne({ otp });

    if (user) {
      user.otp = null;
      user.isVerified = true;

      await user.save();

      const token = createToken(user);

      response.status(200).send({
        responseCode: ResponsCode.SUCCESSFUL,
        responseMessage: "Email verification successful",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user?.isVerified,
          token,
        },
      });
    } else {
      response.status(400).send({
        responseCode: ResponsCode.INVALID_OTP,
        responseMessage: "Email verification failed, Invalid OTP",
        data: null,
      });
    }
  } catch (error) {
    response.status(500).send({
      responseCode: ResponsCode.INTERNAL_SERVER_ERROR,
      responseMessage: "Internal server error " + error.message,
      data: null,
    });
    console.log(error.message);
  }
};

exports.otpVerification = otpVerification;
