

export default class Usuarios {

    constructor(pool) {
        this.pool = pool;
    }

    async allusers() {
        const con = await this.pool.connect();
        try {
            
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    }

}
