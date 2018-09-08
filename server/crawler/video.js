const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com/subject/'
const doubanId = 26810318

async function getData() {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await page.waitFor(1000)

  const result = await page.evaluate(() => {
    var videoTag = document.querySelector('.related-pic-video')
    var link = videoTag.getAttribute('href')
    var background = videoTag.style['background-image']
    var first = background.indexOf('"') + 1
    var last = background.lastIndexOf('"')
    var cover = background.substring(first, last)

    return {
      link,
      cover
    }
  })
  let video

  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })

    await page.waitFor(2000)

    video = await page.evaluate(() => {
      var source = document.querySelector('source')

      if (source) {
        return source.getAttribute('src')
      }

      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  browser.close()

  process.send(data)
  process.exit(0)
}

getData()