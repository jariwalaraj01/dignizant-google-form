const UserForm = require("../../models/userForm");
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
    client_response
} = require("../../services/common_helper");

module.exports = {
    userFormAdmin: async (req, res, next) => {
        try {
            let userFormResponse = await commonQuery(UserForm, find)
            if (userFormResponse.status == 1) {
                return client_response(res, OK_STATUS, `User form fetched successfully.`, userFormResponse.data)
            } else {
                return client_response(res, BAD_REQUEST, common_error_message)
            }
        } catch (error) {
            console.log(error);
            return client_response(res, INTERNAL_SERVER_ERROR, common_error_message)
        }
    },
}