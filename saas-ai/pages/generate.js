import { openai } from '../../lib/openai'
import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { prompt, userId } = req.body

  // Basic free-tier limit (optional)
  const { data: usage } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', userId)

  if (usage?.length > 20) {
    return res.status(403).json({ error: 'Free limit reached' })
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful AI writer." },
      { role: "user", content: prompt }
    ],
  })

  const text = completion.choices[0].message.content

  // Save usage
  await supabase.from('usage').insert({ user_id: userId })

  res.json({ text })
}