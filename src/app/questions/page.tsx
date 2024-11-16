'use client';
import { useState } from 'react';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
}

const GenerateQuestionsPage = () => {
  const [jd, setJd] = useState<string>(' ');
  const [topic, setTopic] = useState<string>(' ');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // For navigation

  const handleGenerateQuestions = async () => {
    if (!jd && !topic) {
      setError('Job Description (JD) or Topic is required.');
      return;
    }

    setLoading(true);
    setError(null); // Reset error before API call

    try {
      const response = await axios.post('http://localhost:5001/api/questions', {
        jd: jd,
        topic: topic,
      });

      const generatedQuestions: Question[] = response.data;

      // Store the questions in local storage
      localStorage.setItem('interviewQuestions', JSON.stringify(generatedQuestions));
    } catch (err) {
      setError('Failed to generate questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToInterview = () => {
    router.push('/interview');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Interview Questions</h1>

      <div className="mb-4">
        <label htmlFor="jd" className="block text-sm font-medium text-gray-700">
          Job Description (JD)
        </label>
        <Textarea
          id="jd"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          rows={4}
          placeholder="Enter the job description here..."
          className="mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Topic
        </label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic if JD is not available"
          className="mt-1 w-full"
        />
      </div>

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleGenerateQuestions} className="w-full mt-4" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Questions'}
      </Button>

      <Button disabled={loading}
        onClick={handleNavigateToInterview}
        className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
      >
        Go to Interview Page
      </Button>
    </div>
  );
};

export default GenerateQuestionsPage;
