
const markup = {
  repository ({ full_name, id, stargazers_count }) {
    return `
     <div class="row border p-3" id=${id}>
            <div class="col-4 text-center" id="repoName">${full_name}</div>
            <div class="col-4 text-center">${stargazers_count}</div>
            <div class="col-4 text-end"><span>X</span></div>
        </div>
    `
  },
  details ({ full_name, clone_url, watchers, stargazers_count, forks }) {
    return `<h2>${full_name} </h2> <span><a href="${clone_url}" target="_blank">Clone</a></span>
            <div class="col-6">
        Stats:
                <ul>
                    <li>Watchers: ${watchers}</li>
                    <li>Stars: ${stargazers_count}</li>
                    <li>Forks: ${forks}</li>
                </ul>
            </div>
    `
  }
}

export { markup }
