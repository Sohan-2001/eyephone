
import { listImages } from '@/lib/actions';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function PhotosPage() {
  const blobs = await listImages();

  return (
    <>
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-background text-foreground">
        <div className="p-4 pb-28">
          <h1 className="text-3xl font-bold">Photos</h1>

          {blobs.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 mt-4">
              {blobs.map((blob) => (
                <div key={blob.pathname} className="aspect-square relative rounded-md overflow-hidden">
                  <Image
                    src={blob.url}
                    alt={blob.pathname}
                    fill
                    className="object-cover"
                    sizes="(max-width: 380px) 33vw, 120px"
                  />
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

      <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
        <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
          <ArrowLeft size={16} className="text-foreground/80" />
        </div>
      </Link>
    </>
  );
}
