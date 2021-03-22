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
  const url = `https://api.github.com/orgs/${org}/repos`
  getData(url)
    .then(data => getRepo(data, repoName, org))
    .catch(err => console.error(err))
})

function getRepo (data, name, org) {
  const repo = data.find(repo => repo.name === name)
  if (repo) {
    const repoData = {
      id: repo.id,
      org: org,
      name: repo.name,
      full_name: repo.full_name,
      stargazers_count: repo.stargazers_count,
      forks: repo.forks,
      clone_url: repo.clone_url,
      watchers: repo.watchers,
      lang_url: repo.languages_url
    }
    displayRepos(saveToLocalStorage(repoData))
    notFoundMessage.classList.add('visually-hidden')
  } else {
    displayRepos(getLocalStorage())
    notFoundMessage.classList.remove('visually-hidden')
  }
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


