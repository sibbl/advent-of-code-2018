const input = document.querySelector("body").textContent.split("\n").filter(x => x);

const regexp = /^\[(.*)\]\s*(Guard #(\d+) begins shift|.*)$/;

const MessageTypes = {
    FALLS_ASLEEP: "falls asleep",
    WAKES_UP: "wakes up",
    SHIFT_BEGIN: "guard begins shift",
    UNKNOWN: "unknown"
}

const log = input
    .map(line => {
        const [, date, message, guardId] = line.match(regexp);
        let messageType = MessageTypes.UNKNOWN;
        if (guardId !== undefined) {
            messageType = MessageTypes.SHIFT_BEGIN;
        } else if (~(Object.values(MessageTypes).indexOf(message))) {
            messageType = message;
        }
        return {
            date: new Date(date),
            messageType,
            guardId
        };
    });
log.sort((a, b) => a.date - b.date);

const {
    logByGuard
} = log.reduce(({
    logByGuard,
    currentGuardId
}, {
    date,
    messageType,
    guardId
}) => {
    if (guardId) {
        currentGuardId = guardId;
    }
    if (logByGuard[currentGuardId] === undefined) {
        logByGuard[currentGuardId] = {
            guardId,
            state: messageType,
            lastDate: date,
            minutes: {}
        }
    } else {
        let minutesUpdate = logByGuard[currentGuardId].minutes;
        if (logByGuard[currentGuardId].state === MessageTypes.FALLS_ASLEEP && messageType == MessageTypes.WAKES_UP) {
            let currentTime = logByGuard[currentGuardId].lastDate;
            const endTime = date;
            while (currentTime < endTime) {
                const min = currentTime.getMinutes();
                if (minutesUpdate[min] === undefined) {
                    minutesUpdate[min] = 0;
                }
                minutesUpdate[min]++;
                currentTime = new Date(currentTime.getTime() + 60 * 1000);
            }
        }
        logByGuard[currentGuardId] = {
            ...logByGuard[currentGuardId],
            state: messageType,
            lastDate: date,
            minutes: minutesUpdate
        }
    }
    return {
        logByGuard,
        currentGuardId
    }
}, {
    logByGuard: {},
    currentGuardId: undefined
});

const {
    guardId: sleepiestGuardId
} = Object.values(logByGuard).reduce((sleepiestGuard, {
    minutes,
    guardId
}) => {
    const minuteSum = Object.entries(minutes).reduce((acc, [, count]) => {
        return acc + count;
    }, 0);
    if (!sleepiestGuard || (sleepiestGuard.sum < minuteSum)) {
        return {
            guardId,
            sum: minuteSum
        };
    } else {
        return sleepiestGuard;
    }
}, null);

const getSleepiestMinuteOfGuard = (guardId) => {
    return Object.entries(logByGuard[guardId].minutes).reduce((accMin, [min, count]) => {
        if (count > accMin.count) {
            return {
                guardId,
                min,
                count
            };
        } else {
            return accMin;
        }
    }, {
        guardId,
        count: 0,
        min: undefined
    });
}
const {
    min: sleepiestMinute
} = getSleepiestMinuteOfGuard(sleepiestGuardId);

console.log("Part 1", sleepiestGuardId * parseInt(sleepiestMinute));

const guardWithSleepiestMinute = Object.keys(logByGuard).map(getSleepiestMinuteOfGuard).reduce((accMin, {
    guardId,
    min,
    count
}) => {
    if (!accMin || accMin.count < count) {
        return {
            count,
            min,
            guardId
        };
    } else {
        return accMin;
    }
}, null);

console.log("Part 2", parseInt(guardWithSleepiestMinute.min) * parseInt(guardWithSleepiestMinute.guardId));