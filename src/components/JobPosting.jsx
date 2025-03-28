import React, { useState } from 'react';

const JobPosting = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    minExperience: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job posting creation
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">Create New Job Posting</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., Senior Software Engineer"
            value={jobDetails.title}
            onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="4"
            placeholder="Describe the role and responsibilities..."
            value={jobDetails.description}
            onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., React, Node.js, TypeScript (comma separated)"
            value={jobDetails.requiredSkills}
            onChange={(e) => setJobDetails({ ...jobDetails, requiredSkills: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Experience (years)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            min="0"
            value={jobDetails.minExperience}
            onChange={(e) => setJobDetails({ ...jobDetails, minExperience: e.target.value })}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Job Posting
        </button>
      </form>
    </div>
  );
};

export default JobPosting; 