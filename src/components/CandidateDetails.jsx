import React from 'react';
import { FiX, FiUser, FiMail, FiBriefcase, FiAward, FiMapPin, FiPhone, FiGlobe } from 'react-icons/fi';

const CandidateDetails = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg max-w-3xl w-full max-h-[100vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Candidate Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FiUser className="h-5 w-5 mr-3" />
                  <span>{candidate.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMail className="h-5 w-5 mr-3" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiPhone className="h-5 w-5 mr-3" />
                  <span>{candidate.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="h-5 w-5 mr-3" />
                  <span>{candidate.location || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FiBriefcase className="h-5 w-5 mr-3" />
                  <span>{candidate.experience} years of experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiAward className="h-5 w-5 mr-3" />
                  <span>Match Score: {candidate.matchPercentage}%</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiGlobe className="h-5 w-5 mr-3" />
                  <span>{candidate.website || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Experience Timeline</h3>
              <div className="space-y-4">
                {candidate.experienceTimeline?.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <div className="text-sm text-gray-500">{exp.period}</div>
                    <div className="font-medium text-gray-900">{exp.title}</div>
                    <div className="text-gray-600">{exp.company}</div>
                    <div className="mt-2 text-sm text-gray-600">{exp.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails; 