import React, { useState } from 'react';
import { FiUpload, FiUsers, FiFileText, FiBarChart2, FiPlus } from 'react-icons/fi';
import { useCandidate } from '../Context/CandidateContext';
import CandidateCard from './CandidateCard';
import Sidebar from './Sidebar';
import CandidateDetails from './CandidateDetails';
import { handleFileUpload } from '../utils/fileUpload';

const Dashboard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { candidates, stats, addCandidate, updateStats } = useCandidate();
  const [jobDetails, setJobDetails] = useState({
    description: '',
    requiredSkills: '',
    minExperience: '',
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = async (files) => {
    setIsUploading(true);
    try {
      const newCandidates = await handleFileUpload(files, jobDetails.description);
      newCandidates.forEach(candidate => addCandidate(candidate));
      updateStats([...candidates, ...newCandidates]);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Resume Screening Dashboard</h1>
              <button
                onClick={() => document.getElementById('file-upload').click()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                Upload Resume
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FiUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">Total Candidates</h2>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalCandidates}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FiFileText className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">Resumes Analyzed</h2>
                  <p className="text-2xl font-semibold text-gray-900">{stats.resumesAnalyzed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FiBarChart2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">Average Match</h2>
                  <p className="text-2xl font-semibold text-gray-900">{stats.averageMatch}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add this new Job Requirements Section before the Upload Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Job Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDetails.description}
                  onChange={(e) => setJobDetails(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Enter detailed job description..."
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <textarea
                    value={jobDetails.requiredSkills}
                    onChange={(e) => setJobDetails(prev => ({
                      ...prev,
                      requiredSkills: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    placeholder="Enter required skills (comma separated)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Years of Experience
                  </label>
                  <input
                    type="number"
                    value={jobDetails.minExperience}
                    onChange={(e) => setJobDetails(prev => ({
                      ...prev,
                      minExperience: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    placeholder="Enter minimum years required"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modify the Upload Section title to reflect job matching */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Upload Resumes for Matching</h2>
              {jobDetails.description && (
                <span className="text-sm text-green-600">
                  ✓ Job requirements set
                </span>
              )}
            </div>
            
            {!jobDetails.description && (
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
                <p className="text-sm">
                  💡 Tip: Fill in the job requirements above to get better matched candidates
                </p>
              </div>
            )}

            {/* Existing upload section code */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isUploading ? (
                  'Processing resumes...'
                ) : (
                  <>
                    Drag and drop resumes here, or{' '}
                    <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                      browse
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInput}
                        disabled={isUploading}
                      />
                    </label>
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>

          {/* Candidates List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
            </div>
            <div className="p-6">
              {candidates.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p>No candidates found. Upload resumes to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {candidates.map((candidate, index) => (
                    <CandidateCard 
                      key={index} 
                      candidate={candidate} 
                      onViewDetails={() => handleViewDetails(candidate)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <CandidateDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default Dashboard; 