const API_KEY = '413833405fad2fb8932b2f0299c42e63'
const ARTISTS_URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=argentina&api_key=${API_KEY}&format=json`

export function getArtists() {
  return fetch(ARTISTS_URL)
    .then(res => res.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map(a => {
      return {
        name: a.name,
        image: a.image[3]['#text'],
        likes: 200,
        comments: 140,
      }
    }))
}