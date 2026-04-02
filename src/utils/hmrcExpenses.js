import { HMRC_MAPPING } from "@/utils/expenseCategories";

export default function expensesByHMRC(expenses) {
    const result = {};

    for (const [hmrcCategory, categories] of Object.entries(HMRC_MAPPING)) {
        result[hmrcCategory] = 0;

        categories.forEach((category) => {
        const match = expenses.find((expense) => expense.category === category);
            if (match) {
                result[hmrcCategory] += Number(match.total);
            }
        });
    }

    return result;
}