import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";
import { hashPassword, hashCompare } from "../../bin/hashs/encrypt.js";

export default class Usuarios {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async oneusers() {
        const con = await this.pool.connect();
        try {
            const rows = await con.query('SELECT * FROM usuarios');
            if(rows.rows.length === 0) { createError('No hay ningun usuario almacenado', 400); }
            return rows.rows;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    async adduser(usuario: string, password: string): Promise<void> {
        const con = await this.pool.connect();
        try {
            const hashPass = await hashPassword(password);
            const id = await genid();

            const rows = await con.query('INSERT INTO usuarios(idusuario, usuario, password, fechacreacion) VALUES ($1, $2, $3, $4) RETURNING *', [id, usuario, hashPass, new Date()]);
            if(rows.rows.length === 0) { createError('No se logro agregar el usuario', 400); }
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
