import { Request, Response, NextFunction } from 'express';

export function routeErrorHandling(err: any, req: Request, res: Response, next: NextFunction) {
    if(err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Datos duplicados, ingrese uno corractamente'
            }
        });
    } else if (err.code === 'ER_BAD_DB_ERROR') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'La base de datos especificada no existe'
            }
        });
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        res.status(403).json({
            Error: {
                Code: 403,
                Message: 'Acceso denegado para el usuario'
            }
        });
    } else if (err.code === 'ER_BAD_TABLE_ERROR') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'La tabla especificada no existe'
            }
        });
    } else if (err.code === 'ER_SYNTAX_ERROR' || err.code === 'ER_PARSE_ERROR') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Error de sintaxis en la consulta SQL'
            }
        });
    } else if (err.code === 'ER_NO_SUCH_TABLE') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'No existe tal tabla'
            }
        });
    } else if (err.code === 'ER_BAD_FIELD_ERROR') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Columna desconocida en la consulta'
            }
        });
    } else if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'No se puede eliminar o actualizar una fila porque está referenciada en una tabla relacionada'
            }
        });
    } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'No se puede añadir o actualizar una fila porque una fila relacionada no existe'
            }
        });
    } else if (err.code === 'ER_DATA_TOO_LONG') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Los datos son demasiado largos para la columna'
            }
        });
    } else if (err.code === 'ER_WRONG_VALUE_COUNT_ON_ROW') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'El recuento de columnas no coincide con el recuento de valores'
            }
        });
    } else if (err.code === 'ER_WRONG_VALUE_FOR_TYPE') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Valor incorrecto para el tipo de columna'
            }
        });
    } else if (err.code === 'ER_CONSTRAINT_FAILED') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Error al verificar una restricción CHECK'
            }
        });
    } else if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Valor truncado incorrecto para el campo'
            }
        });
    } else if (err.message && err.message.includes('Bind parameters must not contain undefined')) {
        res.status(400).json({
            Error: {
                Code: 400,
                Message: 'Los parámetros de la consulta no deben contener undefined. Para pasar NULL en SQL, especifica JS null.'
            }
        });
    } else {
        res.status(err.status || 404).json({
            Error: {
                Code: err.status,
                Message: err.message
            }
        });
    }
    next(err);
}

export function notFoundRouter(req: Request, res: Response, next: NextFunction) {
    const error = new Error('Ruta no encontrada') as Error & { status: number };
    error.status = 404;
    next(error);
}