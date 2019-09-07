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
```javascript
import LoudArray, { ArrayListener, ArrayEvent } from "./loud-array.js";
```
or (for the minified version)
```javascript
import LoudArray, { ArrayListener, ArrayEvent } from "./loud-array.min.js";
```

### Usage
#### Initialization
To start working with an observable array, create a new instance of LoudArray:
```javascript
let myLoudArray = new LoudArray();
```
You can use an instance of a LoudArray just like you would any other array object. If you don't add any listeners, LoudArray should function exactly like any other array.

If you would like to include listeners during instantiation (rather than adding them later), simply include an array of key-value pairs that have `event` and `handler` properties:
```javascript
let myLoudArray = new LoudArray([{event: 'after-all', handler: (array, args) => { console.log(array); }]);
```
If you have imported the `ArrayListener` class, you can use instances of that object to define your listeners, as well:
```javascript
let myLoudArray = new LoudArray([new ArrayListener('after-all', (array, args) => { console.log(array); })]);
```

The first parameter of the `LoudArray` object is for the listeners, but the functionality to instantiate an array with values has been retained via any additional parameters:
```javascript
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
#### Listeners
The `LoudArray` object only introduces two new methods to the standard methods of an `Array`. These two methods allow you to add and remove listeners just like you would with an `HTMLElement` object.
Unlike the `HTMLElement` objects, however, you can pass in a single parameter that is an instance of an `ArrayListener` object, instead, to either of these functions.
- <table>
  <tr><th colspan="4" align="left">addEventListener()</th></tr>
  <tr><td><b>Syntax</b></td><td colspan="3"><code>addEventListener(eventType, handler)</code> <em>or <code>addEventListener(arrayListener)</code></em></td></tr>
  <tr><td><b>Description</b></td><td colspan="3">adds a listener to the <code>LoudArray</code> instance.</td></tr>
  <tr>
  <td rowspan="3"><b>Params</b></td>
  <td><b>Name</b></td>
  <td><b>Type</b></td>
  <td><b>Description</b></td>
  </tr>
  <tr>
  <td><code>eventType</code></td>
  <td><code>string</code></td>
  <td>A string value representing when the event should be dispatched.<br />Examples: <code>"after-push"</code>, <code>"before-splice"</code>, <code>"before-all"</code>.<br /><em>(The helper class <code>ArrayEvent</code> contains all valid eventType values.)</em></td>
  </tr>
  <tr>
  <td><code>handler</code></td>
  <td><code>function</code>
  </td><td>The function that will be executed when the target event occurs.</td>
  </tr>
  <tr>
  <td><b>Returns</b></td>
  <td colspan="2"><code>ArrayListener</code></td>
  <td>The <code>ArrayListener</code> object that was added to the array.</td>
  </tr>
  </table>

- <table>
  <tr><th colspan="4" align="left">removeEventListener()</th></tr>
  <tr><td><b>Syntax</b></td><td colspan="3"><code>removeEventListener(eventType, handler)</code> <em>or <code>removeEventListener(arrayListener)</code></em></td></tr>
  <tr><td><b>Description</b></td><td colspan="3">removes a listener from the <code>LoudArray</code> instance.</td></tr>
  <tr><td rowspan="3"><b>Params</b></td><td><b>Name</b></td><td><b>Type</b></td><td><b>Description</b></td></tr>
  <tr><td><code>eventType</code></td><td><code>string</code></td><td>The <code>eventType</code> of the <code>ArrayListener</code> that is to be removed from the <code>LoudArray</code> instance.<br /><em>(The helper class <code>ArrayEvent</code> contains all valid eventType values.)</em></td></tr>
  <tr><td><code>handler</code></td><td><code>function</code></td><td>The exact function that was used as a handler on the <code>ArrayListener</code> instance to be removed.</td></tr>
  <tr><td><b>Returns</b></td><td colspan="3"><code>undefined</code></td></tr>
  </table>

#### Handler Arguments
When `LoudArray` executes a handler it forgoes the traditional `event` object and, instead, provides the current state of the array as the first argument, and then any values that were passed to the mutation function being used as the second argument. An example handler might look like:
```javascript
function myLoudArray_afterFill(array, methodArgs)
{
  console.log(array); //current state of the array
  console.log(methodArgs); //an array of the arguments passed to the "fill" method.
}

let myLoudArray = new LoudArray(null, [0,1,2,3,4]);
myLoudArray.addEventListner('after-fill', myLoudArray_afterFill);

