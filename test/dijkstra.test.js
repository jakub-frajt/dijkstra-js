const getShortestPath = require('../src/dijkstra');

it('graph where start equals end', () => {
    const graph = {
        a: {}
    };

    expect(getShortestPath(graph, 'a', 'a')).toEqual({
        distance: 0,
        path: []
    });
});

it('end node without edges to other nodes', () => {
    const graph = {
        a: {b: 10},
        b: {a: 10},
        c: {}
    };

    expect(() => getShortestPath(graph, 'a', 'c')).toThrow();
});

it('graph v1', () => {
    const graph = {
        a: {b: 5, c: 10},
        b: {a: 5, e: 30, f: 8, c: 8, d: 4},
        c: {a: 10, b: 8},
        d: {b: 8},
        e: {b: 30, f: 6},
        f: {e: 6, b: 8}
    };

    expect(getShortestPath(graph, 'a', 'b')).toEqual({
        distance: 5,
        path: ['a', 'b']
    });

    expect(getShortestPath(graph, 'a', 'f')).toEqual({
        distance: 13,
        path: ['a', 'b', 'f']
    });

    expect(getShortestPath(graph, 'a', 'e')).toEqual({
        distance: 19,
        path: ['a', 'b', 'f', 'e']
    })
});

it('graph v2', () => {
    const graph = {
        a: {b: 4, c: 10, d: 8},
        b: {a: 4, c: 3, d: 6},
        c: {a: 10, b: 3, e: 2},
        d: {a: 8, b: 6, e: 2},
        e: {d: 2, c: 2, f: 1},
        f: {e: 1}
    };

    expect(getShortestPath(graph, 'a', 'f')).toEqual({
        distance: 10,
        path: ['a', 'b', 'c', 'e', 'f']
    });

    expect(getShortestPath(graph, 'a', 'e')).toEqual({
        distance: 9,
        path: ['a', 'b', 'c', 'e']
    });

    expect(getShortestPath(graph, 'a', 'f')).toEqual({
        distance: 10,
        path: ['a', 'b', 'c', 'e', 'f']
    });

    expect(getShortestPath(graph, 'a', 'b')).toEqual({
        distance: 4,
        path: ['a', 'b']
    });

    expect(() => getShortestPath(graph, 'a', 'g')).toThrow();
});

it('graph v3', () => {
    const graph = {
        a: {b: 4, d: 10, c: 8},
        b: {a: 4, d: 3, c: 6, e: 8, f: 5},
        c: {b: 6, f: 4, a: 8},
        d: {a: 10, b: 3, e: 1},
        e: {d: 1, f: 3, b: 8},
        f: {b: 5, e: 3, c: 4}
    };

    expect(getShortestPath(graph, 'a', 'f')).toEqual({
        distance: 9,
        path: ['a', 'b', 'f']
    });

    expect(getShortestPath(graph, 'a', 'e')).toEqual({
        distance: 8,
        path: ['a', 'b', 'd', 'e']
    });
});