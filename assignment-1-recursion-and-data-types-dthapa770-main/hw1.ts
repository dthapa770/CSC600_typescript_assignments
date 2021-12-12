/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
// @ts-nocheck
export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Dinesh Thapa"; // TODO: FILL ME IN

// If you had any collaborators on this assignment, please list their github handles here.
export const COLLABORATORS = [
    "github handle of collaborator 1", // TODO: FILL ME IN
];

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];


/* ==========================================================================  **
## Problem 1: Numbers

This problem is a warmup. Consider the following sequence of numbers

S_1 = 1*1
S_n = n*n + S_{n-1}

which is a sum of squares. For example,

S_2 = 2*2 + S_1 
    = 2*2 + 1*1

and

S_3 = 3*3 + S_2
    = 3*3 + (2*2 + S_1)
    = 3*3 + (2*2 + 1*1).

S_n = 0 for any n <= 0.
You may assume that all numbers are integers.
** ============================================================================ */


/* ----------------------------------------------------- **
## Problem 1a:

Write sum of squares **iteratively**.
** ----------------------------------------------------- */

export function iterSumOfSquare(n: number): number {
    // TODO: implement me
    let sum:number =0;
    let i:number;
    
    if ( n <=0) {
        return 0;
    }
    else {
        for ( i =1; i<=n ;i++){
            sum = sum+ i*i;
        }
        return sum;
    }
}
console.log(iterSumOfSquare(5));

/* ----------------------------------------------------- **
## Problem 1b:

Write sum of squares **recursively**.
** ----------------------------------------------------- */

export function recSumOfSquare(n: number): number {
    let sum:number =0;  
    if ( n <=0) {
        return 0;
    }
    else {
        while(n>0){
        sum = n*n +recSumOfSquare(n-1)
        return sum;
        }
    }
}

console.log(recSumOfSquare(5));
/* ----------------------------------------------------- **
## Problem 1c:

Write down two test cases.
** ----------------------------------------------------- */

export const test1: [number, number] = [2, 4] // [n1, sumOfSquare(n1)] TODO: change me
export const test2: [number, number] = [4, 8] // [n2, sumOfSquare(n2)] TODO: change me


/* ----------------------------------------------------- **
## Problem 1d:

You now have two implementations of the "same" function.
One way to check the correctness of either implementation is
to perform differential testing where you only need to know
the input and check that the outputs are the same. Note that
the function could still be wrong ... both functions could be
implemented incorrectly in the same way. However, this will
reduce the probability that there is a bug because if the two
functions are implemented incorrectly, it is more likely that
they "incorrect" in different ways.

Write down two more inputs.
** ----------------------------------------------------- */

export function differentialTest(n: number): boolean {
    const result = iterSumOfSquare(n) === recSumOfSquare(n);
    if (!result) {
        console.log(`iterSumOfSquare(${diffTest1}) = ${iterSumOfSquare(diffTest1)} != recSumOfSquare(${diffTest1}) = ${recSumOfSquare(diffTest1)}`);
    }
    return result;
}

export const diffTest1: number = 2  // n1, TODO: change me
export const diffTest2: number = 4  // n2, TODO: change me

console.log(differentialTest(diffTest1));

console.log(differentialTest(diffTest2));



/* ==========================================================================  **
## Problem 2: Lists and Trees

In class, we introduced lists and trees as examples of ADTs. In this problem,
we'll look at converting between lists and trees.
** ============================================================================ */

export enum _List { NIL, CONS };
export type List<T> = {tag: _List.NIL} | {tag: _List.CONS, contents: T, rest: List<T>};

export function Nil<T>(): List<T> {
    return {tag: _List.NIL};
}

export function Cons<T>(x: T, ls: List<T>): List<T> {
    return {tag: _List.CONS, contents: x, rest: ls};
}


export enum _Tree { LEAF, NODE };
export type Tree<T> = {tag: _Tree.LEAF} | {tag: _Tree.NODE, contents: T, left: Tree<T>, right: Tree<T>};

export function Leaf<T>(): Tree<T> {
    return {tag: _Tree.LEAF};
}

export function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return {tag: _Tree.NODE, contents: x, left: left, right: right};
}

export function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}


/* ----------------------------------------------------- **
### Problem 2a:

Convert a tree into a list using "mirrored" postfix ordering.
That is, we'll visit the right child, the left child, and then
finally the current node. (In standard postfix, we'll visit the
left, the right, and then the current node.)


- Example 1: 

Original 
```
   1
  / \
 2   3
```

Postfix
```
2 -> 3 -> 1
```

Mirrored Postfix
```
3 -> 2 -> 1
```

- Example 2:

Original 
```
   1
  / \
 2   3
 |  / \
 4  5  6
```

Postfix
```
4 -> 2 -> 5 -> 6 -> 3 -> 1
```

Mirrored Postfix
```
6 -> 5 -> 3 -> 4 -> 2 -> 1
```
** ----------------------------------------------------- */
const tree = Node(1,
    Node(2,
            Node(4, Leaf(),  Leaf()),
            Leaf()),
    Node(3,
            Node(5, Leaf(),  Leaf()),
            Node(6, Leaf(),  Leaf())));

