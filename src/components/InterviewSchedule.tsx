import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle, User } from 'lucide-react';

interface InterviewScheduleProps {
  onDataChange: (data: any) => void;
  data: any;
}

const InterviewSchedule: React.FC<InterviewScheduleProps> = ({ onDataChange, data }) => {
  const [selectedSlot, setSelectedSlot] = useState<any>(data.interviewSlot || null);
  const [interviewMode, setInterviewMode] = useState('online');

  // Mock available slots - in a real app, this would come from an API
  const availableSlots = [
    { date: '2024-02-15', time: '10:00 AM', available: true },
    { date: '2024-02-15', time: '2:00 PM', available: false },
    { date: '2024-02-15', time: '4:00 PM', available: true },
    { date: '2024-02-16', time: '11:00 AM', available: true },
    { date: '2024-02-16', time: '1:00 PM', available: true },
    { date: '2024-02-16', time: '3:00 PM', available: true },
    { date: '2024-02-17', time: '9:00 AM', available: true },
    { date: '2024-02-17', time: '11:00 AM', available: false },
    { date: '2024-02-17', time: '2:00 PM', available: true },
    { date: '2024-02-18', time: '10:00 AM', available: true },
    { date: '2024-02-18', time: '12:00 PM', available: true },
    { date: '2024-02-18', time: '4:00 PM', available: true }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSlotSelect = (slot: any) => {
    const slotData = { ...slot, mode: interviewMode };
    setSelectedSlot(slotData);
    onDataChange({ interviewSlot: slotData });
  };

  const groupSlotsByDate = (slots: any[]) => {
    return slots.reduce((groups, slot) => {
      if (!groups[slot.date]) {
        groups[slot.date] = [];
      }
      groups[slot.date].push(slot);
      return groups;
    }, {} as Record<string, any[]>);
  };

  const groupedSlots = groupSlotsByDate(availableSlots);

  if (selectedSlot) {
    return (
      <div className="space-y-6">
        {/* Confirmation */}
        <div className="text-center mb-8">
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-700/50 border border-green-400/30 rounded-2xl p-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Interview Scheduled!</h3>
              <p className="text-gray-300 leading-relaxed">
                Your application is now complete. We'll send you a confirmation email with all the details.
              </p>
            </div>
          </div>
        </div>

        {/* Interview Details */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-700/50 border border-cyan-400/30 rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-white mb-6">Interview Details</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-cyan-400/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Date</div>
                  <div className="text-white font-medium">{formatDate(selectedSlot.date)}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-white font-medium">{selectedSlot.time} (30 minutes)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-400/20 rounded-lg">
                  {selectedSlot.mode === 'online' ? (
                    <Video className="h-5 w-5 text-purple-400" />
                  ) : (
                    <MapPin className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-400">Format</div>
                  <div className="text-white font-medium">
                    {selectedSlot.mode === 'online' ? 'Online (Google Meet)' : 'In-person at BWU Campus'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-400/20 rounded-lg">
                  <User className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Interviewer</div>
                  <div className="text-white font-medium">Nurkausar Alam (Team Leader)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Preparation */}
        <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
          <h4 className="text-lg font-semibold text-white mb-4">Interview Preparation</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-cyan-400 font-medium mb-3">What to Expect</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Technical questions related to your chosen role</li>
                <li>• Discussion about your projects and experience</li>
                <li>• Questions about your motivation to join Qbrain</li>
                <li>• Overview of team culture and expectations</li>
              </ul>
            </div>
            <div>
              <h5 className="text-green-400 font-medium mb-3">What to Bring</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Portfolio of your best projects</li>
                <li>• Questions about the team and role</li>
                <li>• Examples of problem-solving experience</li>
                <li>• Enthusiasm for hackathons and innovation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
          <div className="text-sm text-gray-400">
            <strong className="text-gray-300">Need to reschedule?</strong> Contact us at least 24 hours in advance via{' '}
            <a 
              href="https://wa.me/+918695205637" 
              className="text-green-400 hover:text-green-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            {' '}or email us at team@qbrain.tech
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Schedule Your Interview</h3>
        <p className="text-gray-400">
          Select your preferred time slot for a 30-minute technical interview with our team leader.
        </p>
      </div>

      {/* Interview Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">Interview Format</label>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setInterviewMode('online')}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              interviewMode === 'online'
                ? 'border-cyan-400 bg-cyan-400/10 text-white'
                : 'border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Video className={`h-5 w-5 ${interviewMode === 'online' ? 'text-cyan-400' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-medium">Online Interview</div>
                <div className="text-sm text-gray-400">Google Meet video call</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setInterviewMode('offline')}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              interviewMode === 'offline'
                ? 'border-green-400 bg-green-400/10 text-white'
                : 'border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className={`h-5 w-5 ${interviewMode === 'offline' ? 'text-green-400' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-medium">In-Person Interview</div>
                <div className="text-sm text-gray-400">BWU Campus meeting</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Available Slots */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-white">Available Time Slots</h4>
        
        {Object.entries(groupedSlots).map(([date, slots]) => (
          <div key={date} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5 rounded-xl blur-xl"></div>
            <div className="relative bg-slate-700/50 border border-slate-600/30 rounded-xl p-6">
              <h5 className="text-white font-medium mb-4">{formatDate(date)}</h5>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => slot.available && handleSlotSelect(slot)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                      slot.available
                        ? 'border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10'
                        : 'border-slate-600/30 text-gray-500 cursor-not-allowed bg-slate-600/20'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{slot.time}</span>
                    </div>
                    {!slot.available && (
                      <div className="text-xs mt-1 text-red-400">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
        <div className="text-sm text-gray-400">
          <strong className="text-gray-300">Note:</strong> All times are in IST. You'll receive a confirmation email with meeting details once you select a slot. Please ensure you have a stable internet connection for online interviews.
        </div>
      </div>
    </div>
  );
};

export default InterviewSchedule;