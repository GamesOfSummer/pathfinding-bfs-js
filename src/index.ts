import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers.js';

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

function generateVisited(maze) {
    const visited = [];

    for (let y = 0; y < maze.length; y++) {
        const yAxis = [];
        for (let x = 0; x < maze[y].length; x++) {
            const coordinate = {
                closed: maze[y][x] === 1,
                length: 0,
                openedBy: NO_ONE,
            };

            yAxis.push(coordinate);
        }
        visited.push(yAxis);
    }

    return visited;
}

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
    // code goes here
    const visited = generateVisited(maze);
    console.log(generateVisited(maze));

    visited[yA][xA].openedBy = BY_A;
    visited[yB][xB].openedBy = BY_B;

    let aQueue = [visited[yA][xA]];
    let bQueue = [visited[yB][xB]];


    while()
}

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
