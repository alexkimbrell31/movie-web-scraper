import Papa from 'papaparse';
import 'react';
import { Dispatch, SetStateAction } from 'react';
import { RowData } from '../Types';

const CSV_FILE_PATH = '/movie-web-scraper/title_id_map.csv' // length:  934561

type FetchCsvDataProps = {
    setData: Dispatch<SetStateAction<RowData[]>>,
    setIsLoadingCSV: Dispatch<SetStateAction<boolean>>
}

export const FetchCsvData = async ({
    setData,
    setIsLoadingCSV
}: FetchCsvDataProps) => {
    try {
        // 1. Fetch the CSV file from its URL
        setIsLoadingCSV(true)
        const response = await fetch(CSV_FILE_PATH)

        if (!response.ok) {
            console.log('Throwing error')
            console.log('response: ', response)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const csvText = await response.text();
        // console.log('csvText: ', csvText)
        
        Papa.parse(csvText, {
            header: true, // Assuming your CSV has headers
            skipEmptyLines: true,
            complete: (results: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                setData(results.data);
                setIsLoadingCSV(false)
                // console.log('length: ', results.data.length)
            },
            error: (err: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                console.log('Error: ', err)
            }
        });
    } catch (e) {
        console.log('Catch Block - ran into issue fetching Movie CSV File')
        console.log('e: ', e)
    }
}
