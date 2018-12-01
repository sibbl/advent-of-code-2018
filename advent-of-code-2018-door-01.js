const input = document.querySelector("body").textContent.split("\n").filter(x => x);

const numbers = input.map(i => Number(i));
const frequencies = new Set([0]);
let firstSum, sum = 0, firstFrequencyDuplicate;
do {
    sum = numbers.filter(x => x).reduce((a,b) => {
        const currentFrequency = a + b;
        if(firstFrequencyDuplicate === undefined && frequencies.has(currentFrequency)) {
            firstFrequencyDuplicate = currentFrequency;
        } else {
            frequencies.add(currentFrequency);
        }
        return currentFrequency;
    }, sum);
    if(firstSum === undefined) {
        firstSum = sum;
        console.log("Task 1", sum);
    }
} while (firstFrequencyDuplicate === undefined);
console.log("Task 2", firstFrequencyDuplicate);