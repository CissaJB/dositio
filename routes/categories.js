/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';

export default async function categories(app, options) {
    const InvalidCategoriesError = createError ('InvalidCategorieError', 'Categoria Inválida.', 400);

    const categories = app.mongo.db.collection('categories');
    const products = app.mongo.db.collection('products');

    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await categories.find().toArray();
        }
    );

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    img_URL: {type: 'string'}
                },
                required: ['name', 'img_URL']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let categorie = request.body;

        await categories.insertOne(categorie);

        return reply.code(201).send();
    });

    app.get('/categories/:id', async (request, reply) => {
        let id =  request.params.id;
        let categorie = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        
        return categorie;
    });

    app.get('/categories/:id/products', async (request, reply) => {
        let id =  request.params.id;
        let categorieProducts = await products.find({categorieId: new app.mongo.ObjectId(id)}).toArray();
        
        return categorieProducts;
    });

    app.delete('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });

    app.put('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let categorie = request.body;
        
        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: categorie.name,
            }
        });
        
        return reply.code(204).send();;


    });
}
