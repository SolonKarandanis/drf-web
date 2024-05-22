import { ErrorData } from "@/models/error.models";

function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && typeof value !== "undefined";
}

function getValueOrFallback(
    value: string | null | undefined,
    fallback: string,
): string {
    return isNonNull(value) ? value : fallback;
}

function isStringValue <T>(value: T| string): value is string {
    return typeof value === 'string';
};

const isErrorData = (response: any): response is ErrorData => (response as ErrorData).detail !== undefined;

const isLoginResponse = (response: any): response is LoginResponse => (response as LoginResponse).access !== undefined;

function capitalizeFirstLetter(input:string) {
    return input.replace(/^\w/, (c) => c.toUpperCase());
}

export {
    isNonNull,
    getValueOrFallback,
    isStringValue,
    isErrorData,
    isLoginResponse,
    capitalizeFirstLetter,
}