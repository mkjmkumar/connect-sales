import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data: users, error } = await supabaseAdmin
        .from('users')
        .select('id, first_name, last_name, email')

      if (error) throw error

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        avatar: `/images/default-avatar.png`, // Using a default avatar image
        email: user.email
      }))

      res.status(200).json(formattedUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).json({ error: 'Failed to fetch users' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
