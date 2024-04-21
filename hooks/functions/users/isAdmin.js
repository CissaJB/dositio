/* import { NOT_ADMIN } from "../../../libs/errors.js";
export const Not_Admin = (app) => async (request, reply) => {
    const users = app.mongo.db.collection('users');

    let user = await users.findOne({ name: request.body.name });
    if (user && user.isAdmin) {
        done();
    } else {
        throw new NOT_ADMIN();
    }
}
*/

