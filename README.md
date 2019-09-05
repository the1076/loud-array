# LoudArray
An Observable Array for javascript in ES6 (ES2015) modules

## Description
LoudArray is a library used for observing arrays written in vanilla Javascript using a suite of ES6 functionality.
The entire library is <5kB expanded and <3kB minified.
This code has been prioritized for readability and, as such, may benefit greatly from optimization.

Why "Loud"? Because this is an array you can listen to.
Not only can you listen to it, but you can add as many listeners (and, therefore, handlers) as you'd like. Everything this array does can be heard because this array is LOUD!

## Getting Started

### Importing the library

### Usage
#### Initialization

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
Tested and working in modern version of Chrome, Firefox, and Edge.

## Notes
- The ArrayEvent helper class is strictly used for developer-friendliness and could be removed with no additional code changes, if it is not relied upon.
- The ArrayListener helper class is used for known-objects and properties, so it is a little more integrated but could also be removed, with minor rework.