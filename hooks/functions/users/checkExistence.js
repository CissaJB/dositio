import { ALREADY_EXISTS } from "../../../libs/errors.js";
export const checkExistence = (app) => async (request, reply) => {
    const users = app.mongo.db.collection('users');

    let user = request.body;

    let result = await users.count({name: user.name});

    if(result > 0) throw new ALREADY_EXISTS();
}