// Local, in-browser replacement for the old Rails API.
// Users and scores are persisted to localStorage so no backend is required.
const STORAGE_KEY = "planegame"
const LEADERBOARD_SIZE = 25

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    // localStorage unavailable or corrupted; fall through to a fresh store
  }
  return { users: [], scores: [] }
}

function saveStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch (e) {
    // localStorage unavailable; the session still works, it just won't persist
  }
}

function findOrCreateUser(username) {
  const store = loadStore()
  let user = store.users.find(u => u.username.toLowerCase() === username.toLowerCase())
  if (!user) {
    user = { id: store.users.length + 1, username }
    store.users.push(user)
    saveStore(store)
  }
  return user
}

function getUser(id) {
  const store = loadStore()
  const user = store.users.find(u => u.id === id)
  const scores = store.scores.filter(s => s.user_id === id).map(s => s.score)
  return { id: user.id, username: user.username, scores }
}

function saveScore(userId, score) {
  const store = loadStore()
  store.scores.push({ user_id: userId, score })
  saveStore(store)
}

function getLeaderboard() {
  const store = loadStore()
  const usernames = {}
  store.users.forEach(u => { usernames[u.id] = u.username })
  const scores = store.scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, LEADERBOARD_SIZE)
    .map(s => `${usernames[s.user_id]}: ${s.score}`)
  return { scores, all: store.scores.length }
}
