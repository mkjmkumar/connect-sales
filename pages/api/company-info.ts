import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { translate } from '../../utils/translator';

// Mock translation function (replace this with actual API call in production)
async function mockTranslate(text: string): Promise<string> {
  // This is a very basic mock. In reality, you'd call an actual translation API.
  return `${text} (日本語)`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { website } = req.query;

  if (!website || typeof website !== 'string') {
    return res.status(400).json({ error: 'Invalid website parameter' });
  }

  try {
    const response = await axios.get(`https://${website}`);
    const $ = cheerio.load(response.data);

    const name_en = $('title').text().trim();
    const name_jp = await mockTranslate(name_en);
    const logo_url = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';

    res.status(200).json({ name_en, name_jp, logo_url });
  } catch (error) {
    console.error('Error fetching company info:', error);
    res.status(500).json({ error: 'Failed to fetch company info' });
  }
}
