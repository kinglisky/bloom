
const hammingDistance = (num1, num2) => {
    return ((num1 ^ num2).toString(2).match(/1/g) || '').length;
};

console.log(hammingDistance(110, 101));
