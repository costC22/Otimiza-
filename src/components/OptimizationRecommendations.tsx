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
          setError('Nenhuma recomendação encontrada.');
        }
      } catch (e: any) {
        setError(e.message || 'Falha ao buscar recomendações.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <p>Carregando recomendações...</p>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4"/>
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground">
        Com base na análise do sistema, aqui estão algumas recomendações para melhorar o desempenho.
      </p>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index} className="py-2">{recommendation}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma recomendação disponível.</p>
      )}
    </div>
  );
};

export default OptimizationRecommendations;
