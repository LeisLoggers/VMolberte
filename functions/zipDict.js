

export function zipDict(keyArray1, valueArray2) {
    let resultDict = {};
    keyArray1.forEach((element, index) => {
        resultDict[element] = valueArray2[index]
    });
    return resultDict
}