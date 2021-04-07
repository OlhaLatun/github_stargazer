import { getData } from './database.js'
import { markup } from './markup.js'

const input = document.querySelector('#repositoryName')
const addBtn = document.querySelector('.btn')
const notFoundMessage = document.querySelector('.error')
const container = document.querySelector('.repo-container')
localStorage.clear()

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('repositories'))
}

addBtn.addEventListener('click', (event) => {
  event.preventDefault()
  container.innerHTML = ''
  const org = input.value.slice(0, input.value.indexOf('/'))
  const repoName = input.value.slice(input.value.indexOf('/') + 1)
  const url = `https://api.github.com/repos/${org}/${repoName}`
  getData(url)
    .then(data => getRepo(data, repoName, org))
    .catch(err => handleErr() )
})

function handleErr() {
  notFoundMessage.classList.remove('visually-hidden')
  displayRepos(getLocalStorage())
}

function getRepo (data) {
    const repoData = {
      id: data.id,
      org: data.org,
      name: data.name,
      full_name: data.full_name,
      stargazers_count: data.stargazers_count,
      forks: data.forks,
      clone_url: data.clone_url,
      watchers: data.watchers,
      lang_url: data.languages_url
    }

    displayRepos(saveToLocalStorage(repoData))
    notFoundMessage.classList.add('visually-hidden')
}

function saveToLocalStorage (repoData) {
  const repos = getLocalStorage() || []
  const isRepo = repos.find(repo => repo.id === repoData.id)

  if (isRepo) {
    alert(`You've already added ${repoData.full_name} repository`)
  } else {
    repos.push(repoData)
  }

  localStorage.setItem('repositories', JSON.stringify(repos))
  return repos
}

function displayRepos (repos) {
  const sorted = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  sorted.forEach(r => {
    container.insertAdjacentHTML('beforeend', markup.repository(r))
  })
}

  container.addEventListener('click', (event) => {
    console.log(event)
    deleteRepo(event.target)
    goToRepoDetails(event.target)
  })

function goToRepoDetails (target) {

  if (target.id === 'repoName') {
    localStorage.setItem('redirectTo', target.innerHTML)
    window.open('./details.html', 'target_blank')
  }
}

function deleteRepo (target) {
  if (target.nodeName === 'SPAN') {
    container.innerHTML = ''
    const repos = getLocalStorage()
    const filtered = repos.filter(repo => +target.closest('.row').id !== repo.id)
    localStorage.setItem('repositories', JSON.stringify(filtered))
    displayRepos(filtered)
  }
}


