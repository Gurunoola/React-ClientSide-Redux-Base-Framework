import React from 'react';
import _ from 'lodash';

const HtmlTableBuilder = ({ json, cols, mode }) => {
    if(mode === 'view'){
        let cells = [];
        let rows = [];
        let i = 0;

        // Get an array of the object's keys, sort it, and iterate over it
        let keys = Object.keys(json).sort();

        // Check for firstName, lastName, and middleName and add them to the first row
        ['firstName', 'lastName', 'middleName'].forEach(key => {
            if(keys.includes(key)) {
                cells.push(<td className='border-bottom pl-5'><label className='text-gray-500'>{_.startCase(key)}:</label> { _.capitalize(json[key]) || ''}</td>);
                i++;
                keys = keys.filter(k => k !== key);
            }
        });

        keys.forEach(key => {
            if(typeof json[key] === 'object' && json[key] !== null) {
                // Skip if the value is an object
                return;
            }
            cells.push(<td className='border-bottom pl-5'><label className='text-gray-500'>{_.startCase(key)}:</label> { _.capitalize(json[key]) || ''}</td>);
            i++;
            if(i === cols) {
                rows.push(<tr>{cells}</tr>);
                cells = [];
                i = 0;
            }
        });
        if(cells.length > 0) {
            // Calculate remaining columns and add them to the last cell
            let remainingCols = cols - cells.length;
            cells[cells.length - 1] = React.cloneElement(cells[cells.length - 1], { colSpan: remainingCols + 1 });
            rows.push(<tr>{cells}</tr>);
        }

        return (
            <table width="100%" height="100%" className='viewDataTable'>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
    return null;
}

export default HtmlTableBuilder;