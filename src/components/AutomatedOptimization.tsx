
'use server';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {runOptimization} from "@/services/system-optimization";

const AutomatedOptimization = () => {

  const handleOptimization = async () => {
    try {
      const result = await runOptimization();
      toast({
        title: "Optimization Completed",
        description: result,
      });
    } catch (error: any) {
      toast({
        title: "Optimization Failed",
        description: error.message || "An error occurred during optimization.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">Run automated scripts to clear temporary files, disable unnecessary startup programs, and optimize system settings.</p>
      <Button onClick={handleOptimization}>Run Automated Optimization</Button>
    </div>
  );
};

export default AutomatedOptimization;
