export function trendline(xArray, yArray) {
    console.log(xArray);
    console.log(yArray);
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    const xAl = xArray.length;
    const yAl = yArray.length;
    if (xAl !== yAl) {
        return new Error('Длины X и Y отличаются')
    };
    for (let i = 0; i < xAl; i++) {
        let x = parseFloat(xArray[i]);
        let y = parseFloat(yArray[i]);
        console.log(x, y)
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }
        

    const slope = (xAl * sumXY - sumX * sumY) / (xAl * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / xAl;

    let newYArray = [];
    xArray.forEach(elem => {
        let newY = slope * parseFloat(elem) + intercept;
        newYArray.push(newY);
    });
    return newYArray;
}
