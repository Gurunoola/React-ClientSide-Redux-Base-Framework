
import { globalConfigs } from "../globalConfigs"
export const logger = (msg, type)=>{ 
   const { tag, defaultSymbols, terminalColors } = globalConfigs.loggerConfigs

    var styleNone = '';
    const style = `color: white; background:${terminalColors[type]}; font-size:12px;`;
    switch(type){
        case 'info':
            console.info(`%c ${tag}%c ${msg}`, style, styleNone)
        break;
        case 'warn':
            console.warn(`%c ${tag}%c ${msg}`, style, styleNone)
        break;
        case 'error':
            console.error(`%c ${defaultSymbols.error} ${tag} - ERROR %c ${msg}`, style, styleNone)
        break;
        default :
            console.log(`%c ${tag}%c ${msg}`, style, styleNone)
    }

}