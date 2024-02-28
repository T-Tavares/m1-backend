// ---------------------- UNIT TESTS IMPORTS ---------------------- //

import {getCarValue, getRiskRating, getInsuranceQuote, getInsuranceRepute} from '../services/services';

// ------------------- getCarValue() UNIT TEST -------------------- //

describe('getCarValue', () => {
    it('Correct Input => Should return Car Value as a number.', () => {
        // ARRANGE
        const carInput = {car_model: 'Civic', car_year: 2014};
        const expected = {car_value: 6614};
        // ACT
        const actual = getCarValue(carInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });

    it('Negative YEAR => Should return ERROR', () => {
        // ARRANGE
        const carInput = {car_model: 'Civic', car_year: -914};
        const expected = {error: 'ERROR - Inputed Year is too LOW.'};
        // ACT
        const actual = getCarValue(carInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });

    it('Empty MODEL input => Should return ERROR.', () => {
        // ARRANGE
        const carInput = {car_model: '', car_year: 2014};
        const expected = {error: 'ERROR - Model Input is EMPTY.'};
        // ACT
        const actual = getCarValue(carInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});

// ------------------ getRiskRating() UNIT TEST ------------------- //

describe('getRiskRating', () => {
    it('Correct Input => Should return a Risk Rating as a number.', () => {
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

    it('Empty CLAIM => Should return an ERROR.', () => {
        // ARRANGE
        const claimInput = {claim_history: ''};
        const expected = {error: 'ERROR - Claim input is EMPTY.'};
        // ACT
        const actual = getRiskRating(claimInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});

// ---------------- getInsuranceQuote() UNIT TEST ----------------- //

describe('getInsuranceQuote', () => {
    it('Should return a Insurance Quote.', () => {
        // ARRANGE
        const valueAndRatingInput = {car_value: 6614, risk_rating: 5};
        const expected = {monthly_premium: 27.5, yearly_premium: 330};
        // ACT
        const actual = getInsuranceQuote(valueAndRatingInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });

    it('Empty/Low CAR VALUE => Should return an ERROR.', () => {
        // ARRANGE
        const valueAndRatingInput = {car_value: 90, risk_rating: 5};
        const expected = {error: 'ERROR - Car value is too low.'};
        // ACT
        const actual = getInsuranceQuote(valueAndRatingInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });

    /*  
        Not necessary because of typescript. Even before the test it flags the wrong type.
        Left it here as reference.

        it('Wrong CAR VALUE Input => Should return an ERROR.', () => {
            // ARRANGE
            const valueAndRatingInput = {car_value: 'a', risk_rating: 5};
            const expected = {error: 'ERROR - Car value is of the wrong type.'};
            // ACT
            const actual = getInsuranceQuote(valueAndRatingInput);
            // ASSERT
            expect(actual).toStrictEqual(expected);
        }); 
    */
});

// ------------ generateInsuranceQuote() MVP UNIT TEST ------------ //

describe('MVP API test', () => {
    it('Should receive a car model/year and driver claim. With that generate a Insurance Quote.', () => {
        // ARRANGE
        const driverAndCarInput = {
            driver_name: 'Henry',
            car_model: 'Honda',
            car_year: 2020,
            claim_history: "I am an amazing driver. My car has zero bumps and I've never crashed it.",
        };
        const expected = {
            driverName: 'Henry',
            carModel: 'Honda',
            carYear: 2020,
            riskRating: 2,
            carValue: 6220,
            monthlyPremium: 10.3,
            yearlyPremium: 124,
        };
        // ACT
        const actual = getInsuranceRepute(driverAndCarInput);
        // ASSERT
        expect(actual).toStrictEqual(expected);
    });
});
