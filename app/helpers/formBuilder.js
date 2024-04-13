// import { forEach } from "lodash"
// import { labels } from "../containers/ConstantManager"
// let chuncks;


// export const formBuilder = (json, col, mode) => {
//     // this function takes a json object and returns a html table if mode in view or input form in mode is edit.
//      chuncks = chuck(json, col);
//     if(mode === 'view' && chuncks.length > 1){
//         let html = '';
//         let tr;
//         chuncks.forEach((item)=>{
//             tr = `<tr>`
//             item.forEach((i)=>{
//                 tr += `<td>${item}</td>`
//             })
//             tr += `</tr>`    
//             return tr;
//         })
//         html += tr;
//         return html;
//     }
// }

// function chuck(object, col){
//     let values = Object.values(object);
//     let final = [];
//     let counter = 0;
//     let portion = {};

// for (var key in object) {
//   if (counter !== 0 && counter % col === 0) {
//     final.push(portion);
//     portion = {};
//   }
//   portion[key] = values[counter];
//   counter++
// }
// final.push(portion);
// return final;
// }
import React, { Component } from 'react'
export const FormBuilder = ({object, col, mode}) => {
    if(mode === 'view'){
        let html = '<table>';

        // Add table header
        html += '<thead><tr>';
        for(let i = 0; i < col; i++) {
            html += `<th>Column ${i+1}</th>`;
        }
        html += '</tr></thead>';

        // Add table body
        html += '<tbody>';
        html += '<tr>';
        let i = 0;
        for(let key in object) {
            if(typeof object[key] === 'object' && object[key] !== null) {
                // Skip if the value is an object
                continue;
            }
            if(i < col) {
                html += `<td>${object[key] || ''}</td>`;
                i++;
            } else {
                html += '</tr><tr>';
                html += `<td>${object[key] || ''}</td>`;
                i = 1;
            }
        }
        html += '</tr>';
        html += '</tbody>';

        html += '</table>';

        return html;
    }
}