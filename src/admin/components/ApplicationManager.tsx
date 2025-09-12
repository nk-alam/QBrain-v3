import React, { useState, useEffect } from 'react';
import { Eye, Download, Filter } from 'lucide-react';
import { getApplications } from '../../services/firebaseService';
import { format } from 'date-fns';

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const result = await getApplications();
    if (result.success) {
      setApplications(result.data);
    }
    setLoading(false);
  };

  const filteredApplications = applications.filter((app: any) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (loading) {
    return <div className="text-white">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Quiz Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredApplications.map((application: any) => (
                <tr key={application.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {application.personalInfo?.fullName}
                      </div>
                      <div className="text-sm text-gray-400">
                        {application.personalInfo?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {application.personalInfo?.preferredRole}
                    </div>
                    <div className="text-sm text-gray-400">
                      {application.personalInfo?.branch} - {application.personalInfo?.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      application.quizResults?.score >= 70 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {application.quizResults?.score || 'N/A'}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {application.createdAt?.toDate ? 
                      format(application.createdAt.toDate(), 'MMM dd, yyyy') : 
                      'Unknown'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      application.status === 'accepted' ? 'bg-green-400/20 text-green-400' :
                      application.status === 'rejected' ? 'bg-red-400/20 text-red-400' :
                      application.status === 'reviewed' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="text-cyan-400 hover:text-cyan-300 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">College:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.college}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Branch:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.branch}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white ml-2">{selectedApplication.personalInfo?.year}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-white mb-3">Preferred Role</h4>
                <p className="text-gray-300">{selectedApplication.personalInfo?.preferredRole}</p>
              </div>

              {selectedApplication.personalInfo?.experience && (
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Experience & Skills</h4>
                  <p className="text-gray-300">{selectedApplication.personalInfo?.experience}</p>
                </div>
              )}

              <div>
                <h4 className="text-lg font-medium text-white mb-3">Motivation</h4>
                <p className="text-gray-300">{selectedApplication.personalInfo?.motivation}</p>
              </div>

              {selectedApplication.quizResults && (
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Quiz Results</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Score:</span>
                      <span className={`ml-2 font-medium ${
                        selectedApplication.quizResults.score >= 70 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {selectedApplication.quizResults.score}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Correct:</span>
                      <span className="text-white ml-2">
                        {selectedApplication.quizResults.correctAnswers}/{selectedApplication.quizResults.totalQuestions}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 ${
                        selectedApplication.quizResults.passed ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {selectedApplication.quizResults.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;