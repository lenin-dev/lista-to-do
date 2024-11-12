import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import Funciones from './funciones.service.js';
// import { createError } from "../../middleware/err/create.err.js";

export default class Funciones_User {

    private pool : Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async allfuncionesuser() {       
        const con = await this.pool.connect();
        try {
            const rowfunuser = await con.query(`SELECT * FROM funciones_usuarios`);
            return rowfunuser.rows;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    async onefuncionesuser(idusuario: string) {       
        const con = await this.pool.connect();
        const funciones = new Funciones(this.pool);
        try {
            const rowfunuser = await con.query(`SELECT * FROM funciones_usuarios WHERE idusuario = $1`, [idusuario]);
            const rowfuncion = await funciones.onefunciones(rowfunuser.rows[0].idfuncion, rowfunuser.rows[0].idusuario);



        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
