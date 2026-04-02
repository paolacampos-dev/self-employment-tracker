export const TAX_YEARS = {
    "2026/27": {
        label: "2026/27",
        personalAllowance: 12570,

        incomeTaxBands: [
            { name: "basic", upTo: 37700, rate: 0.20 },
            { name: "higher", upTo: 125140 - 12570, rate: 0.40 },
            { name: "additional", upTo: Infinity, rate: 0.45 },
        ],

        class2: {
            smallProfitsThreshold: 6845,
        },

        class4: {
            lowerProfitsLimit: 12570,
            upperProfitsLimit: 50270,
            mainRate: 0.06,
            upperRate: 0.02,
        },

        paymentsOnAccount: {
            threshold: 1000,
            firstDueLabel: "31 January",
            secondDueLabel: "31 July",
        },
    },
};

/*      "2027/28": {
        label: "2027/28",
        personalAllowance: 12570,

        incomeTaxBands: [
            { name: "basic", upTo: 37700, rate: 0.20 },
            { name: "higher", upTo: 125140 - 12570, rate: 0.40 },
            { name: "additional", upTo: Infinity, rate: 0.45 },
        ],

        class2: {
            smallProfitsThreshold: 6845,
        },

        class4: {
            lowerProfitsLimit: 12570,
            upperProfitsLimit: 50270,
            mainRate: 0.06,
            upperRate: 0.02,
        },

        paymentsOnAccount: {
            threshold: 1000,
            firstDueLabel: "31 January",
            secondDueLabel: "31 July",
        },
    },*/