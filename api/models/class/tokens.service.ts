import { Pool } from "pg";
import genid from '../../bin/ids/gen.id.js';
import { createError } from "../../middleware/err/create.err.js";

export default class Tokens {

    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async createToken(user_id: number, token: string): Promise<void> {
        const con = await this.pool.connect();
        try {
            const query = {text: `INSERT INTO tokens (id, user_id, token) VALUES ($1, $2, $3) RETURNING *`, values: [genid(), user_id, token]};
            const result = await this.pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
