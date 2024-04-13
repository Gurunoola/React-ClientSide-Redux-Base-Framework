import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AsyncDropdown from '../containers/AsyncDropdown/Loadable';
import Collapsiable from './Collapsiable';
import _ from 'lodash';

const FormBuilder = ({ data, onSubmit, cols, defaultValues, buttons, id }) => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues
    });

    return (
        <form id={id} onSubmit={handleSubmit(onSubmit)}>
            {Object.entries(data).map(([key, dataArray], index) => (
                <Collapsiable title={_.startCase(key)} body={
                    <div className='row p-3'>
                        {dataArray.map((item, index) => (
                            <div key={index} className={`col-md-${12 / cols} mb-4`}>
                                <label>{item.label}</label>
                                <Controller
                                    name={item.name}
                                    control={control}
                                    rules={item.validation}
                                    render={({ field }) => (
                                        item.type === 'select' ?
                                            <select {...field} className='form-control'>
                                                {item.async ? <AsyncDropdown dataType={item.asyncDataType} value={_.get(data, item.name)} /> :
                                                    item.options.map((option, index) => (
                                                        <option key={index} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                            </select>
                                            :
                                            <input {...field} type={item.type} className='form-control' />
                                    )}
                                />
                                {errors[item.name] && <p className='text-danger fs-6 fst-italic'>{errors[item.name].message}</p>}
                            </div>
                        ))}
                    </div>} />
            ))}
            {buttons}
        </form>
    );
};

export default FormBuilder;