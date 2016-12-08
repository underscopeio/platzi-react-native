const API_KEY = 'e5f95ee46580f32ab850e3cbfddec906'
const ARTISTS_URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=argentina&api_key=${API_KEY}&format=json`

export function getArtists() {
  return fetch(ARTISTS_URL)
    .then(res => res.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map(a => {
      return {
        id: a.mbid,
        name: a.name,
        image: a.image[3]['#text'],
        comments: 140,
      }
    }))
}
