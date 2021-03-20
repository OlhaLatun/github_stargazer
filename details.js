import { markup } from './markup.js'
import { getData } from './database.js'

const wrapper = document.querySelector('.wrapper')
const repositories = JSON.parse(localStorage.getItem('repositories'))
const redirectTo = localStorage.redirectTo

function repoLangs () {
  const r = repositories.find(r => r.full_name === redirectTo)
  getData(r.lang_url)
    .then(data => displayInfo(data, r))
    .catch(err => console.log(err))
}

repoLangs()

function displayInfo (data, r) {
  wrapper.insertAdjacentHTML('afterbegin', markup.details(r))
  displayLanguages(data)
}

function displayLanguages (languages) {
  const col = document.createElement('div')
  col.className = 'col-6'
  const ul = document.createElement('ul')
  ul.innerHTML = 'Languages:'
  for (const lang in languages) {
    const li = document.createElement('li')
    li.innerHTML = `${lang}: ${(languages[lang] * 100 / getSum(languages)).toFixed(1)
            }% `
    ul.appendChild(li)
  }
  col.appendChild(ul)
  wrapper.appendChild(col)
}

function getSum (langs) {
  let sum = 0
  for (const lang in langs) {
    sum += langs[lang]
  }
  return sum
}
