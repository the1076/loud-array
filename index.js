//Imports
import LoudArray, { ArrayListener } from "./loud-array.min.js";

let addedListeners = [];

let $arrayContent;

let $arrayOperation_copyWithin;
let $copyWithin_targetIndex;
let $copyWithin_start;
let $copyWithin_end;
let $arrayOperation_fill;
let $fill_value;
let $fill_start;
let $fill_end;
let $arrayOperation_pop;
let $arrayOperation_push;
let $push_value;
let $arrayOperation_reverse;
let $arrayOperation_shift;
let $arrayOperation_sort;
let $arrayOperation_splice;
let $splice_start;
let $splice_count;
let $arrayOperation_unshift;

let $add_eventType;
let $add_logValue;
let $add_listener;

let $addedListeners;
let $remove_listener;

let $console;

//Startup
document.addEventListener('DOMContentLoaded', Document_OnContentLoaded);
function Document_OnContentLoaded()
{
    document.removeEventListener('DOMContentLoaded', Document_OnContentLoaded);

    let basicListener = new ArrayListener('after-all', (array, args) =>
    {
        updateArrayDisplay();
        log('after all', ...array);
    });

    window.testArray = new LoudArray([basicListener], ...['hello', 'world']);

    getStaticElements();
    addEventListeners();

    updateArrayDisplay();

    // testArray.addEventListener('before-push', (array, ...args) =>
    // {
    //     log('before push', array, ...args);
    // })
}
function getStaticElements()
{
    $arrayContent = document.getElementById('array-content');

    $arrayOperation_copyWithin = document.getElementById('array-operation-copy-within');
    $copyWithin_targetIndex = document.getElementById('copy-within-index');
    $copyWithin_start = document.getElementById('copy-within-start');
    $copyWithin_end = document.getElementById('copy-within-end');
    $arrayOperation_fill = document.getElementById('array-operation-fill');
    $fill_value = document.getElementById('fill-value');
    $fill_start = document.getElementById('fill-start');
    $fill_end = document.getElementById('fill-end');
    $arrayOperation_pop = document.getElementById('array-operation-pop');
    $arrayOperation_push = document.getElementById('array-operation-push');
    $push_value = document.getElementById('push-value');
    $arrayOperation_reverse = document.getElementById('array-operation-reverse');
    $arrayOperation_shift = document.getElementById('array-operation-shift');
    $arrayOperation_sort = document.getElementById('array-operation-sort');
    $arrayOperation_splice = document.getElementById('array-operation-splice');
    $splice_start = document.getElementById('splice-start');
    $splice_count = document.getElementById('splice-count');
    $arrayOperation_unshift = document.getElementById('array-operation-unshift');

    $add_eventType = document.getElementById('add-event-type');
    $add_logValue = document.getElementById('add-log-value');
    $add_listener = document.getElementById('add-listener');

    $addedListeners = document.getElementById('added-listeners');
    $remove_listener = document.getElementById('remove-listener');

    $console = document.getElementById('console');
}
function addEventListeners()
{
    $arrayOperation_push.addEventListener('click', arrayOperation_push_onClick);

    $add_listener.addEventListener('click', addListener);
    $remove_listener.addEventListener('click', removeListener);
}

function updateArrayDisplay()
{
    let elementArray = testArray.map((value) =>
    {
        return `<li>${value}</li>`;
    });
    $arrayContent.innerHTML = elementArray.join('');
}
function updateAddedListenersDisplay()
{
    let elementArray = addedListeners.map((value, index) =>
    {
        return `<option value="${index}">"${value.event}": Log "${value.logValue}"</option>`;
    });
    $addedListeners.innerHTML = '<option value="-1">&lt; Select a listener &gt;</option>' + elementArray.join('');
}

function addListener(event)
{
    let logValue = $add_logValue.value.trim();
    if(logValue == '')
    {
        return;
    }

    let eventType = $add_eventType.value;
    let listener = new ArrayListener(eventType, (array, ...args) => { log(eventType, logValue); });
    listener.logValue = logValue;

    addedListeners.push(listener);
    updateAddedListenersDisplay();

    testArray.addEventListener(listener);
    
    $add_logValue.value = '';
}
function removeListener(event)
{
    if($addedListeners.value == "-1")
    {
        return;
    }
    let index = parseInt($addedListeners.value)
    testArray.removeEventListener(addedListeners[index]);

    addedListeners.splice(index, 1);
    updateAddedListenersDisplay();
}

function log(...values)
{
    console.log(...values);
    let event = values.shift();
    $console.innerHTML += "event: " + event + "; values: " +  JSON.stringify(values) + '\n';
}

//array operations
function arrayOperation_push_onClick(event)
{
    if($push_value.value.trim() === '')
    {
        return;
    }

    testArray.push($push_value.value);
}