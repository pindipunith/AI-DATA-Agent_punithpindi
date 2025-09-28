import { Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Data Agent</h1>
              <p className="text-sm text-muted-foreground">Intelligent Excel Analytics</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Created by <span className="font-semibold text-primary">Punithpindi</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;