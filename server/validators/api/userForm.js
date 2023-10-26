const Joi = require("joi")
const {
    QUERY: { find, findOne, create, findOneAndUpdate, upsert, findOneAndDelete, countDocuments },
    HTTPStatus: {
        OK_STATUS, //general successfully call api
        CREATED, // create and update time
        BAD_REQUEST, // client did not give proper values
        UNAUTHORIZED, // client have no token
        PAYMENT_REQUIRED, // payment not done for client
        FORBIDDEN, // no permission access / granted OR roles or permission
        NOT_FOUND, // finding data not in database/server
        CONFLICT, // already exist OR unique field set
        UNPROCESSABLE_CONTENT, // some parameter are missing from client 
        LOCKED, // user is blocked / disabled
        INTERNAL_SERVER_ERROR, // put on catch block
    },
    common_error_message,
    please_login_again,
    commonQuery,
    only_admin_access,
    client_response,
} = require("../../services/common_helper");

module.exports = {
    // field validation
    apiUserFormValidator: (req, res, next) => {
        const JoiSchema = Joi.object({
            name: Joi.string().trim().required(),
            questionData: Joi.any().required(),
        })
        const { value, error } = JoiSchema.validate(req.body, { abortEarly: true })
        if (error?.message) {
            return client_response(res, UNPROCESSABLE_CONTENT, error.message.toString())
        }
        else {
            next()
        }
    },
}