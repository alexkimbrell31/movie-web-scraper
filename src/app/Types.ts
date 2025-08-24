export type RowData = {
    ['Watchmode ID']: string
    ['IMDB ID']: string
    ['TMDB ID']: string
    ['TMDB Type']: string
    Title: string
    Year: string
}

export const API_ROOT_URL = "https://api.watchmode.com/v1/"
// We need to use this https://api.watchmode.com/v1/title/{title_id}/sources/ (Title Streaming Sources API - https://api.watchmode.com/docs#title-sources)

export type StreamingDetails = {
    ['android_url']: string | null
    episodes: number | null
    format: string | null
    ['ios_url']: string | null
    name: string | null
    price: number | null
    region: string | null
    seasons: number | null
    ['souce_id']: number | null
    type: 'free' | 'sub' | 'rent' | 'buy' | null
    ['web_url']: string | null
}