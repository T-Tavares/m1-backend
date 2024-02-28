export type T_Error = {
    ok?: boolean;
    error?: string;
};

// ------------------- getCarValue() INTERFACE -------------------- //

export type T_CarValueInput = {
    car_model: string;
    car_year: number;
};

export type CarValueOutput = {
    car_value: number;
};

export type T_CarValueOutput = CarValueOutput | T_Error;

// ------------------ getRiskRating() INTERFACE ------------------- //

export type T_RatingInput = {
    claim_history: string;
};

export type RatingOutput = {
    risk_rating: number;
};

export type T_RatingOutput = RatingOutput | T_Error;

// ---------------- getInsuranceQuote() INTERFACE ----------------- //

// Added String and Null to play around with jest tests, But I believe
// they're not necessary at all.

export type T_QuoteInput = {
    car_value: number;
    risk_rating: number;
};
export type QuoteOutput = {
    monthly_premium: number;
    yearly_premium: number;
};

export type T_QuoteOutput = QuoteOutput | T_Error;

// -------------- getInsuranceRepute() INTERFACE -------------- //

export type T_DriverInfoInput = {
    driver_name: string;
};

// Interface to Output Layout of Insurance Repute
export type T_ReputeOutput_Layout = {
    driverName: string;
    carModel: string;
    carYear: number;
    riskRating: number;
    carValue: number;
    monthlyPremium: number;
    yearlyPremium: number;
};

// Type Input Entry
export type T_Entry = {
    driver_name: string;
    car_model: string;
    car_year: number;
    claim_history: string;
};

export type T_InsuranceReputeInput = T_CarValueInput & T_RatingInput & T_DriverInfoInput;
export type T_InsuranceReputeOutput = T_ReputeOutput_Layout | T_Error;

export type T_MultiReputesInput = {entriesArr: T_Entry[]};
