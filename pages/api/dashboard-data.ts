import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [summaryData, targetData, progressData, leadData, dealData, activityData, clientData] = await Promise.all([
        supabaseAdmin.from('top_summary_statistics_1').select('*'),
        supabaseAdmin.from('target_vs_achievement_2').select('*'),
        supabaseAdmin.from('progress_by_quarter_3').select('*'),
        supabaseAdmin.from('lead_generation_monthly_sales_4').select('*'),
        supabaseAdmin.from('deal_conversation_weekly_5').select('*'),
        supabaseAdmin.from('deal_conversation_activities_6').select('*'),
        supabaseAdmin.from('top_client_7').select('*')
      ])
      res.status(200).json({
        summaryStats: summaryData.data[0],
        targetAchievement: targetData.data[0],
        progressByQuarter: progressData.data,
        leadGeneration: leadData.data,
        dealConversation: dealData.data,
        dealConversationActivities: activityData.data,
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