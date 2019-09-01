/**
 * Делает npm install всех компонентов системы
 * ts->js
 * Запаковывает модули компонентов в 1 файл
 */

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const SPIN_SLEEP_TIME = 3000;   // праметры для форевера
const MIN_UPTIME = 3000;

// команды, которые нужно выполнить перед запуском лайта...
const commandBefore = 'npm install --no-warnings && npm run build';
const folders= [
    __dirname + '/server',
    __dirname + '/client'
];

// ... и после него
const commandsAfter = [
    'echo -----------------------------------',
    'cd ..',
];



// чтобы можно было делать await
function execAsync(folder){
    // возвращаем ошибку если команде понадобилось больше заданного времени
    // для выполнения
    const maxTime = 500000;
    let rejected = false;
    return new Promise((resolve, reject)=> {
        let timeout = setTimeout(()=> {
            rejected = true;
            reject(new Error('error: ' + commandBefore + `: timeout of ${maxTime} msec exceeded` ));
        }, maxTime);
        childProcess.exec(commandBefore, {cwd: folder}, (error, stdout, stderr) => {
            clearTimeout(timeout);
            if (rejected){
                return;
            }
            if (error) {
              return reject(error);
            }
            resolve({ stdout, stderr });
          });
    });
}

async function executeCommandAsync(folder){
    return new Promise(async (resolve)=> {
        try {
            const output = await execAsync(folder);
            process.stdout.write(output.stdout);
            process.stderr.write(output.stderr);
        } catch(e){
            console.error(e.message);
        }
        resolve();
    });
}

(async ()=> {
    for (let i = 0; i < folders.length; i++) {
        await executeCommandAsync(folders[i]);
    }
    for (let i = 0; i < commandsAfter.length; i++) {
        await executeCommandAsync(commandsAfter[i]);
    } 

    console.log("\x1b[32m", "\n\n \u2713  Done");
    
    process.exit(0);
})();
