/**
 * Parses a string input into a number, handling localized digits (Arabic/Persian).
 * Returns NaN if the input is invalid or empty.
 * @param {string|number} input - The input value to parse.
 * @returns {number} The parsed number or NaN.
 */
export const parseLocalizedNumber = (input) => {
    if (input === null || input === undefined || input === '') {
        return NaN;
    }

    if (typeof input === 'number') {
        return input;
    }

    const strInput = String(input);

    // Map Arabic and Persian numerals to Western numerals
    const westernDigits = strInput
        .replace(/[٠۰]/g, '0')
        .replace(/[١۱]/g, '1')
        .replace(/[٢۲]/g, '2')
        .replace(/[٣۳]/g, '3')
        .replace(/[٤۴]/g, '4')
        .replace(/[٥۵]/g, '5')
        .replace(/[٦۶]/g, '6')
        .replace(/[٧۷]/g, '7')
        .replace(/[٨۸]/g, '8')
        .replace(/[٩۹]/g, '9');

    return parseFloat(westernDigits);
};
