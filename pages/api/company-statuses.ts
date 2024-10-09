import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin
        .from('company_statuses')
        .select('id, name')
        .order('order_num')

      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching company statuses:', error)
      res.status(500).json({ error: 'Failed to fetch company statuses' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
