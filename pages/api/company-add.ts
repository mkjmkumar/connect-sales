import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        name_en,
        name_jp,
        website,
        employee_count,
        capital,
        revenue,
        stage,
        status,
        country,
        state,
        industry,
        address,
        telephone,
        logo_url,
        created_by
      } = req.body

      const { data, error } = await supabaseAdmin
        .from('companies')
        .insert([
          {
            name_en,
            name_jp,
            website,
            employee_count,
            capital,
            revenue,
            stage,
            status,
            country,
            state,
            industry,
            address,
            telephone,
            logo_url,
            created_by
          }
        ])

      if (error) throw error

      res.status(201).json({ message: 'Company created successfully', data })
    } catch (error) {
      console.error('Error creating company:', error)
      res.status(500).json({ error: 'Failed to create company' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}