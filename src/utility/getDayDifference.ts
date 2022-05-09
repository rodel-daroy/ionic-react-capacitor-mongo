export const getDayDifference = (date_1: Date, date_2: Date): number => {
    const day_1 = date_1.getDate();
    const day_2 = date_2.getDate();
    const month_1 = date_1.getMonth();
    const month_2 = date_2.getMonth();
    return day_2 - day_1 + (month_2 - month_1) * 30;
};
