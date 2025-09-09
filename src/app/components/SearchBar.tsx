import { ChangeEvent, useEffect, useState } from 'react';
import { FetchCsvData } from '../sideEffects/MovieCSVFile'
import styles from '../styles/SearchBar.module.css'
import { RowData, StreamingDetails } from '../Types';
import { AlexMovieList } from '../MyMovieList';
import { inconspicuousString } from '@/constants';

const SearchBar = () => {
    const [data, setData] = useState<RowData[]>([])
    const [filteredRows, setFilteredRows] = useState<RowData[]>([])
    const [isLoadingCSV, setIsLoadingCSV] = useState(false)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [userSearch, setUserSearch] = useState('')
    const [streamingList, setStreamingList] = useState<StreamingDetails[]>([])

    useEffect(() => {
        FetchCsvData({setData, setIsLoadingCSV}) // Grabs csv file with entire list of movies
    }, [])

    const onChangeMovie = (e: ChangeEvent<HTMLInputElement>) => {
        setUserSearch(e.target.value)
    }

    const checkMovie = () => {
        setIsLoadingSearch(true)
        const searchResults = data?.filter((row) => row['Title'].includes(userSearch))
        setFilteredRows(searchResults)
        setIsLoadingSearch(false)
        console.log('filteredRows: ', searchResults)
    }

    const onGetMovieStreamingServices = async (movie: RowData) => {
        // console.log('onGetMovieStreamingServices Movie: ', movie)
        
        //Now make the API call here:
        const titleId = movie['Watchmode ID']
        const url = `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${inconspicuousString}`;

        const response = await fetch(url);
        const json = await response.json();

        const movieStreamList = json.filter((streamingService: StreamingDetails) => 
            streamingService.region === 'US' 
            && (streamingService.type === 'sub' || streamingService.type === 'free'))
        console.log(movie.Title)
        console.log(movieStreamList)
    }

    // Should probably have like a "check list" function or something like that
    // useEffect(() => {
    //     const MyList = AlexMovieList.forEach((movie) => {
    //         onGetMovieStreamingServices(movie)
    //     })
    // }, [])
    
    
    return (
        <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignSelf: 'center'
        }}>
            <br/>
            <div style={{
                paddingBottom: '20px'
            }}>
                <input
                    type="search"
                    value={userSearch}
                    onChange={onChangeMovie}
                />
                <button onClick={checkMovie}>
                    Check Movie
                </button>
            </div>
            <div className={styles.searchBarContainer}>
                {isLoadingCSV && (
                    <div>
                        <p>Downloading Movies</p>
                    </div>
                )}
                {isLoadingSearch && (
                    <div>
                        <p>Searching for relevant movies</p>
                    </div>
                )}
                {!(isLoadingCSV || isLoadingSearch) && (
                    <div>
                        <p>Length: {filteredRows.length}</p>
                        {filteredRows.map((row, index) => (
                            <div style={{
                                flexDirection: 'row',
                                display: 'flex',
                            }}>
                                {/* Add Table here [Name, Year, IMDB ID, and Select Movie Button] */}
                                <p key={index}>
                                    {row['Title']} {(row.Year)} - IMDB ID: {row['IMDB ID']}
                                </p>
                                <button
                                    onClick={() => onGetMovieStreamingServices(row)}
                                    style={{
                                        marginLeft: '10px'
                                }}>
                                    Select Movie
                                </button>
                            </div>
                            // Might make sense to add a component here to click a button
                            // to then retrieve the list of streaming services. Pass IDMB ID down as prop.
                            // Will need to search through that awful response object.
                            //
                            // Eventually, this should be replaced with an 'Add to my list' button
                            // and then on every app start up we just get all movies on the Users
                            // list and check which streaming services currently offer them.
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar