import { getJobs, Job } from '@/lib/airtable';
import Link from 'next/link';

export default async function Home() {
  const jobs: Job[] = await getJobs();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Job Board</h1>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available at the moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.description}</p>
                <p className="text-gray-500 mb-4">Location: {job.location}</p>
                {job.applyLink ? (
                  <Link
                    href={job.applyLink}
                    target="_blank"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <p className="text-gray-500">No application link available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour