const input = document.querySelector("body").textContent.split("\n").filter(x => x);

const points = input.map(str => str.split(",").map(part => parseInt(part)));

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const [maxX, maxY] = points.reduce(([maxX, maxY], [x, y]) => {
    return [x > maxX ? x : maxX, y > maxY ? y : maxY];
}, [0,0]);

const xRange = Array.from({length: maxX}, (_,x) => x);
const yRange = Array.from({length: maxY}, (_,y) => y);

const pointMatrix = Array.from({ length: maxX }, () => Array.from({length: maxY}, () => 0));

let regionSize = 0;
xRange.forEach(x => {
    yRange.forEach(y => {
        const distances = points.map(pt => distance(pt, [x, y]));
        const shortest = distances.reduce((min, distance) => distance < min ? distance : min, Number.MAX_VALUE);

        if(distances.filter(distance => distance === shortest).length === 1) {
            pointMatrix[x][y] = distances.indexOf(shortest);
        }
        
        if (distances.reduce((sum, distance) => sum + distance, 0) < 10000) {
            regionSize++;
        }
    })
})

console.log(pointMatrix);

const ignoreBorders = new Set();
xRange.forEach(x => {
    ignoreBorders.add(pointMatrix[x][0]);
    ignoreBorders.add(pointMatrix[x][Math.min(pointMatrix.length, yRange.length) - 1]);
});
yRange.forEach(y => {
    ignoreBorders.add(pointMatrix[0][y]);
    ignoreBorders.add(pointMatrix[Math.min(pointMatrix.length, xRange.length) - 1][y]);
});

const areaSizes = Array.from({length: points.length}).map(() => 0);
xRange.forEach(x => {
    yRange.forEach(y => {
        const pt = pointMatrix[x][y];
        if (!ignoreBorders.has(pt)) {
            areaSizes[pt]++;
        }
    })
});

const maxAreaSize = areaSizes.reduce((max, size) => size > max ? size : max, 0);

console.log("Task 1", maxAreaSize);
console.log("Task 2", regionSize);