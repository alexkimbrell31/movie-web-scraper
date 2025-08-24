// What I'm looking for is a table with the streaming
// services on the left hand side, and a list of movies
// on the right hand side of the table/view. And basically
// if you select a different streaming service, the 
// right hand list of movies is updated to show only the
// movies that are available on that particular platform
// 
// Streaming Services:
// - Netflix
// - Hulu
// - Apple TV
// - Amazon Prime (show price)
// 
// Need an API or some way to scrape google search results
// - check here: https://developer.themoviedb.org/reference/intro/getting-started
// This endpoint to get the movieId based on the text string: 
// This endpoint to get the streaming services: https://developer.themoviedb.org/reference/movie-watch-providers
// ^ SUPER COMPLICATED, but have have to revert back to this.

// Could potentially try this too: https://api.watchmode.com/docs#title-sources
// Got a list of IDs to use. Search the csv doc 'title_id_map.csv' in this project.


// import { useEffect } from "react";

// like once  a day (or just add a 'refresh' button on the page somewhere)
const MovieTable = () => {

    

    
    return (
        <div>
            MovieTable
            <table>
                <thead>
                    <tr>
                        <th>Streaming Service</th>
                        <th>Movies</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Netfilx</td>
                        <td>
                            <p>American Beauty</p>
                            <p>Fight Club</p>
                            <p>American History X</p>
                            <p>Fast & Furious</p>
                            <p>The Departed</p>
                            <p>Space Jam</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Hulu</td>
                        <td>
                            <p>The Shawshank Redemption</p>
                            <p>The Hulk</p>
                            <p>Avengers: Infinity War</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Apple TV</td>
                        <td>
                            <p>The Minecraft Movie</p>
                            <p>The Accountant</p>
                            <p>Avengers: Endgame</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Amazon Prime</td>
                        <td>
                            <p>Good Will Hunting</p>
                            <p>Angels & Demons</p>
                            <p>Airplane!</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MovieTable