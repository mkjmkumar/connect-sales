import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [summaryData, targetData, progressData, leadData, dealData, clientData] = await Promise.all([
        supabase.from('top_summary_statistics_1').select('*'),
        supabase.from('target_vs_achievement_2').select('*'),
        supabase.from('progress_by_quarter_3').select('*'),
        supabase.from('lead_generation_monthly_sales_4').select('*'),
        supabase.from('deal_conversation_weekly_5').select('*'),
        supabase.from('top_client_7').select('*')
      ])

      res.status(200).json({
        summaryStats: summaryData.data[0],
        targetAchievement: targetData.data[0],
        progressByQuarter: progressData.data,
        leadGeneration: leadData.data,
        dealConversation: dealData.data,
        topClients: clientData.data
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}