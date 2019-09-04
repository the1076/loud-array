import LoudArray, { ArrayListener } from "./loud-array.min.js";

//Imports

//Startup
document.addEventListener('DOMContentLoaded', Document_OnContentLoaded);
function Document_OnContentLoaded()
{
    document.removeEventListener('DOMContentLoaded', Document_OnContentLoaded);

    window.testArray = new LoudArray([new ArrayListener('after-push', (array, args) => { console.log('after push', array); })], ...['hello', 'world']);

    testArray.addEventListener('before-push', (array, ...args) =>
    {
        console.log('before push', array, ...args);
    })
}
