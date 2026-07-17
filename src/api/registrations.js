const API_BASE = 'https://naval-wrestle-pulse-api.onrender.com'

async function post(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    const message =
      data?.errors?.join?.(', ') ||
      data?.error ||
      data?.message ||
      `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

export function createGuestRegistration(guest) {
  return post('/guest_registrations', {
    guest_registration: {
      country: guest.country,
      full_name: guest.name,
      rank_title: guest.rank,
      organization_unit: guest.org,
      appointment: guest.appointment,
      travel_mode: guest.travel,
      accommodation: guest.accommodation === 'yes',
    },
  })
}

export function createTeamRegistration(team) {
  const players = Object.fromEntries(
    team.players.map((name, i) => [`player_${i + 1}`, name.trim()]),
  )

  return post('/team_registrations', {
    team_registration: {
      team_captain: team.captain,
      organization_unit: team.org,
      male_count: team.male,
      female_count: team.female,
      total_count: team.male + team.female,
      ...players,
      female_categories: team.femaleCats,
      male_categories: team.maleCats,
      travel_mode: team.travel,
      accommodation: team.accommodation === 'yes',
    },
  })
}
