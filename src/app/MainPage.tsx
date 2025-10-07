'use client'
import Header from './components/Header'
import styles from './styles/MainPage.module.css'
import { AlexMovieList } from './MyMovieList'
import { Movie, StreamingDetails } from './Types'
import { inconspicuousString } from '@/constants'
import { useEffect, useState } from 'react'

export const MainPage = () => {
  const [movieWithStreamingData, setMovieWithStreamingData] = useState<Movie[]>([])

  const onGetMovieStreamingServices = async (movie: Movie): Promise<StreamingDetails[]> => {
    const titleId = movie['Watchmode ID']
    const url = `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${inconspicuousString}`;

    const response = await fetch(url);
    const json = await response.json();

    const movieStreamList = json.filter((streamingService: StreamingDetails) => 
      streamingService.region === 'US' 
      && (streamingService.type === 'sub' || streamingService.type === 'free'))

    return movieStreamList
  }

  // NEED TO FIX DEPLOY FAILURE. Looked like mostly small stuff

  useEffect(() => {
    // 1. Define an async function to execute the fetches
    const fetchAllStreamingData = async () => {
      // 2. Create an array of Promises
      const streamingPromises = AlexMovieList.map(async (movie) => {
        try {
          // Await the fetch for the current movie
          const services = await onGetMovieStreamingServices(movie);
          
          // Return a new object that merges the original movie
          // with the new 'streamingServices' property
          return {
            ...movie,
            streamingServices: services
          };
        } catch (error) {
          console.error(`Error fetching services for ${movie.Title}:`, error);
          // Return the original movie if the fetch failed
          return movie;
        }
      });

      // 3. Use Promise.all to wait for all promises to resolve
      const updatedMovieList = await Promise.all(streamingPromises);

      // 4. Update the state with the complete, new array
      setMovieWithStreamingData(updatedMovieList);
    };

    fetchAllStreamingData();
  }, []); // Run only once on mount

  console.log('data: ', movieWithStreamingData)

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.mainBodyContainer}>
        {/* <SearchBar /> */}
        <div
          id='AlexListContainer'
          className={styles.alexListContainer}
        >
          <table>
            <thead>
              <tr>
                {'Streaming Services'}
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>Inception</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr> */}
              {movieWithStreamingData.map((movie, index) => {
                return (
                  <tr key={index}>
                    <td>{movie.Title}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'row'}}>
                        {movie.streamingServices?.map((streamingService, index) => (
                          <div key={index}>
                            {streamingService.name}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default MainPage