import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { globalConfigs } from '../../globalConfigs'
import Select from 'react-select'
import { Controller } from 'react-hook-form';

import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
} from '../ConstantManager';

export default function AsyncDropdown(props) { //change for new component

  const { dropDownOptions } = globalConfigs
  const {
    NETWORK_ERROR,
    CLASSES: {
      LIST_GET_SUCCESS: classesGetSuccess
    },
    TEACHERS: {
      LIST_GET_SUCCESS: teachersGetSuccess
    },
    SUBJECTS: {
      LIST_GET_SUCCESS: subjectsGetSuccess
    }
  } = EVENT;

  // all states
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  const {
    isMulti = false,
    dataType,
    name,
    state,
    defaultValue,
    register,
    validate,
    control,
    rules,
    errorMessage
  } = props;

  const optionsValues = {
    "classes": ['id', 'name', 'section'],
    "teachers": ['id', 'firstName', 'lastName'],
    "subjects": ['id', 'name'],
  }

  // All toast actions
  const {
    getRolesList,
    getAcademicYearsList,
    getClassesList,
    getTeachersList,
    getSubjectsList,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  let result = undefined;

  useEffect(() => {
    switch (dataType) {
      case 'classes':
        result = _.get(state, 'asyncDropdown.classes.result.data', undefined);
        if (!result) { getClassesList(); getTeachersList(); }
        break;
      case 'teachers':
        result = _.get(state, 'asyncDropdown.teachers.result.data', undefined);
        if (!result) { getTeachersList(); getClassesList() }
        break;
      case 'subjects':
        result = _.get(state, 'asyncDropdown.classes.result.data', undefined);
        if (!result) { getSubjectsList(); }
        break;
      case 'bloodGroup':
        setOptions(prepOptions(dropDownOptions.bloodGroup, true));
        setLoading(false);
        break;
      case 'maritalStatus':
        setOptions(prepOptions(dropDownOptions.maritalStatus, true));
        setLoading(false);
        break;
      case 'gender':
        setOptions(prepOptions(dropDownOptions.gender, true));
        setLoading(false);
        break;
      case 'roles':
        setOptions(prepOptions(dropDownOptions.roles, true));
        setLoading(false);
        break;
      case 'department':
        setOptions(prepOptions(dropDownOptions.department, true));
        setLoading(false);
        break;
      case 'relationship':
        setOptions(prepOptions(dropDownOptions.relationship, true));
        setLoading(false);
        break;

    }
  }, [])

  useEffect(() => {
    const d = _.get(state, `asyncDropdown.${dataType}.type`)
    switch (d) {
      case teachersGetSuccess:
      case classesGetSuccess:
      case subjectsGetSuccess:
        if (_.get(state, `asyncDropdown.${dataType}.result.data`))
          setOptions(prepOptions(_.get(state, `asyncDropdown.${dataType}.result.data`)));
        else
          setOptions([], null);
        setLoading(false);
        break;
    }
  }, [state]);

  const prepOptions = (data = [], isLocal = false) => {
    const retData = [];
    if (isLocal) {
      data.forEach(element => {
        retData.push({
          value: dataType === 'bloodGroup' ? _.toUpper(element) : _.camelCase(element),
          label: dataType === 'bloodGroup' ? _.toUpper(element) : _.capitalize(element),
        })
      });
      return retData;
    }
    data.forEach(element => {
      retData.push({
        value: element[optionsValues[dataType][0]],
        label: `${element[optionsValues[dataType][1]]} ${element[optionsValues[dataType][2]] || ''}` || undefined
      })
    });
    return retData;
  }

  const getSelect = (values) => {
    if (values === undefined) return [];
    const k = [];
    if (isMulti) {
      values.forEach(element => {
        if (_.has(element, 'id')) {
          k.push({ value: element.id, label: `${element.name} ${element.section}` });
        }
        else {
          k.push(element)
        }
      });
      return k;
    }
    else return values
  }

  if (!isMulti) {
    return loading ? <option selected={true}>{labels.LOADING}</option> : <>
    <option value="">{labels.PLEASE_SELECT}</option>
      {
      options.map(item=>{
        let selected = false;
        if(item.value === props.value)
          selected = true;
        return <option selected={selected} value={item.value}>{item.label}</option>
      })
    }
    </>
  } else {
    return <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            id="classes"
            closeMenuOnSelect={false}
            placeholder="Choose option"
            isMulti={isMulti}
            options={options}
            value={getSelect(field.value)}
            onChange={value => field.onChange(value)}
            on
          />
        )}
      /></>
  }
}