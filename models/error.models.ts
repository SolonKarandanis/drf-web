export interface ErrorResponse{
    status:number;
    data:ErrorData;
}

export interface ErrorData{
    detail:string;
}