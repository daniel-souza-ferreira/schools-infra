import csv from "csv-parser"
import fs from 'node:fs'

export async function processCsvFile(filePath) {
    const rows = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', data => rows.push(data))
            .on('end', () => resolve(rows))
            .on('error', reject)
    })
}