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
        created_by,
        branchOffices,
        subsidiaryOffices
      } = req.body

      // Insert the main company
      const { data: companyData, error: companyError } = await supabaseAdmin
        .from('companies')
        .insert({
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
        })
        .select()

      if (companyError) throw companyError

      const companyId = companyData[0].company_id

      // Insert branch offices
      if (branchOffices && branchOffices.length > 0) {
        const { error: branchOfficeError } = await supabaseAdmin
          .from('branch_offices')
          .insert(branchOffices.map(office => ({ ...office, company_id: companyId })))

        if (branchOfficeError) throw branchOfficeError
      }

      // Insert subsidiary offices
      if (subsidiaryOffices && subsidiaryOffices.length > 0) {
        const { error: subsidiaryOfficeError } = await supabaseAdmin
          .from('subsidiaries')
          .insert(subsidiaryOffices.map(office => ({ ...office, parent_company_id: companyId })))

        if (subsidiaryOfficeError) throw subsidiaryOfficeError
      }

      res.status(201).json({ message: 'Company created successfully', data: companyData })
    } catch (error) {
      console.error('Error creating company:', error)
      res.status(500).json({ error: 'Failed to create company' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}