import { TAX_YEARS } from "@/utils/taxYears";

export default function calculateTax({ taxYear, profit = 0, payClass2 = false }) {
    const rules = TAX_YEARS[taxYear];

    if (!rules) {
        throw new Error(`Unsupported tax year: ${taxYear}`);
    }

    const safeProfit = Math.max(0, Number(profit) || 0);

    const taxableIncome = Math.max(0, safeProfit - rules.personalAllowance);

    let remainingTaxable = taxableIncome;
    let previousLimit = 0;
    let incomeTax = 0;

    const incomeTaxBreakdown = rules.incomeTaxBands.map((band) => {
        if (remainingTaxable <= 0) {
            return {
                name: band.name,
                rate: band.rate,
                amount: 0,
                tax: 0,
            };
        }

    const bandSize =
        band.upTo === Infinity ? remainingTaxable : band.upTo - previousLimit;

    const amountInBand = Math.min(remainingTaxable, bandSize);
    const taxForBand = amountInBand * band.rate;

    incomeTax += taxForBand;
    remainingTaxable -= amountInBand;
    previousLimit = band.upTo;

    return {
        name: band.name,
        rate: band.rate,
        amount: amountInBand,
        tax: taxForBand,
        };
    });

    const class2Status =
        safeProfit >= rules.class2.smallProfitsThreshold
        ? "treated_as_paid"
        : "voluntary_only";

    const class2Weekly = 3.45;
    const class2Yearly = class2Weekly * 52;
    let class2NI = 0;
    if (profit >= rules.class2.smallProfitsThreshold) {
        class2NI = 0; // treated as paid
    } else if (payClass2) {
        class2NI = class2Yearly;
    }

    const class4MainBand = Math.max(
        0,
        Math.min(safeProfit, rules.class4.upperProfitsLimit) -
        rules.class4.lowerProfitsLimit
    );
    const class4UpperBand = Math.max(
        0,
        safeProfit - rules.class4.upperProfitsLimit
    );
    const class4NI =
        class4MainBand * rules.class4.mainRate +
        class4UpperBand * rules.class4.upperRate;

    const totalDue = incomeTax + class4NI + class2NI;

    const paymentOnAccount =
        totalDue > rules.paymentsOnAccount.threshold ? totalDue / 2 : 0;

    return {
        taxYear: rules.label,
        profit,
        personalAllowance: rules.personalAllowance,
        taxableIncome,
        incomeTax,
        incomeTaxBreakdown,

        class2Status,
        class2NI,
        class2SmallProfitsThreshold: rules.class2.smallProfitsThreshold,

        class4NI,
        class4MainBand,
        class4UpperBand,

        totalDue,
        paymentOnAccount,
        firstPaymentOnAccountLabel: rules.paymentsOnAccount.firstDueLabel,
        secondPaymentOnAccountLabel: rules.paymentsOnAccount.secondDueLabel,
    };
}



