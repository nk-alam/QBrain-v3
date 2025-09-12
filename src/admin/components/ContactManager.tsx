import React, { useState, useEffect } from 'react';
import { Eye, Mail, Phone } from 'lucide-react';
import { getContactMessages } from '../../services/firebaseService';
import { format } from 'date-fns';

const ContactManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const result = await getContactMessages();
    if (result.success) {
      setMessages(result.data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-white">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
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
              {messages.map((message: any) => (
                <tr key={message.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {message.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {message.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white max-w-xs truncate">
                      {message.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {message.createdAt?.toDate ? 
                      format(message.createdAt.toDate(), 'MMM dd, yyyy HH:mm') : 
                      'Unknown'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      message.status === 'read' ? 'bg-green-400/20 text-green-400' : 'bg-blue-400/20 text-blue-400'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="text-cyan-400 hover:text-cyan-300 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-green-400 hover:text-green-300 mr-3"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">From:</span>
                  <div className="text-white font-medium">{selectedMessage.name}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Email:</span>
                  <div className="text-white">{selectedMessage.email}</div>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Subject:</span>
                <div className="text-white font-medium">{selectedMessage.subject}</div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Date:</span>
                <div className="text-white">
                  {selectedMessage.createdAt?.toDate ? 
                    format(selectedMessage.createdAt.toDate(), 'MMMM dd, yyyy at HH:mm') : 
                    'Unknown'
                  }
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Message:</span>
                <div className="text-white mt-2 p-4 bg-slate-700/50 rounded-lg">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>Reply</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;