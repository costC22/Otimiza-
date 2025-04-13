
'use client';

import {useEffect, useState} from 'react';
import {getOptimizationRecommendations} from '@/ai/flows/optimization-recommendations-flow';
import {Card, CardContent} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";

const OptimizationRecommendations = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const result = await getOptimizationRecommendations();
        if (result && result.recommendations) {
          setRecommendations(result.recommendations);
        } else {
          setError('No recommendations found.');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to fetch recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4"/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Based on the system analysis, here are some recommendations to improve performance.
      </p>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default OptimizationRecommendations;
