'use client';

import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {RunSystemOptimizationInput, runSystemOptimization} from "@/ai/flows/system-optimization-flow";
import {useTransition} from "react";

const AutomatedOptimization = () => {
  const [isPending, startTransition] = useTransition();

  const handleOptimization = async () => {
    startTransition(async () => {
      try {
        const optimizationInput: RunSystemOptimizationInput = {optimizationType: 'tempFiles'};
        const result = await runSystemOptimization(optimizationInput);
        toast({
          title: "Optimization Completed",
          description: result.result,
        });
      } catch (error: any) {
        toast({
          title: "Optimization Failed",
          description: error.message || "An error occurred during optimization.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">Run automated scripts to clear temporary files, disable unnecessary startup programs, and optimize system settings.</p>
      <Button disabled={isPending} onClick={handleOptimization}>
        {isPending ? "Optimizing..." : "Run Automated Optimization"}
      </Button>
    </div>
  );
};

export default AutomatedOptimization;
