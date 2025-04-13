
import {Button} from "@/components/ui/button";

const SystemAnalysis = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Scan your system for temporary files, unnecessary processes, and potential performance bottlenecks.
      </p>
      <Button>Run System Scan</Button>
    </div>
  );
};

export default SystemAnalysis;
