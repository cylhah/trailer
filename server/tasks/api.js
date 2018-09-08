const rp = require('request-promise-native')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  const res = await rp(url)

  return res
}

;(async () => {
  let movies = [{
    doubanId: 3914513,
    title: '马戏之王',
    rate: 7.3
  }]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    console.log(movieData)
  })
})()