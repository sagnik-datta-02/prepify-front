'use client';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Define type for result data, including the new fields
interface AnalysisResult {
  question: string;
  transcription: string;
  grammar_checked_text: string;
  answer_relevance: string;
  answer_quality_score: string;
  structure_analysis: string;
  expected_points_coverage: string;
  constructive_feedback: string;
  sample_answer: string;
  final_feedback?: string;
  attention_score: string;
  pause_count: number;
  confidence_score: string;
  nervousness_score: string;
  average_brightness: string;
}

const ResultsPage = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [averages, setAverages] = useState<any>({});
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [improvementSuggestions, setImprovementSuggestions] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  useEffect(() => {
    const fetchResults = async () => {
      const storedResults = localStorage.getItem('analysisResults');
  
      // Initialize results with data from localStorage if available
      if (storedResults) {
        setResults(JSON.parse(storedResults));
        setLoading(false);
      }
  
      try {
        const response = await axios.get<AnalysisResult[]>('http://localhost:5001/api/results');
        
        // If the response data is valid, update the state and store it in localStorage
        if (response.data.length > 1) {
          setResults(response.data);
          localStorage.setItem('analysisResults', JSON.stringify(response.data)); // Save data to localStorage
        } 
        
        // After setting the results, calculate averages
        const finalResults = response.data.length > 1 ? response.data : JSON.parse(storedResults || '[]');
        calculateAverages(finalResults);
        
      } catch (error) {
        console.error('Failed to fetch results:', error);
        
        // On error, fall back to localStorage data
        if (storedResults) {
          setResults(JSON.parse(storedResults));
          calculateAverages(JSON.parse(storedResults));
        } else {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    };
  
    // Function to calculate averages
    const calculateAverages = (results: any) => {
      if (results.length > 0) {
        const totalResults = results.length-1;
        const averages = results.reduce(
          (acc: any, curr: any) => {
            acc.attention_score += parseFloat(curr.attention_score) || 0;
            acc.pause_count += curr.pause_count || 0;
            acc.confidence_score += parseFloat(curr.confidence_score) || 0;
            acc.nervousness_score += parseFloat(curr.nervousness_score) || 0;
            return acc;
          },
          {
            attention_score: 0,
            pause_count: 0,
            confidence_score: 0,
            nervousness_score: 0,
          }
        );
  
        setAverages({
          Attention_score: (averages.attention_score / totalResults).toFixed(2),
          Pause_count: (averages.pause_count / totalResults).toFixed(2),
          Confidence: (averages.confidence_score / totalResults).toFixed(2),
          Nervousness: (averages.nervousness_score / totalResults).toFixed(2),
        });
      }
    };
  
    fetchResults();
  }, []);
  

  const fetchImprovementSuggestions = async (key: string, value: string | number) => {
    setIsDialogOpen(true);
    setSelectedMetric(key.replace(/_/g, ' '));
    setImprovementSuggestions(null); // Reset suggestions while loading
    
    try {
      const response = await axios.post('http://localhost:5001/api/improve', 
        { 
          metric: key, 
          currentValue: value 
        },
        {
          headers: { 'Content-Type': 'application/json' } // Set the correct content type
        }
      );
  
      setImprovementSuggestions(response.data.suggestions || 'No suggestions available.');
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setImprovementSuggestions('Failed to fetch suggestions. Please try again.');
    }
  };

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading results...</p>;

  return (
    <><Navbar></Navbar>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Interview Analysis Results</h1>

      {/* Average Metrics Section */}
      <Card className="mb-6 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-800 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Average Metrics</h2>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(averages).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center justify-between mb-4">
                <span className="font-semibold text-gray-700 text-sm sm:text-base">{key.replace(/_/g, ' ')}</span>
                <span className="text-sm sm:text-base">{String(value)}</span>
                <Button
                  onClick={() => fetchImprovementSuggestions(key, String(value))}
                  className="mt-2 bg-blue-500 text-white text-sm sm:text-base px-4 py-2 rounded-full w-full sm:w-auto"
                >
                  Improve
                </Button>
              </div>
            ))}
          </div>

          {/* Bar Chart for Averages */}
          <div className="mt-6">
            <Bar
              data={{
                labels: Object.keys(averages).map((key) => key.replace(/_/g, ' ')),
                datasets: [
                  {
                    label: 'Average Metrics',
                    data: Object.values(averages),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-lg rounded-lg border border-gray-200">
        <CardHeader  
            className="bg-green-700 text-white p-4 rounded-t-lg cursor-pointer flex justify-between"
           >
            <h2 className="text-xl font-semibold">Final FeedBack</h2>
        </CardHeader>
        <CardContent className="p-6 bg-white">
        <div className="mb-4">
                
                <p>{results[results.length - 1].final_feedback || 'No data available.'}</p>
              </div>
        </CardContent>
      </Card>

      {/* Individual Results */}
      {results.slice(0, results.length - 1).map((result, index) => (
        <Card key={index} className="mb-6 shadow-lg rounded-lg border border-gray-200">
          <CardHeader
            onClick={() => toggleExpanded(index)}
            className="bg-blue-700 text-white p-4 rounded-t-lg cursor-pointer flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">Question {index + 1}</h2>
              <p className="text-sm">{result.question}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

            <div className={`w-5 h-5 transform ${expanded === index ? 'rotate-180' : ''}`} />
          </CardHeader>

          {expanded === index && (
            <CardContent className="p-6 bg-white">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Answer Relevance:</h3>
                <p>{result.answer_relevance || 'No data available.'}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Answer Quality:</h3>
                <p>{result.answer_quality_score || 'No data available.'}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Expected Points to be Covered:</h3>
                <p>{result.expected_points_coverage || 'No data available.'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Constructive Feedback:</h3>
                <p>{result.constructive_feedback || 'No feedback available.'}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Sample Answer:</h3>
                <p>{result.sample_answer || 'No data available.'}</p>
              </div>
              
            </CardContent>
          )}
        </Card>
      ))}
       

      {/* Improvement Suggestions Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger />
        <DialogContent className="max-w-full sm:max-w-md lg:max-w-lg w-full p-4">
          <DialogHeader>
            <DialogTitle>Improvement Suggestions for {selectedMetric}</DialogTitle>
            <DialogDescription>
              {improvementSuggestions || 'Loading suggestions...'}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ResultsPage;
