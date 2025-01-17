export interface ErrorResponse{
    status:number;
    data:ValidationErrorData;
}

export interface ErrorData{
    detail:string;
}

export interface BackendValidationError{
    kind:"backend"
    status:number;
    data:ValidationErrorData[]
}

export interface ValidationErrorData{
    [key: string]: string[];
}

export interface ClientValidationError{
    kind:"client"
    error:string;
}

export type ValidationError = BackendValidationError | ClientValidationError