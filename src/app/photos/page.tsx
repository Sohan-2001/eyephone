
'use client';

import { useState, useEffect } from 'react';
import { listImages, deleteImage } from '@/lib/actions';
import { ArrowLeft, Image as ImageIcon, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { ListBlobResultBlob } from '@vercel/blob';
import { cn } from '@/lib/utils';

export default function PhotosPage() {
  const [blobs, setBlobs] = useState<ListBlobResultBlob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // store pathname of deleting image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageBlobs = await listImages();
        setBlobs(imageBlobs);
      } catch (error) {
        console.error("Failed to fetch images", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not load your photos.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [toast]);

  const handleDelete = async (url: string, pathname: string) => {
    setIsDeleting(pathname);
    try {
      await deleteImage(url);
      setBlobs((prevBlobs) => prevBlobs.filter((blob) => blob.url !== url));
      toast({
        title: "Success",
        description: "Photo deleted successfully.",
      });
    } catch (error) {
        console.error("Failed to delete image", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not delete the photo.",
        });
    } finally {
        setIsDeleting(null);
        // If this was the last photo, exit editing mode
        if (blobs.length === 1) {
            setIsEditing(false);
        }
    }
  };

  return (
    <>
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-background text-foreground">
        <div className="p-4 pb-28">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Photos</h1>
                {blobs.length > 0 && (
                    <Button variant={isEditing ? "default" : "ghost"} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Done' : 'Edit'}
                    </Button>
                )}
            </div>

          {loading ? (
            <div className="mt-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                <Loader2 className="animate-spin" size={48} />
                <p className="mt-2">Loading photos...</p>
            </div>
          ) : blobs.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {blobs.map((blob) => (
                <div 
                    key={blob.pathname} 
                    className={cn("aspect-square relative rounded-md overflow-hidden group", !isEditing && "cursor-pointer")}
                    onClick={() => !isEditing && setSelectedImage(blob.url)}
                >
                  <Image
                    src={blob.url}
                    alt={blob.pathname}
                    fill
                    className="object-cover"
                    sizes="(max-width: 380px) 33vw, 120px"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="w-10 h-10 rounded-full"
                                    disabled={isDeleting === blob.pathname}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                {isDeleting === blob.pathname ? <Loader2 className="animate-spin" /> : <Trash2 size={20} />}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the photo.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(blob.url, blob.pathname)}>
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                <ImageIcon size={48} className="mb-4" />
                <h2 className="text-xl font-semibold">No Photos Yet</h2>
                <p className="mt-1">Use the camera app to take your first picture.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImage(null) }}>
        <DialogContent className="max-w-[90vw] h-auto p-0 border-0 bg-transparent shadow-none flex items-center justify-center">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected photo"
                width={1200}
                height={1200}
                className="object-contain w-auto h-auto max-w-full max-h-[80vh] rounded-lg"
              />
            )}
        </DialogContent>
      </Dialog>


      <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
        <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
          <ArrowLeft size={16} className="text-foreground/80" />
        </div>
      </Link>
    </>
  );
}
