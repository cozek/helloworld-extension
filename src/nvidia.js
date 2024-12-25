"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function isNvidiaSmiAvailable() {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)('nvidia-smi', function (error, stdout, stderr) {
            if (error) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
// Example usage
isNvidiaSmiAvailable().then(function (isAvailable) {
    if (isAvailable) {
        console.log('nvidia-smi is available');
    }
    else {
        console.log('nvidia-smi is not available');
    }
});
// isNvidiaSmiAvailable().then(isAvailable => {
//     console.log(`nvidia-smi available: ${isAvailable}`);
// });
