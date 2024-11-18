import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";
import { encrypt, decrypt } from '../../bin/crypto/crypto.js';

export default class Cuentas {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async allcuentas() {
        const con = await this.pool.connect();
        try {
            const res = await con.query(`SELECT idcuentas, idusuario, nombre, email, password, fechacreacion FROM cuentas`);
            const datanow = res.rows.map((pass: any) => ({
                idcuentas: pass.idcuentas,
                usuario: pass.usuario,
                nombre: pass.nombre,
                email: pass.email,
                password: decrypt(pass.password),
                fechacreacion: pass.fechacreacion
            }));
            return datanow;
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    public async onecuenta(nombre: string) {
        const con = await this.pool.connect();
        try {
            const res = await con.query(`SELECT c.idcuentas, u.usuario, c.nombre, c.email, c.password, c.fechacreacion FROM cuentas AS c INNER JOIN usuarios AS u ON u.idusuario=c.idusuario WHERE c.nombre LIKE $1`, ['%'+nombre+'%']);
            if(res.rowCount === 0) { throw createError('Cuenta no encontrada', 400); }

            const datanow = res.rows.map((pass: any) => ({
                idcuentas: pass.idcuentas,
                usuario: pass.usuario,
                nombre: pass.nombre,
                email: pass.email,
                password: decrypt(pass.password),
                fechacreacion: pass.fechacreacion
            }));
            return datanow;
        } catch (error) {
            throw error;
        } finally {
            con.release
        }
    }

    public async addcuentas(idusuario: string, nombre: string, email: string, password: string, fechacreacion: string) {
        const con = await this.pool.connect();
        try {
            const id = await genid();
            const encryptedPassword = encrypt(password);

            await this.onecuenta(nombre);
            const res = await con.query(`INSERT INTO cuentas (idcuentas, idusuario, nombre, email, password, fechaCreacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [id, idusuario, nombre, email, encryptedPassword, fechacreacion]);
            return res.rows[0];
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

    public async updatecuentas(idcuentas: string, idusuario: string, nombre: string, email: string, password: string, fechacreacion: string) {
        const con = await this.pool.connect();
        try {
            const datosOld = await this.onecuenta(nombre);
            const passDes = decrypt(datosOld[0].password);
            if(passDes === password) {
                const encryptedPassword = encrypt(password);
                const res = await con.query(`UPDATE cuentas SET idusuario=$1, nombre=$2, email=$3, password=$4, fechaCreacion=$5 WHERE idcuentas=$6 RETURNING *`, [idusuario, nombre, email, encryptedPassword, fechacreacion, idcuentas]);
                return res.rows[0];
            }
            createError('La contraseña no coincide', 400);
        } catch (error) {
            throw error;
        } finally {
            con.release
        }
    }

    public async deletecuentas(idcuentas: string) {
        const con = await this.pool.connect();
        try {
            const res = await con.query(`DELETE FROM cuentas WHERE idcuentas=$1`, [idcuentas]);
        } catch (error) {
            throw error;
        } finally { 
            con.release
        }
    }
}