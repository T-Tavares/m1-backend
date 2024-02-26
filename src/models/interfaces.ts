export interface I_Error {
    ok?: boolean;
    error?: string;
}

// ------------------- getCarValue() INTERFACE -------------------- //

export interface I_CarValueInput {
    model: string;
    year: number;
}
export interface I_CarValueOutput {
    car_value: number;
}

export type T_CarValueOutput = I_CarValueOutput | I_Error;

// ------------------ getRiskRating() INTERFACE ------------------- //

export interface I_RatingInput {
    claim_history: string;
}
export interface I_RatingOutput {
    risk_rating: number;
}

export type T_RatingOutput = I_RatingOutput | I_Error;

// ---------------- getInsuranceQuote() INTERFACE ----------------- //

export interface I_QuoteInput {
    car_value: number;
    risk_rating: number;
}
export interface I_QuoteOutput {
    monthly_premium: number;
    yearly_premium: number;
}

export type T_QuoteOutput = I_QuoteOutput | I_Error;

// -------------- generateInsuranceQuote() INTERFACE -------------- //

export type T_GenerateQuoteInput = I_CarValueInput & I_RatingInput;
export type T_GenerateQuoteOutput = I_QuoteOutput | I_Error;
