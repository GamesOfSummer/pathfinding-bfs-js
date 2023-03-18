import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers.js';

import { list, getDragon, Dragon } from './data.js';

const findMostCommonColor = (
    list: Dragon[],
    myId: number,
    degreesOfSeparation: number
): string => {
    let queue: number[] = [myId];
    let seenArray: number[] = [myId];

    let newQueue: number[] = [];

    const jobs = {};

    for (let j = 0; j <= degreesOfSeparation; j++) {
        newQueue = [];

        while (queue.length > 0) {
            const user: Dragon = getDragon(list, queue.shift());
            jobs[user.color] = jobs[user.color] ? jobs[user.color] + 1 : 1;

            // cycle through user connections
            for (let i = 0; i < user.connections.length; i++) {
                let connectionId = user.connections[i];

                if (!seenArray.includes(connectionId)) {
                    newQueue.push(connectionId);
                    seenArray.push(connectionId);
                }
            }
        }

        queue = newQueue;
    }

    //process job count !
    let biggestNumber = 0;
    let biggestJobName = '';

    const jobKeys = Object.keys(jobs);

    for (let i = 0; i < Object.keys(jobs).length; i++) {
        let currentJob = jobKeys[i];
        let currentJobCountValue = jobs[currentJob];

        if (currentJobCountValue > biggestNumber) {
            biggestJobName = currentJob;
            biggestNumber = currentJobCountValue;
        }
    }

    return biggestJobName;
};

consoleStart();

validateFxn(findMostCommonColor(list, 30, 2), 'Rooxo');
validateFxn(findMostCommonColor(list, 30, 3), 'Shufflebeat');
consoleEnd();
consoleBuffer();

export {};
