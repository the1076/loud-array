# LoudArray
An Observable Array for javascript in ES6 (ES2015) modules

## Description
LoudArray is a library used for observing arrays written in vanilla Javascript using a suite of ES6 functionality.
The entire library is <5kB expanded and <3kB minified.
This code has been prioritized for readability and, as such, may benefit greatly from optimization.

Why "Loud"? Because this is an array you can listen to.
Not only can you listen to it, but you can add as many listeners (and, therefore, handlers) as you'd like. Everything this array does can be heard because this array is LOUD!

## Demo
A live demo can be viewed on [Codepen](https://codepen.io/the1076/pen/vYBpZvm) and a single-page version of the demo is included in this repo as "test.html". 

## Getting Started

### Importing the library
LoudArray is a standard ES6 module so it can be imported in the common ways:
```
import LoudArray, { ArrayListener, ArrayEvent } from "./loud-array.js";
```
or (for the minified version)
```
import LoudArray, { ArrayListener, ArrayEvent } from "./loud-array.min.js";
```

### Usage
#### Initialization
To start working with an observable array, create a new instance of LoudArray:
```
let myLoudArray = new LoudArray();
```
You can use an instance of a LoudArray just like you would any other array object. If you don't add any listeners, LoudArray should function exactly like any other array.

If you would like to include listeners during instantiation (rather than adding them later), simply include an array of key-value pairs that have `event` and `handler` properties:
```
let myLoudArray = new LoudArray([{event: 'after-all', handler: (array, args) => { console.log(array); }]);
```
If you have imported the `ArrayListener` class, you can use instances of that object to define your listeners, as well:
```
let myLoudArray = new LoudArray([new ArrayListener('after-all', (array, args) => { console.log(array); })]);
```

The first parameter of the `LoudArray` object is for the listeners, but the functionality to instantiate an array with values has been retained via any additional parameters:
```
let myListenerArray =
[
    new ArrayListener('after-all', (array, args) => { console.log(array); })
];
let sourceArray = ["these", "are", "some", "initial", "values"];
let myLoudArray = new LoudArray(myListenerArray, "start value 1", "start value 2");
//or
let myLoudArray = new LoudArray(myListenerArray, ...sourceArray);
//or
let myLoudArray = new LoudArray(null, "start value 1", "start value 2", ...sourceArray);
```

#### Adding Listeners

#### Removing Listeners

#### Handler Arguments

#### Array Functionality

##### Accessors

##### Array Functions

## Helpers

### ArrayListener

### ArrayEvent

## Compatability
Tested and working in modern versions of the following browsers:
- Chrome
- Firefox
- Edge

## Notes
- The ArrayEvent helper class is strictly used for developer-friendliness and could be removed with no additional code changes, if it is not relied upon.
- The ArrayListener helper class is used for known-objects and properties, so it is a little more integrated but could also be removed, with minor rework.

## FAQ
#### Where is LoudArray on NPM?
LoudArray has not been published on NPM. Mainly because I've never published anything on NPM and don't know how to format this code to work with Node. If someone wants to walk me through it, I'm all ears. Until then, there are no specific plans to publish LoudArray on NPM.

# loud-array.micro
LoudArray was developed to serve a wide variety of purposes but I hate to ship a library with features that most people won't use. I tried to keep LoudArray fairly svelte but there's plenty of fat to be trimmed. 

To that end, I've pared down the LoudArray library to make an even smaller library that can serve use cases that don't require as much versatility. The major changes are:

- Removed the "before" event ability, thereby negating the need to handle events as "after". Instead, there is a single callback to be passed in, just like with the `addEventListener` function that exists on `HTMLElement` objects. This callback will always occur **after** a change to the array has been made.
- The `eventType` parameter for the `addEventListener` consists only of the method name (in dash-delimited lowercase), without a "before" or "after" prefix. In example:
This LoudArray code:
```
myObservableArray.addEventListener('before-copy-within', (array, args) => { console.log('test'); } );
```
would be written with loud-array.micro as:
```
myObservableArray.addEventListener('copy-within', (array, args) => { console.log('test'); } );
```
