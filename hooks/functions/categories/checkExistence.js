import { ALREADY_EXISTS } from "../../../libs/errors.js";
export const checkExistence = (app) => async (request, reply) => {
    const categories = app.mongo.db.collection('categories');

    let categorie = request.body;

    let result = await categories.count({name: categorie.name});

    if(result > 0) throw new ALREADY_EXISTS();
}