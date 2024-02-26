// ----------------------- SERVICES IMPORTS ----------------------- //

import {
    I_CarValueInput,
    T_CarValueOutput,
    I_RatingInput,
    T_RatingOutput,
    I_QuoteInput,
    T_QuoteOutput,
    T_GenerateQuoteInput,
    T_GenerateQuoteOutput,
} from '../models/interfaces';

import {isYearOk, isModelOk, isClaimOk, isCarValueOk, isRiskRatingOk} from './error_handlers';
// ---------------------------------------------------------------- //
// ------------------------ GET CAR VALUE ------------------------- //
// ---------------------------------------------------------------- //

// -------------------- GET CAR VALUE HELPERS --------------------- //

const getCharacterNumber = (input: string): number => {
    // Check for non letters characters
    const regex = /[^a-zA-Z]/;
    if (regex.test(input)) return 0;

    // Shift of the Charcode return => just because a.charCodeAt(0) == 97, and we want 1
    const charCodeInxedShift = 96;
    return input.toLowerCase().charCodeAt(0) - charCodeInxedShift;
};

// ----------------------- GET CAR VALUE () ----------------------- //

export const getCarValue = (inputObj: I_CarValueInput): T_CarValueOutput => {
    /*   
        getCarValue Bussiness formula:
        Sum of characters indexes ( a = 1 ... z = 26) multiplied by 100 plus the car year
        carValue = (indexesSum * 100 ) + year     
    */

    const {model, year} = inputObj;

    // ERROR HANDLING
    if (isYearOk(year).error) return isYearOk(year);
    if (isModelOk(model).error) return isModelOk(model);

    // Get sum of characters index
    const modelCharsSum = model
        .split('')
        .map(letter => getCharacterNumber(letter))
        .reduce((acc, currVal) => {
            return acc + currVal;
        }, 0);

    const suggestedValue: number = modelCharsSum * 100 + year;

    return {car_value: suggestedValue};
};

// ---------------------------------------------------------------- //
// ----------------------- GET RISK RATING ------------------------ //
// ---------------------------------------------------------------- //

export const getRiskRating = (inputObj: I_RatingInput): T_RatingOutput => {
    /* 
        getRiskRating Bussiness formula:
        Count how many of the rating words are on the claim. Adds 1 for each occurence. (min = 1 ; max = 5)
        Returns {risk_rating: number}
    */

    const {claim_history: claimStr} = inputObj;

    // ERROR HANDLING
    if (isClaimOk(claimStr).error) return isClaimOk(claimStr);

    // MINIMUM RISK RATING FOR EMPTY CLAIMS
    if (claimStr === '') return {risk_rating: 1};

    const ratingWordsArr = [
        'collide',
        'collided',
        'collisions',
        'collision',
        'crashed',
        'crash',
        'crashes',
        'scratch',
        'scratches',
        'bump',
        'bumps',
        'smash',
    ];

    // Clean and Split string to arr
    const claimArr = claimStr.replaceAll('.', '').split(' ');

    let riskRatingCount = 0;

    // Count Ocurrences
    for (const word of claimArr) {
        if (ratingWordsArr.includes(word)) riskRatingCount++;
    }

    // Round Rating
    if (riskRatingCount < 1) riskRatingCount = 1;
    if (riskRatingCount > 5) riskRatingCount = 5;

    return {risk_rating: riskRatingCount};
};

// ---------------------------------------------------------------- //
// --------------------- GET INSURANCE QUOTE ---------------------- //
// ---------------------------------------------------------------- //

export const getInsuranceQuote = (insuranceInput: I_QuoteInput): T_QuoteOutput => {
    /* 
        getInsuranceQuote Bussiness formule:
        Car Value multiplied by driver Rating divided by 100
    */

    const {car_value, risk_rating} = insuranceInput;

    // ERROR HANDLING
    if (isCarValueOk(car_value).error) return isCarValueOk(car_value);
    if (isRiskRatingOk(risk_rating).error) return isRiskRatingOk(risk_rating);

    const quote = Math.floor((car_value * risk_rating) / 100);
    const monthly_quote = quote / 12;

    return {monthly_premium: monthly_quote, yearly_premium: quote};
};

// ---------------------------------------------------------------- //
// ---------------- GENERATE INSURANCE QUOTE MVP  ----------------- //
// ---------------------------------------------------------------- //

export const generateInsuranceQuote = (driverAndCarInput: T_GenerateQuoteInput): T_GenerateQuoteOutput => {
    /* 
        MVP Unit Test with all functions flowing together
    */

    const {model, year, claim_history} = driverAndCarInput;

    // ERROR HANDLING
    if (isYearOk(year).error) return isYearOk(year);
    if (isModelOk(model).error) return isModelOk(model);
    if (isClaimOk(claim_history).error) return isClaimOk(claim_history);

    /*
        Deconstructing in typescript is a pain, that's the less verbose way I found to solve the errors.

        I have to check the type on the obj because at run time ts/js has no idea on the types that will
        be passed into these functions. For that I called/saved both methods on respective variables,
        and destructured those variables using the in method to narrow the types on those objs.

        This whole thing was triggered by adding a union type I_Error to the outputs. Which is necessary to
        return errors.
    */

    const carValue = getCarValue({model: model, year: year});
    const riskRating = getRiskRating({claim_history: claim_history});

    const {car_value} = 'car_value' in carValue ? carValue : {car_value: -1};
    const {risk_rating} = 'risk_rating' in riskRating ? riskRating : {risk_rating: -1};

    // ERROR HANDLING
    if (isCarValueOk(car_value).error) return isCarValueOk(car_value);
    if (isRiskRatingOk(risk_rating).error) return isRiskRatingOk(risk_rating);

    const quote = getInsuranceQuote({car_value: car_value as number, risk_rating: risk_rating});

    return quote;
};
