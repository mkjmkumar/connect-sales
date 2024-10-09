import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { country_id } = req.query

    try {
      let query = supabaseAdmin
        .from('states')
        .select('state_id, name, code, country_id')
        .order('name')

      if (country_id) {
        query = query.eq('country_id', country_id)
      }

      const { data, error } = await query

      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching states:', error)
      res.status(500).json({ error: 'Failed to fetch states' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
