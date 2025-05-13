import Airtable from 'airtable';

if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) {
  throw new Error('AIRTABLE_PERSONAL_ACCESS_TOKEN is not set in environment variables');
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not set in environment variables');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  applyLink?: string; // Made optional
}

export async function getJobs(): Promise<Job[]> {
  try {
    const records = await base('Jobs').select({
      view: 'Grid view',
      fields: ['Title', 'Description', 'Location', 'ApplyLink'],
    }).all();

    const jobs: Job[] = records.map(record => ({
      id: record.id,
      title: record.get('Title') as string,
      description: record.get('Description') as string,
      location: record.get('Location') as string,
      applyLink: record.get('ApplyLink') as string | undefined, // Allow undefined
    }));

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs from Airtable:', error);
    return [];
  }
}