"use strict";
/* ==========================================================================  **
## HW2 Instructions

1. Push your solution, contained entirely in hw2.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc hw2.ts
   ```
   to produce a file `hw2.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw2.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.betterHashFromLeafToRoot = exports.checkMerkleTreeHash = exports.hashFromLeafToRoot = exports.arrayToMerkleTree = exports.MNode = exports.MLeaf = exports.fillInMissingPath = exports.countPaths = exports.allPaths = exports.countPathsSatisfyingPredicate = exports.allPathsSatisfyingPredicate = exports.jsonLinkExample = exports.CPair = exports.CBetterPair = exports.CUnsafePair = exports.registerCallbacks = exports.arrayOfArithmeticFunctions = exports.f5 = exports.f4 = exports.f3 = exports.f2 = exports.f1 = exports.RESOURCES_CONSULTED = exports.COLLABORATORS = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
exports.HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
exports.SIGNATURE = "Dinesh Thapa"; // TODO: FILL ME IN
// If you had any collaborators on this assignment, please list their github handles here.
exports.COLLABORATORS = [
    "thaoHo618",
    "amitkhalsa25" // TODO: FILL ME IN
];
// If you used any resources, please list them here
exports.RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];
/* ==========================================================================  **
## Problem 1: First-Class Functions

This problem will get you thinking about first-class functions.
You do **not** need to answer comments labeled "food for thought".
Throughout this problem, you are only allowed to write **pure** functions. That
is, the function itself and any helper functions it uses must be **pure** functions.

** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 1a

Implement the following five pure functions, i.e., no side-effects.
They have generic types, and the types of the parameters, return values,
and generics should give you all the hints you need about how to
implement them. For each one, return the simplest possible function
that will satisfy the type system.

Hint: each function body is 1 line.
** ----------------------------------------------------- */
function f1() {
    // TODO: implement me
    return function (arg) { return arg; };
}
exports.f1 = f1;
function f2(arg1, arg2) {
    // TODO: implement me
    // Food for thought: what is this function doing?
    return arg2(arg1);
}
exports.f2 = f2;
function f3(arg1) {
    // TODO: implement me
    // Food for thought: how is f3 related to f2?
    return function (arg2) { return arg2(arg1); };
}
exports.f3 = f3;
function f4(arg1, arg2, arg3) {
    // TODO: implement me
    return arg3(arg1)(arg2);
}
exports.f4 = f4;
function f5(arg1, arg2, arg3) {
    // TODO: implement me
    // Food for thought: how is f5 related to f4?
    return arg3(arg1, arg2);
}
exports.f5 = f5;
/* ----------------------------------------------------- **
### Problem 1b

Write a function arrayOfArithmeticFunctions that takes in an array
of type ("plus"|"minus"|"times"|"divide")[] and returns an array
with functions that implement + (for "plus"), - (for "minus"), *
(for "times"), or / (for "divide"). You are guaranteed that there
are no duplicate strings in the array. Return the functions in the
order that they are specified in the input array with strings.

Example 1:

> const fnArr = arrayOfArithmeticFunctions(["plus"])
> fnArr[0](1, 2)
3
> fnArr[0](1, 4)
5


Example 2:

> const fnArr = arrayOfArithmeticFunctions(["times", "minus"])
> fnArr[0](1, 2)
2
> fnArr[0](2, 3)
6
> fnArr[1](1, 2)
-1
> fnArr[1](5, 3)
2

** ----------------------------------------------------- */
function arrayOfArithmeticFunctions(names) {
    // TODO: implement me
    var result = [];
    var i = 0;
    while (i < names.length) {
        var name_1 = names[i];
        switch (name_1) {
            case "plus": {
                result.push(function (x, y) { return x + y; });
                break;
            }
            case "minus": {
                result.push(function (x, y) { return x - y; });
                break;
            }
            case "times": {
                result.push(function (x, y) { return x * y; });
                break;
            }
            case "": {
                result.push(function (x, y) { return x / y; });
                break;
            }
            default: {
                throw Error("error");
            }
        }
        i++;
    }
    return result;
}
exports.arrayOfArithmeticFunctions = arrayOfArithmeticFunctions;
/* ----------------------------------------------------- **
### Problem 1c

Imagine you're implementing some code that responds to user input.

When the user gives you
1. `undefined` you will call the `onUndefined` function
2. the string `"hello"` you will call the `onHelloString` function
3. any string `str` you will call the `onAnyString` function with that string as input
4. any object `obj` you will call the `onObject` function with that object as input

Write a function that takes in the 4 functions `onUndefined`,
`onHelloString`, `onAnyString`, and `onObject`, and produces a function
that responds to user input. This function can be called anytime that
the user supplies input and is an example of a function callback
that can be used in an event-loop.
** ----------------------------------------------------- */
function registerCallbacks(onUndefined, onHelloString, onAnyString, onObject) {
    // TODO: implement me
    return function (userInput) {
        if (userInput === "hello") {
            return onHelloString();
        }
        switch (typeof userInput) {
            case "undefined": {
                return onUndefined();
            }
            case "string": {
                return onAnyString(userInput);
            }
            case "object": {
                return onObject(userInput);
            }
        }
    };
}
exports.registerCallbacks = registerCallbacks;
/* ==========================================================================  **
## Problem 2: Closures and Objects

** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 2a

We saw in class how we could encode classes with closures.
Encode the following class below using closures.
** ----------------------------------------------------- */
var UnsafePair = /** @class */ (function () {
    function UnsafePair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    return UnsafePair;
}());
function CUnsafePair(fst, snd) {
    // TODO: implement me
    return { fst: fst, snd: snd };
}
exports.CUnsafePair = CUnsafePair;
/* ----------------------------------------------------- **
### Problem 2b

One of the benefits of using classes is that we can hide data
from the users of the class. Encode the following class below
using closures.

** ----------------------------------------------------- */
var BetterPair = /** @class */ (function () {
    function BetterPair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    BetterPair.prototype.getFst = function () {
        return this.fst;
    };
    BetterPair.prototype.getSnd = function () {
        return this.snd;
    };
    return BetterPair;
}());
function CBetterPair(fst, snd) {
    // TODO: implement me
    var first = fst;
    var second = snd;
    var getFst = function () { return first; };
    var getSnd = function () { return second; };
    return { getFst: getFst, getSnd: getSnd };
}
exports.CBetterPair = CBetterPair;
/* ----------------------------------------------------- **
### Problem 2c

Suppose we want to expose a method `setSnd` that allows us to
change the value of the second element of the pair. Encode
the following the class using closures.
** ----------------------------------------------------- */
var Pair = /** @class */ (function () {
    function Pair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    Pair.prototype.getFst = function () {
        return this.fst;
    };
    Pair.prototype.getSnd = function () {
        return this.snd;
    };
    Pair.prototype.setSnd = function (snd) {
        this.snd = snd;
    };
    return Pair;
}());
function CPair(fst, snd) {
    // TODO: implement me
    var first = fst;
    var second = snd;
    var getFst = function () { return first; };
    var getSnd = function () { return second; };
    var setSnd = function (s) { second = s; };
    return { getFst: getFst, getSnd: getSnd, setSnd: setSnd };
}
exports.CPair = CPair;
exports.jsonLinkExample = [
    {
        "authority": "one.com",
        "path": "1",
        "links": [
            {
                "authority": "www.two.com",
                "links": []
            },
            {
                "authority": "three.com",
                "path": "",
                "links": []
            }
        ]
    },
    {
        "authority": "www.four.com",
        "links": [
            {
                "authority": "seven.com",
                "links": [
                    {
                        "authority": "app.one.com",
                        "path": "2",
                        "links": [
                            {
                                "authority": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ]
            },
            {
                "authority": "app.three.com",
                "path": "locations/42",
                "links": []
            }
        ]
    }
];
/* ----------------------------------------------------- **
### Problem 3a

Write a **pure** and **recursive** function using any of
map/filter/reduce to construct an array of all the paths (duplicates
included) associated with an authority satisfying a predicate in
a JSONObject. If that JSONObject does not have a path, use "/".

It may be instructive to compare and contrast your solution
to this problem with problem 4a from HW1.
** ----------------------------------------------------- */
function allPathsSatisfyingPredicate(predicate, json) {
    var arr = [];
    function helperFunction(predicate, jValue) {
        if (!jValue || !Array.isArray(jValue)) {
            return;
        }
        jValue.map(function (data) {
            if (data.links.length !== 0) {
                helperFunction(predicate, data.links);
            }
            if (data.authority && predicate(data.authority)) {
                arr.push(data);
            }
        });
    }
    helperFunction(predicate, json);
    return arr.map(function (data) { return data.path || '/'; });
}
exports.allPathsSatisfyingPredicate = allPathsSatisfyingPredicate;
/* ----------------------------------------------------- **
### Problem 3b

Write a **pure** function using your solution to 3a and any of
map/filter/reduce to construct the number of paths with at
least 2 /'s.

It may be instructive to compare and contrast your solution
to this problem with problem 4b from HW1.
** ----------------------------------------------------- */
function countPathsSatisfyingPredicate(predicate, json) {
    // TODO: implement me
    var arr = [];
    function helperFunction(predicate, jValue) {
        if (!jValue || !Array.isArray(jValue)) {
            return;
        }
        jValue.map(function (data) {
            if (data.links.length !== 0) {
                helperFunction(predicate, data.links);
            }
            if (data.authority && predicate(data.authority)) {
                arr.push(data);
            }
        });
    }
    helperFunction(predicate, json);
    return arr.map(function (data) { return data.paths || '/'; }).reduce(function (previous, current) {
        return (current.match(/\//g) || []).length >= 2 ? previous + 1 : previous;
    }, 0);
}
exports.countPathsSatisfyingPredicate = countPathsSatisfyingPredicate;
/* ----------------------------------------------------- **
### Problem 3c

Use your solution to 3a and 3b to implement **pure** functions
`allPaths` and `countPaths` for an exact match of an authority.
** ----------------------------------------------------- */
function allPaths(authority, json) {
    return allPathsSatisfyingPredicate(function (auth) { return auth === authority; }, json);
}
exports.allPaths = allPaths;
function countPaths(authority, json) {
    return countPathsSatisfyingPredicate(function (auth) { return auth === authority; }, json);
}
exports.countPaths = countPaths;
/* ----------------------------------------------------- **
### Problem 3d

The JSON that we've been working with sometimes is missing path
links. Write a **pure** and **recursive** function along with any
of map/filter/reduce to add a path field with a value of "/" to
any JSON entry that is missing one.
** ----------------------------------------------------- */
function fillInMissingPath(json) {
    // TODO: implement me
    var changeEntries = function (jValue) {
        if (!jValue || !Array.isArray(jValue)) {
            return {};
        }
        jValue = jValue.map(function (data) {
            if (data.links.length !== 0) {
                changeEntries(data.links);
            }
            if (!data.path) {
                return __assign(__assign({}, data), { path: '/' });
            }
            return data;
        });
        return jValue;
    };
    return changeEntries(json);
}
exports.fillInMissingPath = fillInMissingPath;
function MLeaf(contents, hashValue) {
    // Construct a Merkle Tree MLEAF.
    return {
        tag: "LEAF",
        contents: contents,
        hashValue: hashValue
    };
}
exports.MLeaf = MLeaf;
function MNode(hashValue, left, right) {
    // Construct a Merkle Tree MNODE.
    return {
        tag: "NODE",
        hashValue: hashValue,
        left: left,
        right: right
    };
}
exports.MNode = MNode;
// Note that we don't have LeafNode anymore.
/* ----------------------------------------------------- **
### Problem 4a

Write a **pure** function that converts an array of data into a
Merkle Tree where all `hashValue`s are 0.


Example 1:

    Input:
        ["csc600"];
            d

    Output:
        MLeaf(d, 0) =
            0
            |
            *
            d


Example 2:

    Input:
        ["csc600", "is"];
            d1      d2

    Output:
        MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)) =
                       0
                      / \
                     /   \
                    0     0
                    |     |
                    *     *
                    d1    d2


Example 3:

    Input:
        ["csc600", "is", "hard"];
            d1      d2     d3

    Output:
        MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0)) =
                            0
                        /       \
                       /         \
                      0           0
                     / \         /  \
                    /   \       /    \
                   0     0      0    0
                   |     |      |    |
                   *     *      *    *
                  d1   d2     d3   undefined

That is, put "half" of the data on the left and "half" of the data
on the right. If there is an odd number of data, put the extra data
on the left side.
** ----------------------------------------------------- */
function arrayToMerkleTree(arr) {
    // TODO: implement me
    var tree = [];
    var leaves = arr.map(function (data) { return MLeaf(data, 0); });
    if (leaves.length % 2 === 1) {
        leaves.push(MLeaf(undefined, 0));
    }
    tree.push(leaves);
    while (tree[tree.length - 1].length !== 1 || tree[tree.length - 1][0].tag === "LEAF") {
        var currArr = tree[tree.length - 1];
        var nodeArr = [];
        while (currArr.length > 0) {
            var tuple = currArr.splice(0, 2);
            if (tuple.length === 0) {
                continue;
            }
            var node = MNode(0, tuple[0], tuple[1]);
            nodeArr.push(node);
        }
        tree.push(nodeArr);
    }
    return tree[tree.length - 1][0];
}
exports.arrayToMerkleTree = arrayToMerkleTree;
/* ----------------------------------------------------- **
### Problem 4b

Suppose we have Merkle Trees where all intermediate nodes have
hash values of 0 to start.

Example 1: MLeaf(d, 0) =
    0
    |
    *
    d

Example 2: MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)) =

     0
    / \
   /   \
  0     0
  |     |
  *     *
  d1   d2

Example 3: MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0)) =

           0
        /    \
       /      \
      0         0
     / \       / \
    /   \     /   \
   0     0   0    0
   |     |   |    |
   *     *   *    *
   d1   d2   d3  undefined

In this problem, we will implement the "Merkle" Tree part by
propagating the hash values from the leaf nodes all the way up
to the root node.

Example 1:
    
    hashFromLeafToRoot(e, h, MLeaf(d, 0))) =
           e(d)
            |
            *
            d

Example 2:

    hashFromLeafToRoot(e, h, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0))) =

         h(d1 + d2)
            / \
           /   \
        e(d1)  e(d2)
          |     |
          *     *
          d1   d2

Example 3:

    hashFromLeafToRoot(e, h, MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0))) =

            h(h(e(d1) + e(d2)) + h(e(d3) + 42))
                 /              \
                /                \
            h(e(d1) + e(d2))  h(e(d3) + 42)   (use 42 when undefined)
               / \                /  \
              /   \              /    \
            e(d1)  e(d2)        e(d3)  42
              |     |             |    |
              *     *             *    *
             d1    d2             d3   undefined


A hash function is a one-way function, meaning that it is easy to
compute but difficult to invert. The root of the Merkle Tree will
thus contain a hash value that is easy to compute but difficult to
invert. The consequence is this: if any of the data in the MLeaf
nodes are corrupted, we can easily detect this by compute the hash
of the entire tree and comparing it with the number recorded in the
tree.

When writing `hashFromLeafToRoot`
1. use 42 when the MLeaf node is undefined
2. add the hash values of the left and right child, and then hash
   that value to compute the hash of a MNode.
`hashFromLeafToRoot` should only use **pure** functions.

** ----------------------------------------------------- */
function hashFromLeafToRoot(hashData, hash, mtr) {
    // TODO: implement me
    var checkNode = function (node) {
        if (!node) {
            return;
        }
        if (node.tag === 'NODE') {
            checkNode(node.left);
            checkNode(node.right);
        }
        if (node.tag === 'NODE' || node.tag === 'LEAF') {
            calcHash(node);
        }
    };
    var calcHash = function (node) {
        switch (node.tag) {
            case 'LEAF': {
                node.hashValue = node.contents === undefined ? 42 : hashData(node.contents);
                break;
            }
            case 'NODE': {
                var leftHash = hash(node.left.hashValue);
                var rightHash = hash(node.right.hashValue);
                node.hashValue = hash(leftHash) + hash(rightHash);
                break;
            }
        }
    };
    checkNode(mtr);
    return mtr;
}
exports.hashFromLeafToRoot = hashFromLeafToRoot;
/* ----------------------------------------------------- **
### Problem 4c

Write a **pure** `checkMerkleTreeHash` function that checks that the
data in a Merkle Tree has not been corrupted. Return true if
the Merkle Tree has not been corrupted and false if the
MerkleTree has been corrupted.  Your code should guarantee that
the Merkle Tree passed in `mtr` is not mutated.

** ----------------------------------------------------- */
function checkMerkleTreeHash(hashData, hash, mtr) {
    // TODO: implement me
    var isTree = true;
    var checkNode = function (node) {
        if (!node) {
            return;
        }
        if (node.tag === 'NODE') {
            checkNode(node.left);
            checkNode(node.right);
        }
        if (node.tag === 'NODE' || node.tag === 'LEAF') {
            calcHash(node);
        }
    };
    var calcHash = function (node) {
        switch (node.tag) {
            case 'LEAF': {
                if (node.hashValue !== 42 && node.contents === undefined) {
                    isTree = false;
                }
                if (node.contents !== undefined && node.hashValue !== hashData(node.contents)) {
                    isTree = false;
                }
                break;
            }
            case 'NODE': {
                var leftHash = hash(node.left.hashValue);
                var rightHash = hash(node.right.hashValue);
                if (node.hashValue !== hash(leftHash) + hash(rightHash)) {
                    isTree = false;
                }
                ;
                break;
            }
        }
    };
    checkNode(mtr);
    return isTree;
}
exports.checkMerkleTreeHash = checkMerkleTreeHash;
/* ----------------------------------------------------- **
### Problem 4d

We might want more flexibility in how we hash.

1. For example, instead of always using 42 when a node is undefined,
   we might want to use a random number instead.
2. Instead of x + y, we may want to use combine(x, y)
   for some arbitrary combine function.

Generalize the function from problem 4b with the two features above. The
function you write must be a **pure** function.

You can generate random numbers by using **seed** and **random** as:
let [v1, seed1] = random(seed);    // v1 is the random number, seed1 is the new seed
let [v2, seed2] = random(seed1);   // v2 is the random number, seed2 is the new seed
let [v3, seed3] = random(seed2);   // v3 is the random number, seed3 is the new seed

The function `random` is a deterministic function of the input number
`seed`. Thus, when traversing the tree, we need to define an order
in which we are traversing the tree to ensure that we generate the same
sequence of random numbers by using the appropriate seed values. For this problem,
traverse the tree in mirrored postorder: right, left, and then the current node.
That is, the seed value used for the right child is the current value of `seed`, the
seed value for the left child is the one obtained after visting all the nodes in the
right child, and the seed value value used for the current node is the one obtained
after visiting all the nodes in the left child. Only generate a random number when
you encounter an undefined value.

** ----------------------------------------------------- */
function betterHashFromLeafToRoot(hashData, hash, random, seed, combine, mtr) {
    // TODO: implement me
    var newSeed = seed;
    var checkNode = function (node) {
        if (!node) {
            return;
        }
        if (node.tag === 'NODE') {
            checkNode(node.right);
            checkNode(node.left);
        }
        if (node.tag === 'NODE' || node.tag === 'LEAF') {
            calcHash(node);
        }
    };
    var calcHash = function (node) {
        switch (node.tag) {
            case 'LEAF': {
                if (node.contents === undefined) {
                    var _a = random(seed), rnd = _a[0], _seed = _a[1];
                    node.hashValue = rnd;
                    newSeed = _seed;
                }
                else {
                    node.hashValue = hashData(node.contents);
                }
                break;
            }
            case 'NODE': {
                var lefthash = hash(node.left.hashValue);
                var rightHash = hash(node.right.hashValue);
                node.hashValue = combine(hash(lefthash), hash(rightHash));
                break;
            }
        }
    };
    checkNode(mtr);
    return mtr;
}
exports.betterHashFromLeafToRoot = betterHashFromLeafToRoot;
/* ----------------------------------------------------- **
### Problem 4 Summary

This ends problem 4. Hopefully, you got a more concrete sense of
a non-trivial tree structure and how recursive functions +
first-class functions could be used to do interesting computations.
** ----------------------------------------------------- */
