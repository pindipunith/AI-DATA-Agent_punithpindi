import { Brain, Upload, MessageSquare, BarChart3, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Smart Upload",
      description: "Handles any Excel format with automatic data cleaning and structure detection"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Language",
      description: "Ask questions in plain English and get intelligent, contextual responses"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Visual Analytics",
      description: "Automatic chart generation and interactive dashboards for your data"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Insights",
      description: "Get immediate analysis of trends, patterns, and business intelligence"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Ready",
      description: "Professional-grade analytics with robust data processing capabilities"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Powered",
      description: "Advanced AI understands your data context and business requirements"
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="relative container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Professional Data Analytics Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 leading-tight">
            Transform Excel Data into
            <br />
            Intelligent Insights
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload any Excel file and ask complex business questions in natural language. 
            Our AI agent provides instant analysis with charts, tables, and actionable insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
              <Upload className="w-5 h-5" />
              Start Analyzing Data
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Demo
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            No API keys required • Works with any Excel format • Instant setup
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-card border-0 shadow-xl">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Excel Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Visual Charts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Natural Language</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;