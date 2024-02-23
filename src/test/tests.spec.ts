// ---------------------- UNIT TESTS IMPORTS ---------------------- //

import {getCarValue, getRiskRating, getInsuranceQuote, generateInsuranceQuote} from '../services/services';

// ------------------- getCarValue() UNIT TEST -------------------- //

describe('getCarValue', () => {
    it('Should return Car Value as a number', () => {
        // ARRANGE
        const carInput = {
            model: 'Civic',
            year: 2014,
        };
        const expected = {car_value: 6614};

        // ACT
        const actual = getCarValue(carInput);

        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});

// ------------------ getRiskRating() UNIT TEST ------------------- //

describe('getRiskRating', () => {
    it('Should return a Risk Rating as a number', () => {
        // ARRANGE
        const claimInput = {
            claim_history: `My only claim was a crash into my house's garage door that left a scratch and bump on my car. There are no other crashes nor collisions.`,
        };
        const expected = {risk_rating: 5};

        // ACT
        const actual = getRiskRating(claimInput);

        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});

// ---------------- getInsuranceQuote() UNIT TEST ----------------- //

describe('getInsuranceQuote', () => {
    it('Should return a Insurance Quote', () => {
        // ARRANGE
        const valueAndRatingInput = {car_value: 6614, risk_rating: 5};
        const expected = {monthly_premium: 27.5, yearly_premium: 330};

        // ACT
        const actual = getInsuranceQuote(valueAndRatingInput);

        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});

// ------------ generateInsuranceQuote() MVP UNIT TEST ------------ //

describe('MVP API test', () => {
    it('Should receive a car model/year and driver claim. With that generate a Insurance Quote', () => {
        // ARRANGE
        const driverAndCarInput = {
            model: 'Civic',
            year: 2014,
            claim_history: `My only claim was a crash into my house's garage door that left a scratch and bump on my car. There are no other crashes nor collisions.`,
        };
        const expected = {monthly_premium: 27.5, yearly_premium: 330};

        // ACT
        const actual = generateInsuranceQuote(driverAndCarInput);

        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});
