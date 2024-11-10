
export function createError(message: string, status: number) {
    var error = new Error(message) as Error & { status: number };
    error.status = status;
    throw error;
}

export function createErrorTry(message: string, status: number) {
    var error = new Error(message) as Error & { status: number };
    error.status = status;
    return error;
}