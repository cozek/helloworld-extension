import { exec, execSync } from 'child_process';
import { parse } from 'csv-parse/sync';


export function isNvidiaSmiAvailable(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        exec('nvidia-smi', (error, stdout, stderr) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export interface NvidiaSmiData {
    user_name: string;
    pid: number;
    GPU_ID: number;
    used_gpu_memory: number;
}

export interface GpuCountData {
    user_name: string;
    used_gpu_memory: number;
    GPU_Count: number;
}

export function readNvidiaSmi(): any[] {
    try {
        const output1 = execSync('nvidia-smi --query-gpu=index,gpu_bus_id --format=csv').toString();
        const output2 = execSync('nvidia-smi --query-compute-apps=pid,gpu_bus_id,used_memory --format=csv').toString();

        const df1 = parse(output1, { columns: true });
        const df2 = parse(output2, { columns: true });

        return [df1, df2];
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error reading Nvidia SMI data: ${error.message}`);
        } else {
            throw new Error('Error reading Nvidia SMI data');
        }
    }
}



// Example usage
// isNvidiaSmiAvailable().then(isAvailable => {
//     if (isAvailable) {
//         console.log('nvidia-smi is available on this system.');
//     } else {
//         console.log('nvidia-smi is not available on this system.');
//     }
// });