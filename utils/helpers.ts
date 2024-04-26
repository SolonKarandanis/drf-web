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

export {
    isNonNull,
    getValueOrFallback,
    isStringValue,
}