/* 
    Functions to Double check inputs and trigger errors 
*/
import {I_Error} from '../models/interfaces';

// ------------------------- ERRORS MAP  -------------------------- //

const ERR_MAP = {
    // YEAR ERRORS
    NEGATIVE_YEAR: {error: 'ERROR - Inputed Year is too LOW.'},
    HIGH_YEAR: {error: 'ERROR - Inputed Year on the future.'},
    TYPE_YEAR: {error: 'ERROR - Inputed Year is of the wrong type.'},

    // MODEL ERRORS
    EMPTY_MODEL: {error: 'ERROR - Model Input is EMPTY.'},
    TYPE_MODEL: {error: 'ERROR - Inputed Model is of the wrong type.'},

    // CLAIM ERRORS
    EMPTY_CLAIM: {error: 'ERROR - Claim input is EMPTY.'},
    TYPE_CLAIM: {error: 'ERROR - Inputed Claim is of the wrong type.'},

    // RISK RATING ERRORS
    LOW_RISK_RATING: {error: 'ERROR - Risk Rating value is below 1.'},
    HIGH_RISK_RATING: {error: 'ERROR - Risk Rating value is above 5.'},

    // CAR VALUE ERRORS
    LOW_CAR_VALUE: {error: 'ERROR - Car value is too low.'},
};

// ----------------------- CAR YEAR CHECK  ------------------------ //

export const isYearOk = (year: number): I_Error => {
    //
    const currYear = +new Date().getFullYear;

    if (year < 1900) return ERR_MAP.NEGATIVE_YEAR;
    if (year > currYear) return ERR_MAP.HIGH_YEAR;
    if (typeof year != 'number') return ERR_MAP.TYPE_YEAR;

    return {ok: true};
};

// ----------------------- CAR MODEL CHECK  ----------------------- //

export const isModelOk = (model: string): I_Error => {
    //
    if (typeof model != 'string') return ERR_MAP.TYPE_MODEL;
    if (model.trim() === '') return ERR_MAP.EMPTY_MODEL;

    return {ok: true};
};

// --------------------- DRIVER CLAIM CHECK  ---------------------- //

export const isClaimOk = (claim_history: string): I_Error => {
    //
    if (typeof claim_history != 'string') return ERR_MAP.TYPE_CLAIM;
    if (claim_history.trim() === '') return ERR_MAP.EMPTY_CLAIM;

    return {ok: true};
};

// ---------------------- RISK RATING CHECK ----------------------- //

export const isRiskRatingOk = (riskRating: number): I_Error => {
    //
    if (riskRating < 1) return ERR_MAP.LOW_RISK_RATING;
    if (riskRating > 5) return ERR_MAP.HIGH_RISK_RATING;

    return {ok: true};
};

// ----------------------- CAR VALUE CHECK ------------------------ //

export const isCarValueOk = (carValue: number): I_Error => {
    //
    if (carValue < 0) return ERR_MAP.LOW_CAR_VALUE;
    return {ok: true};
};
