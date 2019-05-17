const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;
const KB = 1024;

export const getReadableSize = function f(size) {
    if (typeof(size) !== 'number')
        return false;
    if (size / GB >= 1) {
        return `${(size / GB).toFixed(2)} GB`;
    }
    if (size / MB >= 1) {
        return `${(size / MB).toFixed(2)} MB`;
    }
    if (size / KB >= 1) {
        return `${(size / KB).toFixed(2)} KB`;
    }
    if (size < 0)
        return false;
    return `${size} bytes`;
};

