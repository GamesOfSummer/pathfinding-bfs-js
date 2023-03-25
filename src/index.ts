import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers.js';

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

interface Coordinate {
    closed: boolean;
    length: number;
    openedBy: number;
    x: number;
    y: number;
}

function generateVisitedObjectArray(maze): Coordinate[] {
    const visited = [];

    for (let y = 0; y < maze.length; y++) {
        const yAxis = [];
        for (let x = 0; x < maze[y].length; x++) {
            const coordinate: Coordinate = {
                closed: maze[y][x] === 1,
                length: 0,
                openedBy: NO_ONE,
                x: x,
                y: y,
            };

            yAxis.push(coordinate);
        }
        visited.push(yAxis);
    }

    return visited;
}

function findShortestPathLength(maze: number[][], [xA, yA], [xB, yB]) {
    // code goes here
    const visited: Coordinate[] = generateVisitedObjectArray(maze);
    console.log(generateVisitedObjectArray(maze));

    visited[yA][xA].openedBy = BY_A;
    visited[yB][xB].openedBy = BY_B;

    let aQueue = [visited[yA][xA]];
    let bQueue = [visited[yB][xB]];
    let iteration = 0;

    while (aQueue.length && bQueue.length) {
        iteration++;
        let aNeighbors = [];

        while (aQueue.length) {
            const coordinate: Coordinate = aQueue.shift();
            aNeighbors = aNeighbors.concat(
                getNeighbors(visited, coordinate.x, coordinate.y)
            );
        }

        bQueue = [];
    }

    return -1;
}

const getNeighbors = (visited: Coordinate[], x: number, y: number) => {
    const neighbors = [];

    if (canGoLeft(visited, x, y)) {
        neighbors.push(visited[y - 1][x]);
    }

    if (canGoRight(visited, x, y)) {
        neighbors.push(visited[y + 1][x]);
    }

    if (canGoUp(visited, x, y)) {
        neighbors.push(visited[y][x - 1]);
    }

    if (canGoDown(visited, x, y)) {
        neighbors.push(visited[y][x + 1]);
    }

    return neighbors;
};

const canGoLeft = (visited: Coordinate[], x: number, y: number) => {
    return y - 1 >= 0 && !visited[y - 1][x].closed;
};

const canGoRight = (visited: Coordinate[], x: number, y: number) => {
    return y + 1 < visited[0].length && !visited[y + 1][x].closed;
};

const canGoUp = (visited: Coordinate[], x: number, y: number) => {
    return x - 1 >= 0 && !visited[y][x - 1].closed;
};

const canGoDown = (visited: Coordinate[], x: number, y: number) => {
    return x + 1 < visited.length && !visited[y][x + 1].closed;
};

consoleStart();

const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
];

validateFxn(findShortestPathLength(fourByFour, [0, 0], [3, 3]), 6);

consoleEnd();
consoleBuffer();

export {};
