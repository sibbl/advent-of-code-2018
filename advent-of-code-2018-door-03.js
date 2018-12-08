const input = document.querySelector("body").textContent.split("\n").filter(x => x);

const regexp = /^#(\d+)\s*@\s*(\d+)\s*,\s*(\d+):\s*(\d+)x(\d+)$/;

const allIds = new Set();
const matrix = input
    .map(line => {
        let [, id, x, y, width, height] = line.match(regexp);
        const rect = { id, width, height, x, y };
        return Object.entries(rect).reduce((acc, [key, value]) => {
            acc[key] = parseInt(value);
            return acc;
        }, rect);
    })
    .reduce((acc, { id, x, y, width, height }) => {
        allIds.add(id);
        for (let i = x; i < x + width; i++) {
            for (let k = y; k < y + height; k++) {
                const key = `${i}x${k}`;
                if (acc[key] === undefined) {
                    acc[key] = [id];
                } else {
                    acc[key].push(id);
                }
            }
        }
        return acc;
    }, {});

console.log("Task 1", Object.values(matrix).filter(x => x.length > 1).length);

Object.values(matrix).filter(ids => ids.length > 1).forEach((ids) => ids.forEach((id) => allIds.delete(id)));
console.log("Task 2", allIds);
