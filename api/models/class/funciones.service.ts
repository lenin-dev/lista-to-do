import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";

export default class Funciones {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async allfunciones(){
        const con = await this.pool.connect();
        try {
            const rows = await con.query('SELECT * FROM funciones');
            if(rows.rowCount === 0) { createError('No se pudo obtener la información de las funciones', 404); }
            return rows.rows;
        } catch (error) {
         throw error;   
        } finally {
            con.release();
        }
    }

    async onefunciones(idfuncion: string, funcion: string) {
        const con = await this.pool.connect();
        try {
            const rows = await con.query('SELECT * FROM funciones WHERE idfuncion = $1 OR funcion = $2', [idfuncion, funcion]);
            return rows.rows;
        } catch (error) {
            throw error;   
        } finally {
            con.release();
        }
    }

}