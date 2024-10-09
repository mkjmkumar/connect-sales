import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin
        .from('countries')
        .select('country_id, name, code')
        .order('name')

      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching countries:', error)
      res.status(500).json({ error: 'Failed to fetch countries' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
