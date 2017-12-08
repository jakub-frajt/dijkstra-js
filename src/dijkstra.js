'use strict';

/**
 * Dijkstra's algorithm
 *
 * @param {Object} graph
 * @param {Number} start
 * @param {Number} end
 * @returns {{distance: Number, path: Array}}
 */
function getShortestPath(graph, start, end) {

    if (start === end) {
        return {
            distance: 0,
            path: []
        };
    }

    const nodeQueue = new Map();
    const distances = new Map(Object.keys(graph).map(node => [node, Infinity]));
    const previousNodes = new Map(Object.keys(graph).map(node => [node, null]));

    //============================
    // find the shortest distance
    //============================

    distances.set(start, 0);
    nodeQueue.set(start, 0);

    while (nodeQueue.size !== 0) {

        let currentNode = getMapMinValue(nodeQueue).index;
        let neighbors = graph[currentNode];

        Object.keys(neighbors).forEach(node => {
            let currentDistanceFromStart = neighbors[node] + distances.get(currentNode);
            if (currentDistanceFromStart < distances.get(node)) {
                nodeQueue.set(node, currentDistanceFromStart);
                distances.set(node, currentDistanceFromStart);
                previousNodes.set(node, currentNode);
            }
        });

        nodeQueue.delete(currentNode);
    }

    if (!previousNodes.get(end)) {
        throw new Error(`Path to ${end} not exists!`)
    }

    //=================
    // get a full path
    //=================

    let path = [end];
    let node = previousNodes.get(end);
    path.push(node);

    while (node !== start) {
        node = previousNodes.get(node);
        path.push(node);
    }

    return {
        distance: distances.get(end),
        path: path.reverse()
    }
}

/**
 * @param map
 * @returns {{value: Number, index: String}|null}
 */
function getMapMinValue(map) {

    let min = null;

    map.forEach((v, i) => {
        if (!min || min.value > v) {
            min = {
                value: v,
                index: i
            };
        }
    });

    return min;
}

module.exports = getShortestPath;