'use client';

import { useState, useEffect } from 'react';
import { applicationService } from '@/services/application.service';
import { MentorApplication, ApplicationStatus } from '@/types';

export default function MentorApplicationsDashboard() {
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<MentorApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadApplications();
  }, [currentPage, selectedStatus]);

  const loadApplications = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await applicationService.getAllApplications(
        currentPage,
        10,
        selectedStatus || undefined
      );

      if (response.data) {
        setApplications(response.data.applications);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to load applications',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    if (!confirm('Are you sure you want to approve this application? This will create a mentor profile for the user.')) {
      return;
    }

    try {
      await applicationService.approveApplication(applicationId);
      setMessage({ type: 'success', text: 'Application approved successfully!' });
      loadApplications();
      setSelectedApplication(null);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to approve application',
      });
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!rejectionReason.trim()) {
      setMessage({ type: 'error', text: 'Please provide a rejection reason' });
      return;
    }

    try {
      await applicationService.rejectApplication(applicationId, rejectionReason);
      setMessage({ type: 'success', text: 'Application rejected successfully' });
      loadApplications();
      setSelectedApplication(null);
      setRejectionReason('');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to reject application',
      });
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const styles = {
      [ApplicationStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      [ApplicationStatus.APPROVED]: 'bg-green-100 text-green-800 border-green-300',
      [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mentor Applications</h1>
        <p className="text-gray-600">Review and manage mentor applications</p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Filter by Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <button
            onClick={loadApplications}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {application.user?.name || application.user?.email || 'Unknown User'}
                    </h3>
                    <p className="text-sm text-gray-600">{application.user?.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Applied on: {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(application.status)}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Bio:</span>
                    <p className="text-gray-600 mt-1">{application.bio}</p>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700">Expertise:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {application.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {application.certifications.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700">Certifications:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {application.certifications.map((cert, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-medium text-gray-700">Price per Session:</span>
                    <span className="ml-2 text-gray-900 font-semibold">
                      ₹{application.pricePerSession}
                    </span>
                  </div>

                  {application.reviewedAt && (
                    <div>
                      <span className="font-medium text-gray-700">Reviewed on:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(application.reviewedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {application.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <span className="font-medium text-red-800">Rejection Reason:</span>
                      <p className="text-red-700 mt-1">{application.rejectionReason}</p>
                    </div>
                  )}
                </div>

                {/* Actions for Pending Applications */}
                {application.status === ApplicationStatus.PENDING && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {selectedApplication?.id === application.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Enter rejection reason (optional but recommended)"
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReject(application.id)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Confirm Rejection
                          </button>
                          <button
                            onClick={() => {
                              setSelectedApplication(null);
                              setRejectionReason('');
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(application.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          ✓ Approve Application
                        </button>
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          ✗ Reject Application
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
