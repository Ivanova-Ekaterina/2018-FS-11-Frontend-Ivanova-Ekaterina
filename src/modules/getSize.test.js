import { getReadableSize } from './getSize'

describe('Type of return value', () => {
    it('Function returns something', () => {
        expect(getReadableSize(10)).not.toBeNaN();
    });
    it('Function returns string', () => {
        expect(typeof(getReadableSize(10))).toBe('string');
    });
    it('Function does not return number', () => {
        expect(typeof(getReadableSize(10))).not.toBe('number');
    });
    it('Function returns boolean if  value less zero', () => {
        expect(typeof(getReadableSize(-10))).toBe('boolean');
    });
});

describe('Function returns right size', () => {
    it('-1000 is false', () => {
        expect(getReadableSize(-1000)).toBe(false);
    });
    it('0 is 0 bytes', () => {
        expect(getReadableSize(0)).toBe('0 bytes');
    });
    it('1000 is 1000 bytes', () => {
        expect(getReadableSize(1000)).toBe('1000 bytes');
    });
    it('1024 is 1 KB', () => {
        expect(getReadableSize(1024)).toBe('1.00 KB');
    });
    it('1500 is 1.46 KB', () => {
        expect(getReadableSize(1500)).toBe('1.46 KB');
    });
    it('1048576 is 1 MB', () => {
        expect(getReadableSize(1048576)).toBe('1.00 MB');
    });
    it('1548576 is 1.46 KB', () => {
        expect(getReadableSize(1548576)).toBe('1.48 MB');
    });
    it('1073741824 is 1 GB', () => {
        expect(getReadableSize(1073741824)).toBe('1.00 GB');
    });
    it('110374182 is 1.03 GB', () => {
        expect(getReadableSize(1103741824)).toBe('1.03 GB');
    });
    it('1024 is not 1.00 MB', () => {
        expect(getReadableSize(1024)).not.toBe('1.00 MB');
    });
    it('0 is not 1.00 KB', () => {
        expect(getReadableSize(0)).not.toBe('1.00 KB');
    });
    it('1073741823 is not 1 GB', () => {
        expect(getReadableSize(1073741823)).not.toBe('1.00 GB');
    });
    it('-10 is 10 bytes', () => {
        expect(getReadableSize(-10)).not.toBe('10 bytes');
    });
});
describe('Function does not accept incorrect types', () => {
    it('String is not accepted', () => {
        expect(getReadableSize('Hi')).toBe(false);
    });
    it('Boolean is not accepted', () => {
        expect(getReadableSize(true)).toBe(false);
    });
    it('True is not accepted', () => {
        expect(getReadableSize(true)).not.toBe(true);
    });
    it('Empty is not accepted', () => {
        expect(getReadableSize()).toBe(false);
    });
    it('Object is not accepted', () => {
        expect(getReadableSize({"value": 30})).toBe(false);
    });
});