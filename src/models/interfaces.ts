export interface I_Error {
    ok?: boolean;
    error?: string;
}

// ------------------- getCarValue() INTERFACE -------------------- //

export interface I_CarValueInput {
    car_model: string;
    car_year: number;
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

// -------------- getInsuranceRepute() INTERFACE -------------- //

export interface I_DriverInfoInput {
    driver_name: string;
}

// Interface to Output Layout of Insurance Repute
export interface I_ReputeOutput_Layout {
    driverName: string;
    carModel: string;
    carYear: number;
    riskRating: number;
    carValue: number;
    monthlyPremium: number;
    yearlyPremium: number;
}

export type T_InsuranceReputeInput = I_CarValueInput & I_RatingInput & I_DriverInfoInput;
export type T_InsuranceReputeOutput = I_ReputeOutput_Layout | I_Error;
