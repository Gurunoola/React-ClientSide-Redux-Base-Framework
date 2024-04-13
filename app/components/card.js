import React, { Component, useEffect, useState } from 'react'
import {Icon} from '../components';
import Select from 'react-select';



function Card({ title = '', body = 'Sample Body', options = {}, headerClass, searchOptions, className }) {
    const [classes, setClasses] = useState('card')
    const { enabled = false, filters, onChange: _onChange } = searchOptions || [];
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const shadow = (options.shadow === undefined || options.shadow) ? '' : '';
        const border = options.border || '';
        setClasses(`${classes} ${shadow} ${border}  h-100 overflow-auto ${className}`)
    }, [])

    return (
        <div className={`card ${classes}`}>
            {title || enabled ?
                <div className={`card-header ${headerClass}`}>
                   
                        <div className="d-flex bd-highlight">
                            <div className="mt-2 d-sm-block align-middle flex-grow-1 "><b>{title}</b>
                            </div>
                            {enabled ? <div className="p-0 bd-highlight">
                                <form action="" >
                                    <div className="input-group">
                                        <Select
                                            name='select'
                                            defaultValue={selectedOption}
                                            options={filters}
                                            isMulti={false}
                                            onChange={_onChange}
                                            placeholder='Find By'
                                        />

                                        <input type="search" onChange={_onChange} className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-secondary btn-sm" type="button">
                                                <Icon icon={'search'} type="white" size='16px' />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div> : undefined}
                        </div> 
                </div> : undefined
            }
            <div className="card-body overflow-auto">
                {body}
            </div>
        </div>
    );
}

export default Card;