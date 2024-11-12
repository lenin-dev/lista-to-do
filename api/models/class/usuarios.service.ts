import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";
import { hashPassword, hashCompare } from "../../bin/hashs/encrypt.js";

export default class Usuarios {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async allusers() {
        const con = await this.pool.connect();
        try {
            const rows = await con.query(`SELECT u.idusuario, u.usuario, 
                array_agg(
                    jsonb_build_object(
                        'idfuncion', f.idfuncion,
                        'funcion', f.funcion,
                        'descripcion', f.descripcion
                    )
                ) AS funciones,
            u.fechacreacion
            FROM usuarios AS u
            JOIN funciones_usuarios AS fu ON u.idusuario = fu.idusuario
            JOIN funciones AS f ON fu.idfuncion = f.idfuncion
            GROUP BY u.idusuario, u.usuario`);
            if(rows.rows.length === 0) { createError('No hay ningun usuario almacenado', 400); }
            return rows.rows;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    public async login(usuario: string, password: string): Promise<boolean> {
        const con = await this.pool.connect();
        try {
            const rows = await con.query('SELECT usuario, password FROM usuarios WHERE usuario = $1', [usuario]);
            if(rows.rowCount === 0) { createError('El usuario no existe', 400); }
            const hash = rows.rows[0].password;
            const hashPass = await hashCompare(password, hash);
            return hashPass;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    public async adduser(usuario: string, password: string, fecha: string) {
        const con = await this.pool.connect();
        try {
            const hashPass = await hashPassword(password);
            const id = await genid();

            const rows = await con.query('INSERT INTO usuarios(idusuario, usuario, password, fechacreacion) VALUES ($1, $2, $3, $4) RETURNING *', [id, usuario, hashPass, fecha]);
            if(rows.rows.length === 0) { createError('No se logro agregar el usuario', 400); }
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