export function mirroredPostfix<T>(t: Tree<T>): List<T> {
    // TODO: Implement me
   switch(t.tag){
       case _Tree.LEAF: {
           return Nil();
       }
       case _Tree.NODE: {
           return helper(t,Nil());
       }
   }
}
function helper<T>(t:Tree<T>, ls:List<T>): List<T>{

    if( t.tag === _Tree.LEAF){
        return ls;
    } else {
        ls = Cons(t.contents,helper(t.right,Nil()));
        ls= Cons(t.contents,helper(t.left,Nil()));
        console.log(t.contents);
        return ls;
    }
}
console.log(mirroredPostfix(tree));




/* ----------------------------------------------------- **
### Problem 2b:

Previously we converted a tree into a list. Now we will convert a list into an array.

Example 1:

List
```
1 -> 2 -> 3 -> 4
```

Array
```
[1, 2, 3, 4]
```
** ----------------------------------------------------- */

export function listToArr<T>(ls: List<T>): T[] {
    if ( ls.tag === _List.NIL){
        return [];
    } else {
        return [ls.contents,...listToArr(ls.rest)];
    }   
}


/* ----------------------------------------------------- **
### Problem 2c:

In this problem we'll convert an array into a tree.

- Example 1:

Array
```
[1, 2, 3]
```

Tree
```
    2
   / \
  1   3
```

- Example 2:

Array
```
[1, 2, 3, 4]
```

Tree
```
    3
   / \
  2   4
 /    
1
```

- Example 3:

Array
```
[1, 2, 3, 4, 5]
```

Tree
```
    3
   / \
  2   5
 /   /
1    4
```

- Example 4:

Array
```
[1, 2, 3, 4, 5, 6]
```

Tree
```
     4
    / \
   /   \
  2     6
 / \    /
1   3  5
```
** ----------------------------------------------------- */

// Hint: use recursion with arr.slice 
export function arrayToTree<T>(arr: T[]): Tree<T> {
    // TODO: Implement me
    if( arr.length <= 0){
        return Leaf();
    } else {
        return Node ( arr[Math.floor(arr.length/2)], arrayToTree(arr.slice(0,arr.length/2)),arrayToTree(arr.slice(arr.length/2+1)));
    }    
}


/* ----------------------------------------------------- **
### Problem 2d:

In summary, we saw we could convert trees into lists, lists into
arrays, and arrays back into trees. Consequently, an algorithm on
trees can be applied to arrays. For example, in class, we saw
that we could compute the smallest element in an array iteratively
and recursively.

Write a **recursive** function that finds the smallest element in a
tree of numbers. If it is an empty Tree, return NaN. We can then
find the smallest number in a tree using this  implementation as in
```
function smallestElementArr2(arr: number[]): number {
    return smallestTree(arrayToTree(arr));
}
```
```
** ----------------------------------------------------- */

export function smallestTree(tr: Tree<number>): number {
    // TODO: Implement me
    
    if( tr.tag === _Tree.LEAF){
        return NaN;
        
    } 
    let result = tr.contents;
    if ( smallestTree(tr.right) < result){
        result = smallestTree(tr.right);
    } else if (smallestTree(tr.right) < result) {
        result = smallestTree(tr.right);
    }
    return result;  
}
console.log( smallestTree(tree));


/* ==========================================================================  **
## Problem 3: Hybrid List and Tree

We saw lists and binary trees in class. If the problem we are working on is a list
or tree, then we can reuse generic list and tree data-types. However, the problem
at hand may not be exactly a list or tree, in which case we will need to define our
own data-types. In this problem, we will practice defining our own data-types. We
will look at hybrid lists and trees where a tree can have one or two children. We
give the BNF below.

<hybrid> ::= HLeaf | OneChild(x, <hybrid>) | TwoChild(x, <hybrid>, <hybrid>)
** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 3a:

Complete the data-type definition below.
** ----------------------------------------------------- */

export enum _Hybrid { HLEAF, ONECHILD, TWOCHILD };
export type Hybrid<T> = {tag: _Hybrid.HLEAF} | 
                        {tag: _Hybrid.ONECHILD, contents:T,child: Hybrid<T>}|
                        {tag:_Hybrid.TWOCHILD, contents:T, left:Hybrid<T>,right:Hybrid<T>}; // TODO: implement the rest // TODO: implement the rest


export function HLeaf<T>(): Hybrid<T> {
    return {tag: _Hybrid.HLEAF}; // This one is completed/
}

export function OneChild<T>(x: T, child: Hybrid<T>): Hybrid<T> {

    // TODO: implement me
    if(_Hybrid.HLEAF){
        return HLeaf();
    }
    return {tag:_Hybrid.ONECHILD,contents:x, child:child}
}

