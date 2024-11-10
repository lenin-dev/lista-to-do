import { customAlphabet } from 'nanoid';
import pool from '../../config/postgresql/connection.js';

async function idSearch() {
    let idUsu;
    let isUnique: boolean = false;
    const alfanumericos: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(alfanumericos, 4);

    while (!isUnique) {
        idUsu = nanoid();
        isUnique = !(await buscarIdUsu(idUsu));
    }
    return idUsu;
}

async function buscarIdUsu(buscar: string) {
    const con = await pool.connect();
    try {
        const rows = await con.query('SELECT * FROM pagos WHERE idpago = $1', [buscar]);
        return (rows.rowCount === 0) ? false : true;

    } catch(err) {
        console.log(`Error al buscar el id ${buscar}: ${err}`);
    } finally {
        con.release();
    }
}

export default idSearch;
