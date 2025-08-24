import { RowData } from "./Types";

// Probs make sense to just generate this list until we actually
// start using a database to store movies. Until then, I'd just 
// append movies to this list. We'll fetch each on initial load.

export const AlexMovieList: RowData[] = [
    {
        "Watchmode ID": "175331",
        "IMDB ID": "tt4575576",
        "TMDB ID": "420814",
        "TMDB Type": "movie",
        Title: "Christopher Robin",
        Year: "2018"
    },
    {
        "Watchmode ID": "1400461",
        "IMDB ID": "tt0085794",
        "TMDB ID": "262",
        "TMDB Type": "movie",
        Title: "The King of Comedy",
        Year: "1982"
    },
    {
        "Watchmode ID": "1468002",
        "IMDB ID": "tt0096438",
        "TMDB ID": "856",
        "TMDB Type": "movie",
        Title: "Who Framed Roger Rabbit",
        Year: "1988",
    },
]