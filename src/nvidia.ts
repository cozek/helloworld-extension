import { exec, execSync } from 'child_process';
import { parse } from 'csv-parse/sync';
import { gunzip } from 'zlib';


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


export function readNvidiaSmi(): any[] {
    try {
        // gpu_bus_id,
        const output1 = execSync('nvidia-smi --query-gpu=index,memory.used,memory.free,memory.total --format=csv').toString();
        const output_data = parse(output1, { columns: true });

        // Define the new column names
        const newColumnNames = {
            'index': 'GPU ID',
            ' memory.used [MiB]': 'Used [MiB]',
            ' memory.free [MiB]': 'Free [MiB]',
            ' memory.total [MiB]': 'Total [MiB]',
        };

        // Rename the columns
        const renamedOutputData = output_data.map((row: { [key: string]: any }) => {
            const renamedRow: { [key: string]: any } = {};
            for (const [oldName, newName] of Object.entries(newColumnNames)) {
                renamedRow[newName] = row[oldName];
            }
            return renamedRow;
        });
        return [renamedOutputData];
        // TODO:
        //  display more information for each GPU
        // const output2 = execSync('nvidia-smi --query-compute-apps=pid,process_name,gpu_bus_id,used_memory --format=csv').toString();
        // const df2 = parse(output2, { columns: true });
        // return [df1, df2];
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

//         const dfs = readNvidiaSmi();

//         // console.table(dfs[0]);
//         // console.table(dfs[1]);

//     } else {
//         console.log('nvidia-smi is not available on this system.');
//     }
// });