export function TwoChild<T>(x: T, left: Hybrid<T>, right: Hybrid<T>): Hybrid<T> {
    // TODO: implement me
    if(_Hybrid.HLEAF){
        return HLeaf();
    }
    return {tag:_Hybrid.TWOCHILD,contents:x, left:left, right:right}
}



/* ----------------------------------------------------- **
### Problem 3b:

Implement the following two structures in the `Hybrid` ADT.

hybrid1
```
    3
   / \
  2   5
  |   |
  1   4
```

hybrid2
```
     4
    / \
   /   \
  2     6
 / \    |
1   3   5

Use OneChild for LeafNodes.
```
** ----------------------------------------------------- */

const h4 = OneChild(4,HLeaf());
const h3 = OneChild(1,HLeaf());
const h2 = OneChild(5,h4);
const h1 = OneChild(2,h3);
const h0= TwoChild(3,h1,h2);
export const hybrid1 = h0;  // TODO: implement me

const i5 = OneChild(5,HLeaf());
const i4 = OneChild(3,HLeaf());
const i3 = OneChild(1,HLeaf());
const i2 = OneChild(6,i5);
const i1 = TwoChild(2,i3,i4);
const i0 = TwoChild(4,i1,i2);
export const hybrid2 = HLeaf();  // TODO: implement me



/* ----------------------------------------------------- **
### Problem 3c

You may have noticed that the Hybrid ADT was able to encode
the "same" structures as Tree data structure. That the "same"
data can be stored in a variety of equivalent encodings can
occur in practice.

Write a **recursive** function that converts a Hybrid data
structure into a Tree structure. When translating a node with
one child into a node, put the child in the left child.
** ----------------------------------------------------- */

function hybridToTree<T>(hybrid: Hybrid<T>): Tree<T> {
    switch ( hybrid.tag) {
        case _Hybrid.HLEAF: {
            return Leaf();
        }
        case _Hybrid.ONECHILD:{
            return Node (hybrid.contents, hybridToTree(hybrid.child),Leaf());
        }
        case _Hybrid.TWOCHILD:{
            return Node ( hybrid.contents, hybridToTree(hybrid.left), hybridToTree(hybrid.right));
        }
    }
}



/* ==========================================================================  **
## Problem 4: JSON

You may be familiar with a concept known as a **webscraper** that:

1. Visits a web-page
2. *Recursively* visits each link on that page

This might produce a JSON data-structure such as

```
[
  {
    "url": "www.foobar.com",
    "links": [ { links json ... }]
  },
  ...,
  {
    "url": "www.bazbae.com",
    "links": [ { links json ... }]
  },
]
```
** ============================================================================ */

export type JSONValue = null | string | JSONObject | JSONValue[];
export type JSONObject = { [key: string]: JSONValue };

export const jsonLinkExample: JSONValue = [
    {
        "url": "one.com",
        "links": [ 
            {
                "url": "two.com", 
                "links": [],
            },
            {
                "url": "three.com", 
                "links": [],
            }
        ]
    },
    {
        "url": "four.com",
        "links": [ 
            {
                "url": "seven.com", 
                "links": [
                    {
                        "url": "one.com",
                        "links": [
                            {
                                "url": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ],
            },
            {
                "url": "three.com", 
                "links": [],
            }
        ]
    }
]


/* ----------------------------------------------------- **
### Problem 4a

 
** ----------------------------------------------------- */

export function allURL(json: JSONValue): string[] {
    // TODO: Implement me
      const urls: string[] = [];
      urlHelper(json, urls);
      return urls;
  
}
function urlHelper(json: JSONValue, urls: string[]): void {
           
            for (const value of Object.values(json)) {
                if (value.url) {
                    urls.push(value.url);
                }
                if (value.links) {  
                    urlHelper(value.links, urls);
                }
            }
}


/* ----------------------------------------------------- **
### Problem 4b

Given a JSON as above where "links" contains the same JSON
format, arbitrarily nested, write a **recursive** function
that counts the number of times an exact match of a given url
occurs in the JSON object.
** ----------------------------------------------------- */

export function recCountURL(url: string, json: JSONValue): number {
        const urls: string[] = [];
        countHelper(url,json, urls);
        return urls.length;
}
function countHelper(url: string, json: JSONValue, urls: string[]): void {
                for (const value of Object.values(json)) {
                    if (value.url && url === value.url) {     
                        urls.push(value.url);
                    }
                    if (value.links) {
                        countHelper(url,value.links, urls);
                    }
                }
}


/* ----------------------------------------------------- **
### Problem 4c

Do the same as problem 4a but this time with an **iterative**
function.
** ----------------------------------------------------- */

export function iterCountURL(url: string, json: JSONValue): number {
    // TODO: Implement me
    let count = 0;
    let tempURL:string;
    for (const value of Object.values(json)) { 
        if (value.url) {
            count++;
        }
        if( value.links){
            for ( const val of value.links){
            if(val.url === value.url){
            count++;
            }
            }
        }
    }
    return count;  
}
