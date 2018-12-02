const input = document.querySelector("body").textContent.split("\n").filter(x => x);

const countChars = str => str.split("").reduce((a,b) => {
    if(a[b] === undefined) {
        a[b] = 0;
    } 
    a[b]++;
    return a;
}, {});

const containsTwo = str => Object.values(countChars(str)).some(x => x == 2);
const containsThree = str => Object.values(countChars(str)).some(x => x == 3);

const countTwo = input.map(containsTwo).filter(x => x === true).length;
const countThree = input.map(containsThree).filter(x => x === true).length;

console.log("Part 1", countTwo * countThree);

const returnWordIfOnlyOneCharacterDifferent = (str1, str2) => {
    for(let i = 0; i < str1.length; i++) {
        const secondPartStartIndex = i+1;
        const str1WithoutSingleChar = str1.substring(0, i) + str1.substring(secondPartStartIndex, str1.length);
        const str2WithoutSingleChar = str2.substring(0, i) + str2.substring(secondPartStartIndex, str2.length);
        if(str1WithoutSingleChar === str2WithoutSingleChar) {
            return str1WithoutSingleChar;
        }
    }
}

for(let i = 0; i < input.length; i++) {
    for(let k = i + 1; k < input.length; k++) {
        const diff = returnWordIfOnlyOneCharacterDifferent(input[i], input[k]);
        if(diff) {
            console.log("Part 2", diff);
            break;
        }
    }
}