import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function VisitCounter() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // Enregistrer la visite
    fetch('/api/stats/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: window.location.pathname }),
    });

    // Récupérer le total des visites
    fetch('/api/stats/total')
      .then(res => res.json())
      .then(data => setVisits(data));
  }, []);

  return (
    <Card className="fixed bottom-4 right-4 w-32">
      <CardContent className="p-2 text-center">
        <p className="text-sm text-gray-500">Visites</p>
        <p className="text-2xl font-bold">{visits}</p>
      </CardContent>
    </Card>
  );
} 