import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash('delaoserna', salt);        
        return hashed;
    } catch (error) {
        throw error;
    }
}


export async function hashCompare(hashcompare: string, hash: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(hashcompare, hash);
        return result;
    } catch (error) {
        throw error;
    }    
}