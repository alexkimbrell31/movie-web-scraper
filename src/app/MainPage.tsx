'use client'
import Header from './components/Header'
import SearchBar from "./components/SearchBar"
import styles from './styles/MainPage.module.css'
import { AlexMovieList } from './MyMovieList'
import { Movie, StreamingDetails } from './Types'
import { inconspicuousString, STREAMING_SERVICES } from '@/constants'
import { useEffect } from 'react'

export const MainPage = () => {

  const onGetMovieStreamingServices = async (movie: Movie) => {
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

  useEffect(() => {
    AlexMovieList.forEach((movie) => {
      onGetMovieStreamingServices(movie)
    })
  }, [])

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
                {STREAMING_SERVICES.map((streamingService, index) => {
                  return (
                    <th key={index}>
                      {streamingService.Name}
                    </th>
                  )
                })}
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
              {AlexMovieList.map((movie, index) => {
                return (
                  <tr key={index}>
                    <td>{movie.Title}</td>
                    <td>{movie.onAmazonPrime ? 'Yes' : 'No'}</td>
                    <td>{movie.onDisneyPlus ? 'Yes' : 'No'}</td>
                    <td>{movie.onHBOMax ? 'Yes' : 'No'}</td>
                    <td>{movie.onHulu ? 'Yes' : 'No'}</td>
                    <td>{movie.onNetflix ? 'Yes' : 'No'}</td>
                    <td>{movie.onParamountPlus ? 'Yes' : 'No'}</td>
                    <td>{movie.onPeacock ? 'Yes' : 'No'}</td>
                    <td>{movie.onTubi ? 'Yes' : 'No'}</td>
                    <td>{movie.onVudu ? 'Yes' : 'No'}</td>
                    <td>{movie.onHoopla ? 'Yes' : 'No'}</td>
                    <td>{movie.onPlex ? 'Yes' : 'No'}</td>
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