myLoudArray.fill("all elements will have this value", 0, 5);
```
The above code would generate the following console logs:
```bash
["all elements will have this value", "all elements will have this value", "all elements will have this value", "all elements will have this value", "all elements will have this value"]
["all elements will have this value", 0, 5]
```
The first log being the newly modified array and the second log being the parameters that were passed in to the `fill` method.

#### Array Functionality
The `LoudArray` object is a child object that extends the native `Array` object and, as such, retains all of its properties and methods. The only methods that have been changed in the `LoudArray` object are those methods that directly manipulate the contents of an array.
Any functionality that you can perform on an `Array` should also be able to be performed on a `LoudArray`, including referencing all of its accessors and methods in the standard ways. Properties like `length` and indexes should work exactly as you would expect them to on an `Array` instance.

For examples, all of the following snippets work:
```javascript
let test = myLoudArray[2]; //sets the 'test' variable to the third item in the LoudArray.
```

```javascript
let myLoudArray = new LoudArray(null, ["one", "two", "three"]);
let test = myLoudArray.length; //sets the 'test' variable to the length of the LoudArray (3);
```

```javascript
let newArray = myLoudArray.slice(0, 5); //sets the 'newArray' variable to the first five elements of the myLoudArray instance.
//Note that the newArray variable will be a simple array, rather than a LoudArray instance. This is also true of the concat() method.
```

## Helpers
To facilitate type safety (as little of that is possible in vanilla JS...) and ease of use, the `LoudArray` library comes with two helper classes.

The `ArrayListener` class is a simple object storing two properties: the `event` and the `handler`. These correlate to the two parameters required to add an event listener to a `LoudArray` instance. 

The `ArrayEvent` class is an enumerator (in a rough sense. Because, again, vanilla JS...) that holds static values of all acceptable event types that can be passed in to either the `addEventListener()` or `removeEventListener()` methods on a `LoudArray` instance, or in to the constructor of an `ArrayListener` instance.

### ArrayListener
#### Usage
An `ArrayListener` instance requires two values to be passed in to its constructor that define the event type to listen for, and the handler function to execute, respectively. In example:
```javascript
let myListener = new ArrayListener('before-slice', () => { console.log('slicing, but no diceing. =('); });
let myAfterListener = new ArrayListener(ArrayEvent.AfterSlice, () => { console.log("That's some sliced fruit, dawg"); });
let fruits = new LoudArray([myListener, myAfterListener], ['mango', 'passionfruit', 'strawberry', 'tomato', 'tangelo']); //obviously, in a real-world scenario, this would throw an error as a tomato is not a culinary fruit.
```
#### Properties
| Name | Type | Description |
| --- | --- | --- |
| `event` | `string` | A string value representing when the event should be dispatched.<br />Examples: <code>"after-push"</code>, <code>"before-splice"</code>, <code>"before-all"</code>.<br /><em>(The helper class <code>ArrayEvent</code> contains all valid eventType values.)</em> |
| `handler` | `function` | The function that will be executed when the target event occurs. |
#### Methods
<table>
<tr><th colspan="4" align="left">constructor()</th></tr>
<tr><td><b>Syntax</b></td><td colspan="3"><code>ArrayListener(event, handler)</code></td></tr>
<tr><td><b>Description</b></td><td colspan="3">creates a new <code>ArrayListener</code> instance</td></tr>
<tr><td rowspan="3"><b>Params</b></td><td><b>Name</b></td><td><b>Type</b></td><td><b>Description</b></td></tr>
<tr><td><code>event</code></td><td><code>string</code></td><td>A string value representing when the event should be dispatched.<br />Examples: <code>"after-push"</code>, <code>"before-splice"</code>, <code>"before-all"</code>.<br /><em>(The helper class <code>ArrayEvent</code> contains all valid eventType values.)</em></td></tr>
<tr><td><code>handler</code></td><td><code>function</code></td><td>The function that will be executed when the target event occurs.</td></tr>
<tr><td><b>Returns</b></td><td colspan="3"><code>ArrayListener</code></td></tr>
</table>

### ArrayEvent
#### Usage
The `ArrayEvent` class is a static class used as a string enumerator. It cannot be instantiated and contains no methods. It is only meant as a way to enumerate the possible event types and, therefore, facilitate developers who are unfamiliar with those values.
```javascript
let myListener = new ArrayListener(ArrayEvent.AfterAll, () => { console.log('these years, you are still the one I want whispering in my ear'); });
let myAfterListener = new ArrayListener(ArrayEvent.BeforePush, () => { console.log("you around, well I will, well I will. If I wanna push you down, well I will, well I will"); });
let fruits = new LoudArray([myListener, myAfterListener]);
```
#### Properties
| Name | Type | Description |
| --- | --- | --- |
| BeforeAll | `string` | "before-all" |
| BeforeCopyWithin | `string` | "before-copy-within" |
| BeforeFill | `string` | "before-fill" |
| BeforePop | `string` | "before-pop" |
| BeforePush | `string` | "before-push" |
| BeforeReverse | `string` | "before-reverse" |
| BeforeShift | `string` | "before-shift" |
| BeforeSort | `string` | "before-sort" |
| BeforeSplice | `string` | "before-splice" |
| BeforeUnshift | `string` | "before-unshift" |
| AfterAll | `string` | "after-all" |
| AfterCopyWithin | `string` | "after-copy-within" |
| AfterFill | `string` | "after-fill" |
| AfterPop | `string` | "after-pop" |
| AfterPush | `string` | "after-push" |
| AfterReverse | `string` | "after-reverse" |
| AfterShift | `string` | "after-shift" |
| AfterSort | `string` | "after-sort" |
| AfterSplice | `string` | "after-splice" |
| AfterUnshift | `string` | "after-unshift" |

#### Methods
>None

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
LoudArray was developed to serve a wide variety of purposes but I hate to ship a library with features that most people won't use. I tried to keep LoudArray fairly svelte but there's plenty of fat to be trimmed. To that end, I've pared down the LoudArray library to make an even smaller library that can serve use cases that don't require as much versatility. The micro version of the library clocks in at ~3kB expanded and just under 2kB minified.

The major changes are:

- Removed the "before" event ability, thereby negating the need to handle events as "after". Instead, there is a single callback to be passed in, just like with the `addEventListener()` function that exists on `HTMLElement` objects. This callback will always occur **after** a change to the array has been made.
- The `eventType` parameter for the `addEventListener()` consists only of the method name (in dash-delimited lowercase), without a "before" or "after" prefix. In example:
This LoudArray code:
  ```
  myObservableArray.addEventListener('before-copy-within', (array, args) => { console.log('test'); } );
  ```  
  would be written with loud-array.micro as:
  ```
  myObservableArray.addEventListener('copy-within', (array, args) => { console.log('test'); } );
  ```