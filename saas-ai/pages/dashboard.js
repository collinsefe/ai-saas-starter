import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, userId: user.id }),
    })

    const data = await res.json()
    setOutput(data.text)
  }

  if (!user) return <p>Please login</p>

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Dashboard</h1>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter prompt..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br /><br />
      <button onClick={generate}>Generate</button>

      <pre style={{ marginTop: 20 }}>{output}</pre>

      <br />
      <a href="/api/checkout">Upgrade to Pro</a>
    </div>
  )
}