import React from 'react';
import { FiUser, FiBriefcase, FiAward, FiMail, FiEye } from 'react-icons/fi';

const CandidateCard = ({ candidate, onViewDetails }) => {
  const {
    name,
    email,
    experience,
    skills,
    matchPercentage,
    status
  } = candidate;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-full">
            <FiUser className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 max-w-[200px]">
              <FiMail className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <div className="text-sm font-medium text-blue-500">Match</div>
            <div className="text-2xl font-bold text-blue-600">{matchPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiBriefcase className="h-4 w-4 mr-2" />
          <span>{experience} years experience</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiAward className="h-4 w-4 mr-2" />
          <span>{skills.length} skills matched</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'Shortlisted' 
            ? 'bg-green-100 text-green-800'
            : status === 'Rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
        <button 
          onClick={onViewDetails}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
        >
          <FiEye className="h-4 w-4 mr-1" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default CandidateCard; 