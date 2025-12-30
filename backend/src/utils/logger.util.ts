/**logger utility to keep track of what happens when the code runs
 * Use cases:
 * -server startup
 * -database lifestyle
 * -incoming http requests
 * -authentication and authorization
 * -etc
*/

import chalk from 'chalk';

type LogLevel = "info" | "warn" | "error" | "success" | "debug";

//Keep track of when the event occurred
const getTimeStamp = (): string =>{
    return new Date().toISOString();
}

const log = (level: LogLevel, message: string, ...optionalParams: any[]) =>{
    const timeStamp = getTimeStamp();

    const prefix = {
        info: chalk.blueBright('ℹ️ [INFO]'),
        warn: chalk.yellow('⚠️ [WARN]'),
        error: chalk.red('❌ [ERROR]'),
        success: chalk.green('✅ [SUCCESS]'),
        debug: chalk.magenta('🐞 [DEBUG]')
    }[level];

    console.log(`${chalk.grey(timeStamp)}${level}${message}`,...optionalParams);
}

export const logger = {
    info: (msg: string, ...params: any[]) => log('info', msg, ...params),
    warn: (msg: string, ...params: any[]) => log('warn', msg, ...params),
    error: (msg: string, ...params: any[]) => log('error', msg, ...params),
    success: (msg: string, ...params: any[]) => log('success', msg, ...params),
    debug: (msg: string, ...params: any[]) => log('debug', msg, ...params)
}


