import moment from "moment";

export const capitalizeString = (text) => {
    const temp = text.replace(/([A-Z])/g, " $1");
    const title = temp.charAt(0).toUpperCase() + temp.slice(1);
    return title;
}

export const dateFormat = (d, to) => {
    return moment(d).format(to);
}

export const isUndefinedOrNull = (value) => {
    return _.isUndefined(value) || _.isNull(value);
}

export const isBirthday = (d)=>{
    const date = new Date(d);
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
};