import * as fs from 'fs';
import * as path from 'path';

enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}

class Logger {
    private logFilePath: string;

    constructor(logFileName: string = '../../../logs/log.txt') {
        this.logFilePath = path.join(__dirname, logFileName);
    }

    private log(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;
        
        console.log(logMessage);

        this.writeToFile(logMessage);
    }

    private writeToFile(message: string): void {
        fs.appendFile(this.logFilePath, message + '\n', (err) => {
            if (err) {
                console.error("Fehler beim Schreiben in die Log-Datei:", err);
            }
        });
    }

    info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    logo() {

        console.log(`
██╗  ██╗ █████╗ ██████╗ ███████╗███████╗    ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
██║  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
███████║███████║██║  ██║█████╗  ███████╗    ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝ 
██╔══██║██╔══██║██║  ██║██╔══╝  ╚════██║    ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝  
██║  ██║██║  ██║██████╔╝███████╗███████║    ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝                                                                       
            `)

    }

}

export default Logger;