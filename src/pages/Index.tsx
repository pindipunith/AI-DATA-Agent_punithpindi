import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentView, setCurrentView] = useState<'hero' | 'upload' | 'analysis'>('hero');

  const handleGetStarted = () => {
    setCurrentView('upload');
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentView('analysis');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'hero':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'upload':
        return (
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Upload Your Excel File</h2>
                <p className="text-muted-foreground">
                  Our AI will process your data and prepare it for intelligent analysis
                </p>
              </div>
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Data Analysis Dashboard</h2>
                <p className="text-muted-foreground">
                  File: <span className="font-medium">{uploadedFile?.name}</span> • 
                  Ask questions about your data in natural language
                </p>
              </div>
              <ChatInterface fileName={uploadedFile?.name} />
            </div>
          </div>
        );
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="animate-fade-in">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;