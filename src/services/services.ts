// ----------------------- SERVICES IMPORTS ----------------------- //

import {
    I_CarValueInput,
    I_CarValueOutput,
    I_RatingInput,
    I_RatingOutput,
    I_QuoteInput,
    I_QuoteOutput,
    I_GenerateQuoteInput,
} from '../models/interfaces';

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

export const getCarValue = (inputObj: I_CarValueInput): I_CarValueOutput => {
    /*   
        getCarValue Bussiness formula:
        Sum of characters indexes ( a = 1 ... z = 26) multiplied by 100 plus the car year
        carValue = (indexesSum * 100 ) + year     
    */

    const {model, year} = inputObj;

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

export const getRiskRating = (inputObj: I_RatingInput): I_RatingOutput => {
    /* 
        getRiskRating Bussiness formula:
        Count how many of the rating words are on the claim. Adds 1 for each occurence. (min = 1 ; max = 5)
        Returns {risk_rating: number}
    */

    const {claim_history: claimStr} = inputObj;

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

export const getInsuranceQuote = (insuranceInput: I_QuoteInput): I_QuoteOutput => {
    /* 
        getInsuranceQuote Bussiness formule:
        Car Value multiplied by driver Rating divided by 100
    */

    const {car_value: value, risk_rating: rating} = insuranceInput;

    const quote = Math.floor((value * rating) / 100);
    const monthly_quote = quote / 12;
    console.log(quote);
    console.log(monthly_quote);

    return {monthly_premium: monthly_quote, yearly_premium: quote};
};

// ---------------------------------------------------------------- //
// ---------------- GENERATE INSURANCE QUOTE MVP  ----------------- //
// ---------------------------------------------------------------- //

export const generateInsuranceQuote = (driverAndCarInput: I_GenerateQuoteInput): I_QuoteOutput => {
    /* 
        MVP Unit Test with all functions flowing together
    */

    const {model, year, claim_history} = driverAndCarInput;

    const {car_value} = getCarValue({model: model, year: year});
    const {risk_rating} = getRiskRating({claim_history: claim_history});
    const quote = getInsuranceQuote({car_value: car_value as number, risk_rating: risk_rating});

    return quote;
};
