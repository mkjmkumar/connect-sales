import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { page, pageSize, filters, sortBy, search } = req.query

      let query = supabaseAdmin
        .from('companies_list')
        .select('*', { count: 'exact' })

      // Apply filters
      if (filters) {
        const parsedFilters = JSON.parse(filters as string)
        Object.entries(parsedFilters).forEach(([key, value]) => {
          if (value) {
            query = query.eq(key, value)
          }
        })
      }

      // Apply search
      if (search) {
        query = query.or(`name_en.ilike.%${search}%,name_jp.ilike.%${search}%`)
      }

      // Apply sorting
      if (sortBy) {
        const { column, direction } = JSON.parse(sortBy as string)
        query = query.order(column, { ascending: direction === 'asc' })
      }

      // Apply pagination
      const pageNumber = parseInt(page as string) || 1
      const itemsPerPage = parseInt(pageSize as string) || 25
      const from = (pageNumber - 1) * itemsPerPage
      const to = from + itemsPerPage - 1
      query = query.range(from, to)

      const { data: companies, error, count } = await query

      if (error) {
        throw error
      }

      // Fetch top companies
      const { data: topCompanies, error: topCompaniesError } = await supabaseAdmin
        .from('companies')
        .select('*')
        .order('revenue', { ascending: false })
        .limit(3)

      if (topCompaniesError) {
        throw topCompaniesError
      }

      res.status(200).json({
        companies,
        topCompanies,
        totalPages: Math.ceil((count || 0) / itemsPerPage),
        totalCount: count
      })
    } catch (error) {
      console.error('Error fetching companies data:', error)
      res.status(500).json({ error: 'Failed to fetch companies data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}