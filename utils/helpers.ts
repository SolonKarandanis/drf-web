function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && typeof value !== "undefined";
}

function getValueOrFallback(
    value: string | null | undefined,
    fallback: string,
): string {
    return isNonNull(value) ? value : fallback;
}

export {
    isNonNull,
    getValueOrFallback,
}