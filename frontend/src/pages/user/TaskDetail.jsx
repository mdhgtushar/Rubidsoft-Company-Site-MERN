import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ArrowLeft, 
  MessageSquare, 
  Loader2,
  Calendar,
  User,
  Clock,
  Flag,
  CheckCircle,
  AlertTriangle,
  Edit
} from 'lucide-react';
import { taskService } from '../../services/apiService';

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [sendingComment, setSendingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTaskById(taskId);
      setTask(response.data.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSendingComment(true);
      await taskService.addComment(taskId, newComment);
      setNewComment('');
      // Refresh task details to get updated comments
      await fetchTaskDetails();
    } catch (error) {
      console.error('Error sending comment:', error);
    } finally {
      setSendingComment(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await taskService.updateTaskStatus(taskId, newStatus);
      // Refresh task details
      await fetchTaskDetails();
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'assigned':
        return 'text-purple-600 bg-purple-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'in-progress':
        return <Clock />;
      case 'assigned':
        return <User />;
      case 'pending':
        return <AlertTriangle />;
      case 'cancelled':
        return <AlertTriangle />;
      default:
        return <Clock />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
          <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link
            to="/user/tasks"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/user/tasks"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="mr-2" />
            Back to Tasks
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {task.title}
              </h1>
              <p className="text-gray-600 mt-2">
                Task ID: {task._id}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                <span className="mr-2">{getStatusIcon(task.status)}</span>
                {task.status}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                <Flag className="mr-2" />
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{task.description}</p>
            </div>

            {/* Task Requirements */}
            {task.requirements && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <div className="space-y-4">
                  {task.requirements.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                      <p className="text-gray-900">{task.requirements.description}</p>
                    </div>
                  )}
                  {task.requirements.features && task.requirements.features.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Features</p>
                      <ul className="list-disc list-inside space-y-1">
                        {task.requirements.features.map((feature, index) => (
                          <li key={index} className="text-gray-900">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
              
              {/* Comment List */}
              <div className="space-y-4 mb-6">
                {task.comments && task.comments.length > 0 ? (
                  task.comments.map((comment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {comment.user?.name || 'Unknown'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleSendComment} className="space-y-4">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Add a comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sendingComment || !newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {sendingComment ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" />
                      Sending...
                    </span>
                  ) : (
                    'Send Comment'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{formatDate(task.createdAt)}</span>
                </div>
                {task.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium">{formatDate(task.dueDate)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Hours</span>
                  <span className="font-medium">{task.estimatedHours || 0}h</span>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Status</h2>
              <div className="space-y-3">
                {['pending', 'in-progress', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updatingStatus || task.status === status}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      task.status === status
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {updatingStatus ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2" />
                        Updating...
                      </span>
                    ) : (
                      `Mark as ${status}`
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned By</p>
                  <p className="text-gray-900">{task.assignedBy?.name || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned To</p>
                  <p className="text-gray-900">{task.assignedTo?.name || 'Unassigned'}</p>
                </div>
              </div>
            </div>

            {/* Related Order */}
            {task.orderDetails && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Order</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Number</p>
                    <p className="text-gray-900">#{task.orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-gray-900">{task.orderDetails.serviceDetails?.title}</p>
                  </div>
                  <Link
                    to={`/user/orders/${task.orderDetails._id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Order
                  </Link>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Task Created</p>
                    <p className="text-sm text-gray-500">{formatDate(task.createdAt)}</p>
                  </div>
                </div>
                {task.updatedAt !== task.createdAt && (
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-500">{formatDate(task.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail; 