import { RowData } from "./Types";

// Probs make sense to just generate this list until we actually
// start using a database to store movies. Until then, I'd just 
// append movies to this list. We'll fetch each on initial load.

// Other movies to add here:
// Scott Pilgrim vs The World
// 500 Days of Summer
// Cashback
// The Wickerman
// Goodfellas
// Citizen Kane
// Slenderman
// White Men Can't Jump
// Saw
// Platoon
// The King of Comedy
// The Sixth Sense
// The Manchurian Candidate
// Finding Neverland
// Fargo
// Quiz Show
// Field of Dreams
// The Aviator
// Terms of Endearment
// Alice in Wonderland
// The Star Chamber
// VisionQuest
// Casino
// War Games
// Who Framed Roger Rabbit
// No Country for Old Men
// Balls of Fury
// Blades of Glory
// The Usual Suspects
// American History X
// The Godfather
// Braveheart
// October Sky
// Cast Away

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