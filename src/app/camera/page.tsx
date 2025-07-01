
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera as CameraIcon, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/lib/actions';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CameraPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    if (!capturedImageUri) {
        getCameraPermission();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast, capturedImageUri]);

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !hasCameraPermission) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not get canvas context.' });
        return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/png');
    setCapturedImageUri(dataUri);
  };
  
  const handleRetake = () => {
    setCapturedImageUri(null);
  };

  const handleUsePhoto = async () => {
    if (!capturedImageUri) return;

    setIsUploading(true);
    try {
      await uploadImage(capturedImageUri);
      toast({ title: 'Success!', description: 'Photo uploaded.' });
    } catch (error) {
      console.error('Upload failed:', error);
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not save photo.' });
    } finally {
      setIsUploading(false);
      setCapturedImageUri(null);
    }
  };

  return (
    <>
      <div className="flex-1 w-full h-full flex flex-col bg-black text-white relative">
        {/* Header */}
        <div className="absolute top-12 left-4 z-20">
          <Link href="/" className="p-2 group">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft size={16} className="text-white/80" />
            </div>
          </Link>
        </div>

        {/* Camera View */}
        <div className="flex-1 flex items-center justify-center overflow-hidden pt-10 relative">
          <video ref={videoRef} className={cn("w-full h-full object-cover", capturedImageUri && "invisible")} autoPlay muted playsInline />
          <canvas ref={canvasRef} className="hidden" />

          {capturedImageUri && (
             <div className="absolute inset-0 w-full h-full bg-black">
                <Image src={capturedImageUri} alt="Captured photo" fill className="object-contain" />
             </div>
          )}

          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser to use this feature.
                  </AlertDescription>
                </Alert>
            </div>
          )}
        </div>

        {/* Footer / Controls */}
        <div className="h-32 flex items-center justify-around p-4 z-10">
            {capturedImageUri ? (
                <>
                    <Button variant="ghost" onClick={handleRetake} className="text-white hover:bg-white/10 hover:text-white text-lg">Retake</Button>
                    <Button onClick={handleUsePhoto} disabled={isUploading} size="lg" className="text-lg">
                        {isUploading ? <Loader2 className="animate-spin" /> : 'Save'}
                    </Button>
                </>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <button
                        onClick={handleTakePhoto}
                        disabled={!hasCameraPermission}
                        className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center disabled:opacity-50 transition-opacity"
                        aria-label="Take Picture"
                    >
                        <CameraIcon className="text-white" size={32} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </>
  );
}
