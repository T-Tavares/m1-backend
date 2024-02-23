// ------------------- getCarValue() INTERFACE -------------------- //

export interface I_CarValueInput {
    model: string;
    year: number;
}
export interface I_CarValueOutput {
    car_value: number | string;
}

// ------------------ getRiskRating() INTERFACE ------------------- //

export interface I_RatingInput {
    claim_history: string;
}
export interface I_RatingOutput {
    risk_rating: number;
}

// ---------------- getInsuranceQuote() INTERFACE ----------------- //

export interface I_QuoteInput {
    car_value: number;
    risk_rating: number;
}
export interface I_QuoteOutput {
    monthly_premium: number;
    yearly_premium: number;
}

// -------------- generateInsuranceQuote() INTERFACE -------------- //

export type I_GenerateQuoteInput = I_CarValueInput & I_RatingInput;
export type I_GenerateQuoteOutput = I_QuoteOutput;
