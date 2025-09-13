import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ResumeUploadProps {
  onDataChange: (data: any) => void;
  data: any;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onDataChange, data }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(data.resumeFile || null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent about file status
  React.useEffect(() => {
    onDataChange({ resumeFile: uploadedFile });
  }, [uploadedFile, onDataChange]);

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setUploadStatus('error');
      return;
    }

    // Simulate upload process
    setUploadStatus('uploading');
    setUploadProgress(0);

    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus('success');
          setUploadedFile(file);
          onDataChange({ resumeFile: file });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    onDataChange({ resumeFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Instructions */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Upload Your Resume</h3>
        <p className="text-gray-400">
          Upload your most recent resume in PDF or DOC format (max 5MB)
        </p>
      </div>

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-cyan-400 bg-cyan-400/5'
              : uploadStatus === 'error'
              ? 'border-red-400/50 bg-red-400/5'
              : 'border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/20'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
          />

          {uploadStatus === 'uploading' ? (
            <div className="space-y-4">
              <div className="animate-spin h-12 w-12 border-3 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
              <div className="text-white font-medium">Uploading...</div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-400">{uploadProgress}% complete</div>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <div className="text-red-400 font-medium">Upload Failed</div>
              <div className="text-sm text-gray-400">
                Please ensure your file is a PDF or DOC under 5MB
              </div>
              <button
                onClick={openFileDialog}
                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div className="space-y-2">
                <div className="text-white font-medium">
                  Drag and drop your resume here
                </div>
                <div className="text-gray-400">or</div>
                <button
                  onClick={openFileDialog}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Browse Files
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Supported formats: PDF, DOC, DOCX (max 5MB)
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-xl blur-xl"></div>
          <div className="relative bg-slate-700/50 border border-green-400/30 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-400 rounded-lg">
                  <File className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{uploadedFile.name}</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatFileSize(uploadedFile.size)} • Uploaded successfully
                  </div>
                </div>
              </div>
              
              <button
                onClick={removeFile}
                className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
        <h4 className="text-lg font-semibold text-white mb-3">Resume Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Include technical skills relevant to your chosen role</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Highlight any hackathon or project experience</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Mention relevant coursework and certifications</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Include GitHub profile and portfolio links</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Keep it concise and well-formatted (1-2 pages)</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Use action verbs and quantify achievements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
          <div className="text-sm text-gray-400">
            <strong className="text-gray-300">Privacy Notice:</strong> Your resume will be securely stored and only accessed by our team leaders for evaluation purposes. We never share your personal information with third parties.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;