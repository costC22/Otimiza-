'use client';

import {Button} from "@/components/ui/button";
import {analyzeSystem} from "@/services/system-analysis";
import {toast} from "@/hooks/use-toast";
import {useTransition} from "react";

const SystemAnalysis = () => {
  const [isPending, startTransition] = useTransition();

  const handleSystemScan = async () => {
    startTransition(async () => {
      try {
        const analysisResults = await analyzeSystem();
        toast({
          title: "System Analysis Complete",
          description: analysisResults,
        });
      } catch (error: any) {
        toast({
          title: "System Analysis Failed",
          description: error.message || "Failed to analyze the system.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Scan your system for temporary files, unnecessary processes, and potential performance bottlenecks.
      </p>
      <Button disabled={isPending} onClick={handleSystemScan}>
        {isPending ? "Scanning..." : "Run System Scan"}
      </Button>
    </div>
  );
};

export default SystemAnalysis;
