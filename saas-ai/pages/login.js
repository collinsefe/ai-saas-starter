import { supabase } from '../lib/supabase'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')

  const login = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert('Check your email for magic link!')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>Send Magic Link</button>
    </div>
  )
}