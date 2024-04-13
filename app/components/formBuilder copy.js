import React from 'react';

const FormBuilder = ({ formData, col }) => {
    const renderFormFields = () => {
        let fields = Object.keys(formData).map((key) => {
            const field = formData[key];
            return (
                <div key={key} className="col-md-4 mb-4">
                    <label htmlFor={key}>{field.label}</label>
                    <input type={field.type} id={key} name={key} />
                </div>
            );
        });

        let rows = [];
        for(let i = 0; i < fields.length; i += col) {
            rows.push(
                <div className="row">
                    {fields.slice(i, i + col)}
                </div>
            );
        }

        return rows;
    };

    function inputType (type) {
        switch (type) {
            case 'text':
                return 'text';
            case 'email':
                return 'email';
            case 'password':
                return 'password';
            default:
                return 'text';
        }
    }

    return (
        <form>
            {renderFormFields()}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormBuilder;