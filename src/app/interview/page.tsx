'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ToastProvider } from '@/components/ui/toast';
import { useToast } from "@/hooks/use-toast"
import Navbar from '../components/Nav';
import Footer from '../components/Footer';
interface Question {
    id: string;
    text: string;
}

const InterviewSystem: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const { toast } = useToast();

    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [countdown, setCountdown] = useState(10);
    const [isRecordingState, setIsRecordingState] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Fetch questions from the backend API
    useEffect(() => {
        const fetchQuestionsFromLocalStorage = () => {
          try {
            const storedQuestions = localStorage.getItem('interviewQuestions');
            if (storedQuestions) {
              setQuestions(JSON.parse(storedQuestions)); // Parse and set the questions
            }
          } catch (error) {
            console.error('Error fetching questions from localStorage:', error);
          } finally {
            setLoadingQuestions(false); // Stop the loading state
          }
        };
    
        fetchQuestionsFromLocalStorage();
      }, []); 
    useEffect(() => {
        if (countdown === 0 && !isRecordingState && questions.length > 0) {
            startRecording();
        } else if (countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const stopRecording = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current.onstop = () => {
                    setRecording(false);
                    setIsRecordingState(false);
                    
            toast({ title: 'Response saved successfully!' });
                    resolve();
                };
                mediaRecorderRef.current.onerror = (error) => {
                    reject(error);
                };
            } else {
                console.error('MediaRecorder is not initialized');
                reject('MediaRecorder not initialized');
            }
        });
    }, []);

    const startRecording = useCallback(() => {
        if (!webcamRef.current || !webcamRef.current.video) {
            console.error('Webcam reference is not yet available or video element is missing');
            return;
        }

        try {
            const stream = webcamRef.current.video.srcObject as MediaStream;
            if (!stream) {
                console.error('No video stream available for recording');
                return;
            }

            setIsRecordingState(true);
            setRecording(true);

            const videoTrack = stream.getVideoTracks()[0];
            const audioTrack = stream.getAudioTracks()[0];
            const recordingStream = new MediaStream([videoTrack, audioTrack]);

            mediaRecorderRef.current = new MediaRecorder(recordingStream, { mimeType: 'video/webm' });

            mediaRecorderRef.current.addEventListener('dataavailable', (event: BlobEvent) => {
                if (event.data.size > 0) {
                    setVideoBlob(event.data);
                }
            });

            mediaRecorderRef.current.start();

            // Automatically stop recording after 2 minutes (120 seconds)
          //  setTimeout(stopRecording, 120000);
        } catch (error) {
            console.error('Error during recording setup:', error);
        }
    }, []);

    const handleSubmitVideo = async () => {
        if (!videoBlob) {
            console.error('No video blob to submit.');
            return;
        }

        setIsSubmitted(true);
        setCountdown(10);
        const formData = new FormData();
        formData.append('video', videoBlob, `Answer_${currentQuestionIndex + 1}.webm`);

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Video uploaded successfully:', response.data);
            setIsSubmitted(false);
            setVideoBlob(null);


            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                toast({ title: 'Loading Next Question!' });
            } else {
                toast({ title: 'Interview completed!' });
                window.location.href = '/results';
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            setIsSubmitted(false);
            toast({ title: 'Failed to save response. Please try again.' });
        }
    };

    return (
        <>
        <Navbar></Navbar>
        <ToastProvider>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 animate-fade-in">
                {/* Question Card */}
                <Card className="w-full lg:max-w-2xl shadow-lg rounded-lg overflow-hidden bg-white p-4 lg:p-6 animate-scale-up">
                    <CardHeader className="text-center">
                        <Badge className="text-sm font-semibold bg-indigo-100 text-indigo-700">
                            Question {currentQuestionIndex + 1}
                        </Badge>
                        <CardTitle className="text-2xl lg:text-3xl mt-2 font-semibold text-gray-900">
                            {loadingQuestions ? (
                                <Skeleton className="w-full h-8 rounded-md" />
                            ) : (
                                questions.length > 0 ? questions[currentQuestionIndex].text : 'No question available.'
                            )}
                        </CardTitle>
                    </CardHeader>

                    <div className="text-center mt-4">
                        <p className="text-gray-700 text-base sm:text-lg font-medium">{!isRecordingState ? `Get Ready ! Recording starts in : ${countdown}s`: ''}</p>
                        <p className="text-gray-700 text-base sm:text-lg font-medium">
                            {isRecordingState ? 'Recording in progress...' : 'Recording stopped'}
                        </p>
                    </div>
                    <Separator className="my-4" />
                    {/* Button to stop recording */}
                <div className="flex justify-center mt-4">
                    <Button
                        variant="default"
                        onClick={async () => {
                            try {
                                await stopRecording();
                                
                            } catch (error) {
                                console.error('Error stopping recording:', error);
                               
                            }
                        }}
                        disabled={!isRecordingState || isSubmitted}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Response
                    </Button>
                </div>

                {/* Button to submit video and move to the next question */}
                {videoBlob && !isRecordingState && (
                    <div className="flex justify-center mt-4">
                        <Button
                            variant="default"
                            onClick={handleSubmitVideo}
                            disabled={isSubmitted}
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            Move to Next Question
                        </Button>
                    </div>
                )}
                </Card>

                {/* Webcam Card */}
                <Card className="w-full lg:max-w-2xl shadow-lg rounded-lg overflow-hidden bg-gray-100 p-4 lg:p-6 flex justify-center items-center animate-slide-up">
                    <Webcam
                        audio
                        muted
                        ref={webcamRef}
                        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg shadow-lg border border-gray-300"
                        videoConstraints={{ facingMode: 'user' }}
                    />
                </Card>
            </div>
        </ToastProvider>
         <Footer></Footer>
         </>
    );
};

export default InterviewSystem;
