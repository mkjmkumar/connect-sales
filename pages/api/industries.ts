import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin
        .from('industries')
        .select('industry_id, name')
        .order('name')

      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching industries:', error)
      res.status(500).json({ error: 'Failed to fetch industries' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
