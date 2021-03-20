
const getData = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Something is wrong! Server responded with status ${response.status}`)
  }
  return await response.json()
}

export { getData }
