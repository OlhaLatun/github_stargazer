import { markup } from './markup.js'
import { getData } from './database.js'

const wrapper = document.querySelector('.wrapper')
const repositories = JSON.parse(localStorage.getItem('repositories'))
const redirectTo = localStorage.redirectTo

  const r = repositories.find(r => r.full_name === redirectTo)
  getData(r.lang_url)
    .then(data => displayInfo(data, r))
    .catch(err => console.log(err))

function displayInfo (data, r) {
  const languages = [...Object.entries(data)]
  let sum = languages.reduce((sum, lang) => sum + lang[1], 0 )
  wrapper.insertAdjacentHTML('afterbegin', markup.details(r, languages, sum))
}

