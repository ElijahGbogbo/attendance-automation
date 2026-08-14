
export class CustomAPIError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomAPIError";

        // Fix prototype chain when extending built-in classes
        Object.setPrototypeOf(this, CustomAPIError.prototype);
    }
}

export function createCustomError(msg: string, statCode: number): CustomAPIError {
    return new CustomAPIError(msg, statCode);
}
