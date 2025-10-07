'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import { FetchCsvData } from '../sideEffects/MovieCSVFile'
import styles from '../styles/SearchBar.module.css'
import { Movie } from '../Types';
// import { Movie, StreamingDetails } from '../Types';
// import { inconspicuousString } from '@/constants';

const SearchBar = () => {
    const [data, setData] = useState<Movie[]>([])
    const [filteredRows, setFilteredRows] = useState<Movie[]>([])
    const [isLoadingCSV, setIsLoadingCSV] = useState(false)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [userSearch, setUserSearch] = useState('')
    
    // 💡 NEW STATE: To hold the formatted movie object string
    const [movieObjectString, setMovieObjectString] = useState<string | null>(null);

    useEffect(() => {
        FetchCsvData({setData, setIsLoadingCSV}) // Grabs csv file with entire list of movies
    }, [])

    const onChangeMovie = (e: ChangeEvent<HTMLInputElement>) => {
        setUserSearch(e.target.value)
    }

    const checkMovie = () => {
        setIsLoadingSearch(true)
        // Ensure filtering is case-insensitive and safe
        const searchResults = data?.filter((row) => 
            row['Title']?.toLowerCase().includes(userSearch.toLowerCase()))
        setFilteredRows(searchResults)
        setIsLoadingSearch(false)
    }

    // This function now formats the movie object for display
    const onSelectMovie = (movie: Movie) => {
        
        // 1. Create a simplified object containing only the necessary fields
        const simplifiedMovie = {
            "Watchmode ID": movie["Watchmode ID"],
            "IMDB ID": movie["IMDB ID"],
            "TMDB ID": movie["TMDB ID"],
            "TMDB Type": movie["TMDB Type"],
            Title: movie.Title,
            Year: movie.Year,
        };

        // 2. Convert the object to a JSON string
        const jsonString = JSON.stringify(simplifiedMovie, null, 4); // null, 4 for pretty printing

        // 3. Format it to look like the JavaScript object literal you want
        //    (Remove surrounding braces and quote keys that don't need them)
        const formattedString = jsonString
            .replace(/^{\n/, '')   // Remove opening brace + newline
            .replace(/\n}$/, '')  // Remove newline + closing brace
            // Replace double quotes around Title and Year keys with nothing
            .replace(/"Title":/g, 'Title:')
            .replace(/"Year":/g, 'Year:');
            
        // 4. Wrap the result in the braces and add a comma for easy copy-paste
        const finalOutput = `{\n${formattedString},\n}`;

        // 5. Save the string to state
        setMovieObjectString(finalOutput);

        // Optional: You could also call your streaming service logic here if needed
        // onGetMovieStreamingServices(movie); 
    }
    
    // Keeping the original function, but note it's not called in the new workflow
    // const onGetMovieStreamingServices = async (movie: Movie) => {
    //     // ... original API fetching logic ...
    //     // (You can safely remove this if it's no longer the intended action on 'Select')
    //     const titleId = movie['Watchmode ID']
    //     const url = `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${inconspicuousString}`;

    //     const response = await fetch(url);
    //     const json = await response.json();

    //     const movieStreamList = json.filter((streamingService: StreamingDetails) => 
    //         streamingService.region === 'US' 
    //         && (streamingService.type === 'sub' || streamingService.type === 'free'))
    //     console.log(movie.Title)
    //     console.log(movieStreamList)
    // }
    
    
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
                    placeholder="Search movie title..."
                />
                <button onClick={checkMovie}>
                    Check Movie
                </button>
            </div>
            
            {/* 💡 NEW OUTPUT AREA for the formatted object */}
            {movieObjectString && (
                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap' // Important for displaying the newlines
                }}>
                    <h4 style={{marginTop: 0}}>Copy & Paste to AlexMovieList:</h4>
                    <pre>{movieObjectString}</pre>
                </div>
            )}
            
            <div className={styles.searchBarContainer}>
                {/* ... Loading Statuses ... */}
                {isLoadingCSV && (<div><p>Downloading Movies</p></div>)}
                {isLoadingSearch && (<div><p>Searching for relevant movies</p></div>)}

                {!(isLoadingCSV || isLoadingSearch) && (
                    <div>
                        <p>Length: {filteredRows.length}</p>
                        {filteredRows.map((row, index) => (
                            <div
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px 0'
                                }}
                            >
                                <p style={{margin: 0}}>
                                    **{row['Title']}** ({row.Year}) - IMDB ID: {row['IMDB ID']}
                                </p>
                                <button
                                    // 💡 CALL THE NEW SELECT HANDLER
                                    onClick={() => onSelectMovie(row)}
                                    style={{
                                        marginLeft: '10px',
                                        flexShrink: 0
                                    }}>
                                    Select Movie
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar