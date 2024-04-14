/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function register(app, options) {
    const InvalidUserError = createError('InvalidUserError', 'Usuário Inválido.', 400);

    const users = app.mongo.db.collection('users');
    
app.get('/register', 
    {
        config: {
            logMe: true
        }
    }, 
    async (request, reply) => {
        return await users.find().toArray();
    }
);


app.post('/register', {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 3, maxLength: 30 },
                password: { type: 'string', minLength: 6 },
            },
            required: ['name', 'password']
        }
    }
}, async (request, reply) => {
    let user = request.body;

    await users.insertOne(user);

    return reply.code(201).send({ message: 'User registered successfully' });
});

}
