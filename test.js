import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'dev');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://127.0.0.1/dositio');
    });
});

describe ('###Tests for Unauthenticated Routes', async(t) => { 

    describe('##Success Requests', async(t) => {

        test('# GET /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /products/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products/661b170f32e4efa9e54e5771'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /categories/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/661b12fd32e4efa9e54e576f'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories'
            });
            equal(response.statusCode, 200);
        });

        test('# POST /auth', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/auth',
                body: {
                    "name": "Cecilia",
                    "password" : "Abcd@1234"
                }
            });
            equal(response.statusCode, 200);
        });

        test('# POST /register', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/register',
                body: {
                    "name": "Cecilia",
                    "password": "123456"
                }
            });
            equal(response.statusCode, 201);
    });

    test('# GET /register', async(t) => {
        const app = await build(options);
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/register',
        });
        equal(response.statusCode, 200);
    });
    test('# GET /categories/:id/products', async(t) => {
        const app = await build(options);
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/categories/661b156d32e4efa9e54e5770/products',
        });
        equal(response.statusCode, 200);
    });
});

    describe('##Bad Requests', async(t) => {

        test('# POST /register', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/register',
                body: {
                    "nome": "Cecilia",
                    "password": "123456"
                }
            });
            equal(response.statusCode, 400);
        })
        
         test('# POST /register', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/register',
                body: {
                    "name": "Cecilia",
                    "password": "123456"
                }
            });
            equal(response.statusCode, 412);
        })
        
         test('# GET /product', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/product'
            });
            equal(response.statusCode, 404);
        });
        
        test('# GET /categorie', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categorie'
            });
            equal(response.statusCode, 404);
        });
        
    });
})

describe('###Tests for Authenticated routes', async(t) => {

    describe('## Success Requests', async (t) => {

       test('# POST /categories', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
     
            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                headers: {
                        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body: {
                    "name": "Categoria de teste",
                    "img_URL" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fpt-br%2Fwiki%2FMike_Wazowski&psig=AOvVaw0UJ-SY5zDaS9UDEzToUTtd&ust=1713574290600000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjp1OuHzYUDFQAAAAAdAAAAABAJ"
                    
                }
            });
            equal(response.statusCode, 201); 
        });

        test('# PUT /categories', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
     
            const response = await app.inject({
                method: 'PUT',
                url: '/categories/6623e594a5a68e1749fff3eb',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body: {
                    "name": "Laticíonios",
                    "img_URL" : "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.knobel.com.br%2F2018%2F09%2F14%2Flaticinios-integrais-podem-fazer-bem-a-sua-saude%2F&psig=AOvVaw3q6TxaoqEg-48ocPBKfRWI&ust=1713714840155000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICM2beT0YUDFQAAAAAdAAAAABAJ"
                }
            });
            equal(response.statusCode, 204); 
        });

        test('# DELETE /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/products/661b179c32e4efa9e54e5778',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body: {
                    "name": "Limão",
                    "qtd": 20,
                    "categorieId": "661b156d32e4efa9e54e5770"
                }
            });
                equal(response.statusCode, 204); 
        });

        test('# DELETE /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/categories/6623e594a5a68e1749fff3eb',
                headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body : {
                    "name": "Latícionios",
                    "img_URL" : "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.knobel.com.br%2F2018%2F09%2F14%2Flaticinios-integrais-podem-fazer-bem-a-sua-saude%2F&psig=AOvVaw3q6TxaoqEg-48ocPBKfRWI&ust=1713714840155000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICM2beT0YUDFQAAAAAdAAAAABAJ"
                }
            });
                equal(response.statusCode, 204); 
        });

        test('# POST /products', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/products',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0",
                    "isAdmin": "true"
                }, 
                body: {
                    "name": "Jabuticaba",
                    "qtd" : 5,
                    "categorieId": "661b156d32e4efa9e54e5770"   
                }
            });
             equal(response.statusCode, 201); 
        });

        test('# PUT /products', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/products/661b173832e4efa9e54e5773',
                headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body: {
                    "name": "Cereja",
                    "qtd" : 5,
                    "categorieId": "661b156d32e4efa9e54e5770"        
                }
            });
            equal(response.statusCode, 204); 
        });
    });

    describe('##Bad Requests, Client_error', async(t) => {

        test('# PUT /products', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const response = await app.inject({
                method: 'PUT',
                url: '/products/661b173832e4efa9e54e5773',
                body: {
                    "name": "Cereja",
                    "qtd" : 5,
                    "categorieId": "661b156d32e4efa9e54e5770"
                }
            });
            equal(response.statusCode, 401); 
        });

        test('# DELETE /products', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const response = await app.inject({
                method: 'DELETE',
                url: '/products/661b173832e4efa9e54e5773',
                body: {
                    "nome": "Cereja",
                    "quantidade" : 5,
                    "categorie": "661b156d32e4efa9e54e5770"
                }
            });
            equal(response.statusCode, 401); 
        });

        test('# POST /products', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const response = await app.inject({
                method: 'POST',
                url: '/products', 
                body: {
                    "nome": "Cereja",
                    "qtd" : 5,
                    "categorieId": "661b156d32e4efa9e54e5770"
                }
            });
            equal(response.statusCode, 401); 
        });
        
         test('# POST /product', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const response = await app.inject({
                method: 'POST',
                url: '/product', 
                headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body: {
                    "nome": "Cereja",
                    "qtd" : 5,
                    "categorieId": "661b156d32e4efa9e54e5770"
                }
            });
            equal(response.statusCode, 404); 
        });

        test('# PUT /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/categories/6621c4618fd06468ae574798',
                body : {
                    "name": "Categoria de teste",
                    "img" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fpt-br%2Fwiki%2FMike_Wazowski&psig=AOvVaw0UJ-SY5zDaS9UDEzToUTtd&ust=1713574290600000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjp1OuHzYUDFQAAAAAdAAAAABAJ"
                }
            });
            equal(response.statusCode, 401); 
        });

        test('# DELETE /categories', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const response = await app.inject({
                method: 'DELETE',
                url: '/products/6623e594a5a68e1749fff3eb',
                body: {
                    "name": "Categoria de teste",
                    "img_URL" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fpt-br%2Fwiki%2FMike_Wazowski&psig=AOvVaw0UJ-SY5zDaS9UDEzToUTtd&ust=1713574290600000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjp1OuHzYUDFQAAAAAdAAAAABAJ"
                }
            });
            equal(response.statusCode, 401); 
        });


        test('# POST /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2lzc2EiLCJpYXQiOjE3MTMzOTY5MTF9.HdqQ_JEXCjo4YdCsLlbecupzwAqZVaWPM4dd_ICdjZ0"
                }, 
                body : {
                    "name": "Categoria de teste"
                }
            });
            equal(response.statusCode, 400); 
        });

        test('# POST /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                body : {
                    "name": "NovaCat",
                    "img" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fpt-br%2Fwiki%2FMike_Wazowski&psig=AOvVaw0UJ-SY5zDaS9UDEzToUTtd&ust=1713574290600000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjp1OuHzYUDFQAAAAAdAAAAABAJ"
                }
            });
            equal(response.statusCode, 401); 
        });

        test('# PUT /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/categories',
                body : {
                    "name": "Categoria de teste",
                    "img" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fpt-br%2Fwiki%2FMike_Wazowski&psig=AOvVaw0UJ-SY5zDaS9UDEzToUTtd&ust=1713574290600000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjp1OuHzYUDFQAAAAAdAAAAABAJ"
                }
            });
            equal(response.statusCode, 404); 
        });

    });
}); 

