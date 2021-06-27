// Calculate student's average grade
export const handleAverageGrade = (grades) => {
    const toNumber = grades.map(i => Number(i));
    const sum = toNumber.reduce((a, b) => a + b);
    const avg = sum / toNumber.length;
    return avg;
}

