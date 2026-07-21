import { apiGet, apiPost } from './client.js'
import { getStoredToken } from './auth.js'

export function createGuestRegistration(guest) {
  return apiPost('/guest_registrations', {
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

  return apiPost('/team_registrations', {
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

function normalizeList(data, keys = []) {
  if (Array.isArray(data)) return data
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key]
  }
  if (Array.isArray(data?.data)) return data.data
  return []
}

export async function fetchGuestRegistrations() {
  const data = await apiGet('/api/v1/guest_registrations', {
    token: getStoredToken(),
  })
  return normalizeList(data, ['guest_registrations', 'guests'])
}
