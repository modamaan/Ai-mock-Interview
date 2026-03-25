"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Reset answer when question changes
  useEffect(() => {
    setUserAnswer("");
  }, [activeQuestionIndex]);

  const saveAnswer = useCallback(async (answer) => {
    if (!answer || answer.trim().length <= 10) return;
    if (!interviewData?.mockId || !mockInterviewQuestion?.[activeQuestionIndex]) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/interviews/${interviewData.mockId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: mockInterviewQuestion[activeQuestionIndex].Question,
          correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
          userAns: answer,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save answer");
      }

      toast.success("Answer recorded successfully!");
      setUserAnswer("");
    } catch (err) {
      toast.error(err.message || "An error occurred while saving your answer.");
    } finally {
      setLoading(false);
    }
  }, [activeQuestionIndex, interviewData, mockInterviewQuestion]);

  const transcribeAudio = useCallback(async (audioBlob) => {
    try {
      setLoading(true);
      // Convert blob to base64 and send to a transcription endpoint
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Transcription failed");

      const { transcription } = await res.json();
      const updatedAnswer = (userAnswer + " " + transcription).trim();
      setUserAnswer(updatedAnswer);
      // Save once transcription is done
      await saveAnswer(updatedAnswer);
    } catch {
      toast.error("Error transcribing audio. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userAnswer, saveAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        // Stop all tracks to release the mic
        stream.getTracks().forEach((t) => t.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem]">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 250, width: "100%", zIndex: 10 }}
          />
        ) : (
          <Image
            src="/camera.jpg"
            width={200}
            height={200}
            alt="Camera placeholder — enable webcam to see your video feed"
          />
        )}
      </div>

      {userAnswer && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg w-[30rem] text-sm text-gray-700">
          <strong>Your answer:</strong> {userAnswer}
        </div>
      )}

      <div className="md:flex mt-4 md:mt-8 md:gap-5">
        <div className="my-4 md:my-0">
          <Button onClick={() => setWebCamEnabled((prev) => !prev)}>
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {isRecording ? (
            <span className="text-red-400 flex gap-2 items-center">
              <Mic /> Stop Recording...
            </span>
          ) : loading ? (
            "Saving..."
          ) : (
            "Record Answer"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
