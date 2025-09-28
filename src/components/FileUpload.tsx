import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '.xlsx',
      '.xls'
    ];

    const isValidFile = validTypes.some(type => 
      file.type === type || file.name.toLowerCase().endsWith(type)
    );

    if (!isValidFile) {
      setUploadStatus('error');
      toast({
        title: "Invalid File Type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate file processing
    setTimeout(() => {
      setUploadStatus('success');
      onFileUpload(file);
      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} has been processed and is ready for analysis.`,
      });
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  const getUploadIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-success" />;
      case 'error':
        return <AlertCircle className="w-16 h-16 text-destructive" />;
      default:
        return <Upload className="w-16 h-16 text-muted-foreground" />;
    }
  };

  const getUploadText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Processing your Excel file...';
      case 'success':
        return 'File uploaded successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Upload your Excel file to get started';
    }
  };

  return (
    <Card className="p-8">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary-light' 
            : uploadStatus === 'success'
            ? 'border-success bg-success/5'
            : uploadStatus === 'error'
            ? 'border-destructive bg-destructive/5'
            : 'border-muted hover:border-primary hover:bg-primary-light/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          {getUploadIcon()}
          
          <div>
            <h3 className="text-lg font-semibold mb-2">{getUploadText()}</h3>
            <p className="text-muted-foreground mb-4">
              Supports any Excel format (.xlsx, .xls) with automatic data cleaning and structure detection
            </p>
          </div>

          {uploadStatus === 'idle' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={openFileExplorer} size="lg" className="gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Choose File
              </Button>
              <Button variant="outline" size="lg">
                or drag and drop here
              </Button>
            </div>
          )}

          {uploadStatus === 'success' && (
            <Button onClick={() => setUploadStatus('idle')} variant="outline" size="lg">
              Upload Another File
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;