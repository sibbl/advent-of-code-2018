const input = document.querySelector("body").textContent.trim();

const removePairs = (str) => {
    let removedSomething = false;
    for(let i = 0; i < str.length - 1; i++) {
        const firstChar = str[i];
        const secondChar = str[i+1];
        if(firstChar !== secondChar && firstChar.toLowerCase() == secondChar.toLowerCase()) {
            str = str.substr(0, i) + str.substr(i+2, str.length - i - 2);
            i--;
            removedSomething = true;
        }
    }
    return removedSomething ? removePairs(str) : str;
}

console.log("Task 1", removePairs(input).length);

const minLength = "abcdefghijklmnopqrstuvwxyz".split("").map(char => {
    return removePairs(input.replace(new RegExp(char, "gi"), "")).length;
}).reduce((acc, cur) => cur < acc ? cur : acc, Number.MAX_VALUE);

console.log("Task 2", minLength);