export const TEAMS = [
  { code: 'A', name: 'Nigerian Army', short: 'Army' },
  { code: 'B', name: 'Nigerian Navy', short: 'Navy' },
  { code: 'C', name: 'Nigerian Air Force', short: 'Air Force' },
]

export const FIXTURES = [
  { round: 1, match: 'B vs C', left: 'B', right: 'C' },
  { round: 2, match: 'A vs B', left: 'A', right: 'B' },
  { round: 3, match: 'C vs A', left: 'C', right: 'A' },
]

export const THURSDAY_SESSIONS = [
  'R1 – Women Wrestling 50kg',
  'R1 – Men Wrestling 70kg',
  'R1 – Women Wrestling 60kg',
  'R1 – Men Wrestling 80kg',
  'R1 – Women Wrestling 70kg',
  'R1 – Men Wrestling 90kg',
  'R1 – Women Wrestling +70kg',
  'R1 – Men Wrestling +90kg',
]

export const FRIDAY_SESSIONS = [
  'Finals & Closing Ceremony',
  'Departure',
]

/** Female category results (Nordic pairings) */
export const FEMALE_RESULTS = [
  // Navy vs Air Force
  { weight: '50kg', scores: { B: 3, C: 1 } },
  { weight: '60kg', scores: { B: 3, C: 2 } },
  { weight: '70kg', scores: { B: 3, C: 2 } },
  { weight: '+70kg', scores: { B: 0, C: 3 } },
  // Army vs Air Force
  { weight: '50kg', scores: { A: 3, C: 1 } },
  { weight: '60kg', scores: { A: 3, C: 0 } },
  { weight: '70kg', scores: { A: 3, C: 0 } },
]

/** Male category results (Nordic pairings) */
export const MALE_RESULTS = [
  // Navy vs Air Force
  { weight: '70kg', scores: { B: 3, C: 0 } },
  { weight: '80kg', scores: { B: 0, C: 3 } },
  { weight: '90kg', scores: { B: 1, C: 3 } },
  { weight: '+90kg', scores: { B: 0, C: 2 } },
  // Army vs Air Force
  { weight: '80kg', scores: { A: 3, C: 2 } },
  { weight: '90kg', scores: { A: 3, C: 0 } },
  { weight: '+90kg', scores: { A: 2, C: 0 } },
]

export function teamName(code) {
  return TEAMS.find((t) => t.code === code)?.name || code
}

export function teamShort(code) {
  return TEAMS.find((t) => t.code === code)?.short || code
}

export function resultSides(scores) {
  const entries = Object.entries(scores || {})
  if (entries.length < 2) return null
  const [[left, leftScore], [right, rightScore]] = entries
  return { left, leftScore, right, rightScore }
}

export function resultKey(row) {
  const sides = resultSides(row.scores)
  if (!sides) return row.weight
  return `${row.weight}-${sides.left}-${sides.right}`
}

export function resultWinner(scores) {
  const sides = resultSides(scores)
  if (!sides) return null
  if (sides.leftScore > sides.rightScore) return sides.left
  if (sides.rightScore > sides.leftScore) return sides.right
  return null
}

/** Build overall standings from category results (wins + points for/against). */
export function buildStandings(resultGroups = [FEMALE_RESULTS, MALE_RESULTS]) {
  const table = Object.fromEntries(
    TEAMS.map((t) => [
      t.code,
      {
        code: t.code,
        name: t.name,
        short: t.short,
        played: 0,
        wins: 0,
        losses: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        diff: 0,
      },
    ]),
  )

  for (const group of resultGroups) {
    for (const row of group) {
      const entries = Object.entries(row.scores)
      if (entries.length < 2) continue

      const [[left, leftScore], [right, rightScore]] = entries
      if (!table[left] || !table[right]) continue

      table[left].played += 1
      table[right].played += 1
      table[left].pointsFor += leftScore
      table[left].pointsAgainst += rightScore
      table[right].pointsFor += rightScore
      table[right].pointsAgainst += leftScore

      if (leftScore > rightScore) {
        table[left].wins += 1
        table[right].losses += 1
      } else if (rightScore > leftScore) {
        table[right].wins += 1
        table[left].losses += 1
      }
    }
  }

  return Object.values(table)
    .map((row) => ({
      ...row,
      diff: row.pointsFor - row.pointsAgainst,
    }))
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins
      if (b.diff !== a.diff) return b.diff - a.diff
      return b.pointsFor - a.pointsFor
    })
}
