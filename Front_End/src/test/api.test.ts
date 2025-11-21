import { describe, expect, it, vi } from 'vitest'
import { getPsy } from '../Api/users'

const MOCK_PSYCHOLOGISTS = [
  { id: 1, name: 'Camille', email: 'camille@mail.fr' },
  { id: 2, name: 'Alice', email: 'alice@mail.fr' },
]

describe("Test de l'api", () => {
  it('devrait récupérer et retourner la liste des psychologues en cas de succès (res.ok = true)', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => MOCK_PSYCHOLOGISTS,
    })
    const result = await getPsy()
    expect(result).toEqual(MOCK_PSYCHOLOGISTS)
  })

  it("devrait retourner undefined en cas d'échec HTTP (res.ok = false)", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not Found',
    })

    const result = await getPsy()

    expect(result).toBeUndefined()
  })
})
