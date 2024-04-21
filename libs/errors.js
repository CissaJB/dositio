import createError from '@fastify/error';

export const AUTH_NO_TOKEN = createError(
    'AUTH_NO_TOKEN', 
    'No token was found on request headers.', 
    401
);

export const AUTH_INVALID_TOKEN = createError(
    'AUTH_INVALID_TOKEN', 
    'The token provided is invalid.', 
    401
);

export const NOT_FOUND = createError(
    'NOT_FOUND',
    'The requested resource could not be found.',
    404
);

export const ALREADY_EXISTS = createError(
    'ALREADY_EXISTS',
    'This resource already exists in database.',
    412
);

// Tentando o Desafio Adicional
/* export const NOT_ADMIN = createError(
    'NOT_ADMIN',
    'Only Admin can do this thing.',
    401
); */