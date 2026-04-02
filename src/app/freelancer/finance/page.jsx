import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/dbConnection";
import calculateTax from "@/utils/calculateTax";
import { TAX_YEARS } from "@/utils/taxYears";
import TaxYearSelect from "@/components/TaxYearSelect";
import expensesByHMRC from "@/utils/hmrcExpenses"
import ExpensesBreakdownToggle from "@/components/ExpensesBreakdownToggle";

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(Number(amount) || 0);
}

export default async function FinancePage({ searchParams }) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/signin");
    }

    const selectedTaxYear = searchParams.year || "2026/27";

    const incomeResult = await db.query(
        `
        SELECT COALESCE(SUM(amount), 0) AS total_income
        FROM invoices
        WHERE user_id = $1
        AND status = 'Paid'
        `,
        [userId]
    );

    const expensesResult = await db.query(
        `
        SELECT COALESCE(SUM(amount), 0) AS total_expenses
        FROM expenses
        WHERE user_id = $1
        `,
        [userId]
    );

    const income = Number(incomeResult.rows[0]?.total_income || 0);
    const expenses = Number(expensesResult.rows[0]?.total_expenses || 0);

    const profit = Math.max(0, income - expenses);

    const tax = calculateTax({
        taxYear: selectedTaxYear,
        profit,
    });

    const expensesGroupedResult = await db.query(
        `
        SELECT category, COALESCE(SUM(amount), 0) AS total
        FROM expenses
        WHERE user_id = $1
        GROUP BY category
        `,
        [userId]
    );
    const hmrcExpenses = expensesByHMRC(expensesGroupedResult.rows);

    const monthlyTaxSaving = tax.totalDue / 12;
    const showPaymentWarning = tax.paymentOnAccount > 0;

    return (
        <div className="app-page-spacing">
            <div className="app-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">

                    {/* Left Side --> title */}
                    <div>
                        {/*<h1 className="text-xl sm:text-2xl font-semibold">Finance</h1>*/}
                        <p className="text-sm text-gray-600">
                            HMRC estimate
                        </p>
                    </div>

                    {/* RIGHT SIDE → selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Tax year</span>
                        <TaxYearSelect options={Object.keys(TAX_YEARS)} />
                    </div>
                </div>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Summary</h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Income</p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(income)}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Expenses</p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(expenses)}
                            </p>
                            <ExpensesBreakdownToggle
                                data={hmrcExpenses}
                            />
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Profit</p>
                            <p className="text-xl font-semibold text-green-600">
                                {formatCurrency(profit)}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Taxable income</p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(tax.taxableIncome)}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Estimated tax bill</h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Income Tax</p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(tax.incomeTax)}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Class 4 NI</p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(tax.class4NI)}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4 sm:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">Estimated total due</p>
                            <p className="text-2xl font-semibold text-red-600 ">
                                {formatCurrency(tax.totalDue)}
                            </p>

                            <p className="text-sm text-gray-600 mt-2">
                                Save {formatCurrency(monthlyTaxSaving)} per month
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">National Insurance</h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Class 2:</p>
                            <p className="text-sm text-gray-600 underline mt-2">
                                Threshold: {formatCurrency(tax.class2SmallProfitsThreshold)}
                            </p>
                            <p className="font-semibold">
                                {tax.class2Status === "treated_as_paid" ? (
                                "Covered (no payment required)"
                                ) : (
                                    <>
                                    Voluntary only{" "}
                                    <span className="text-xs text-gray-500 font-normal">
                                        (below threshold)
                                    </span>
                                    </>
                                    )}
                            </p>

                            {tax.class2Status === "voluntary_only" && (
                            <label className="flex items-center gap-2 mt-3">
                                <input
                                    type="checkbox"
                                    name="payClass2"
                                    className="accent-black"
                                />
                                <span className="text-sm font-medium">
                                    ~ £182/year
                                </span>
                                <span className="text-xs text-gray-500 ml-4">
                                    Protects your State Pension
                                </span>
                            </label>
                            )}
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Personal Allowance</p>
                            <p className="font-semibold">
                                {formatCurrency(tax.personalAllowance)}
                            </p>
                        </div>
                        </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Payments on account</h2>

                    {/* GRID */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">
                                {tax.firstPaymentOnAccountLabel}
                            </p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(tax.paymentOnAccount)}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">
                                {tax.secondPaymentOnAccountLabel}
                            </p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(tax.paymentOnAccount)}
                            </p>
                        </div>
                    </div>

                    {/* WARNING OUTSIDE GRID */}
                    {showPaymentWarning && (
                    <div className="border rounded-xl p-1 m-2">
                        <p className="text-sm pl-4">
                            You may need to pay HMRC in January.
                        </p>
                    </div>
                    )}
            </section>

                <section>
                    <h2 className="text-lg font-semibold mb-3">Breakdown</h2>

                    <div className="border rounded-xl p-4">
                        <ul className="flex flex-col gap-3">
                            {tax.incomeTaxBreakdown.map((band) => (
                            <li
                                key={band.name}
                                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                            >
                            <div>
                                <p className="font-medium capitalize">{band.name} rate</p>
                                <p className="text-sm text-gray-600">
                                    {(band.rate * 100).toFixed(0)}% on{" "}
                                    {formatCurrency(band.amount)}
                                </p>
                            </div>

                            <p className="font-semibold">
                                {formatCurrency(band.tax)}
                            </p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="mt-6">
                    <p className="text-sm font-medium">
                        Estimate only.
                    </p>
                    <p className="text-xs text-gray-500 mt-0">
                        This version does not yet include student loans, pensions,
                        Scottish tax bands, CIS deductions, or other tax reliefs.
                    </p>
                </div>
                
            </div>
        </div>
    );
}