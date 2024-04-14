import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
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
    });

    describe('##Bad Requests', async(t) => {
    });
});

describe('###Tests for Authenticated routes', async(t) => {
    describe('## Success Requests', async (t) => {
        test('# POST /products', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
    
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    
            const response = await app.inject({
                method: 'POST',
                url: '/products',
                headers: {
                    'x-access-token': token,
                },
            });
    
            equal(response.statusCode, 201); 
        });
    });
}); 
