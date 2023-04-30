export default async function getResponse(url) {
  const response = await fetch(url, {
    method: 'GET'
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
}
