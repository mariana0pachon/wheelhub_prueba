import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  birthday: string | null
  luckyNumber: number | null
  superpowers: string[] | null
  starSign: string | null
  createdAt: string
  avatar: Record<string, unknown> | null
}

interface UsersResponse {
  data: User[]
  total: number
  limit: number
  skip: number
}

export default function UsersPage() {
  const [response, setResponse] = useState<UsersResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setResponse)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!response) return <p>Loading...</p>

  return (
    <div>
      <h1>Usuarios</h1>
      <p>Total: {response.total}</p>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  )
}
