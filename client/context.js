
// import React, { useRef, useEffect } from 'react'

//this is a kludge fix. currently getting the canvas from index.html thru context.js, so Canvas.js isn't really doing anything. 

export const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log('HELLLLLLLLLOOOOOO, FROM CONTEXT.JS. canvas.width is: ', canvas.width);
export const c = canvas.getContext('2d');
