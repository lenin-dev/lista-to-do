import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";

export default class Usuarios {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async allusers() {
        const con = await this.pool.connect();
        try {
            const rows = await con.query('SELECT * FROM usuarios');
            return rows.rows;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    async adduser(usuario: string, password: string): Promise<void> {
        const con = await this.pool.connect();
        const id = await genid();
        try {
            await con.query('INSERT INTO usuarios(idusuario, usuario, password, fechacreacion) VALUES ($1, $2, $3, $4)', [id, usuario, password, new Date()]);
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
