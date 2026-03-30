import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileAudio, Image, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useCreateContent } from "../hooks/useQueries";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [mediaProgress, setMediaProgress] = useState(0);

  const { mutateAsync: createContent, isPending } = useCreateContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !mediaFile) {
      toast.error(
        "Please fill in all required fields and select a media file.",
      );
      return;
    }

    try {
      const mediaBytes = new Uint8Array(await mediaFile.arrayBuffer());
      const fileBlob = ExternalBlob.fromBytes(mediaBytes).withUploadProgress(
        (p) => setMediaProgress(p),
      );

      let thumbBlob: ExternalBlob | null = null;
      if (thumbFile) {
        const thumbBytes = new Uint8Array(await thumbFile.arrayBuffer());
        thumbBlob = ExternalBlob.fromBytes(thumbBytes);
      }

      await createContent({
        title,
        description,
        category,
        fileKey: fileBlob,
        thumbnailKey: thumbBlob,
        duration: duration || "Unknown",
        isPublished: true,
      });

      toast.success("Content uploaded successfully!");
      handleClose();
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setDuration("");
    setMediaFile(null);
    setThumbFile(null);
    setMediaProgress(0);
    onClose();
  };

  const dropzoneStyle = (active: boolean) => ({
    background: "oklch(0.08 0.008 280)",
    borderColor: active
      ? "oklch(0.54 0.21 283 / 0.5)"
      : "rgba(255,255,255,0.08)",
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg border-subtle"
        style={{
          background: "oklch(0.10 0.04 295)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        data-ocid="upload.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-xl uppercase tracking-wide text-foreground">
            Upload Your Content
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label
              className="text-sm text-muted-foreground"
              htmlFor="upload-title"
            >
              Title *
            </Label>
            <Input
              id="upload-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              className="bg-muted/30"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              required
              data-ocid="upload.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              className="text-sm text-muted-foreground"
              htmlFor="upload-desc"
            >
              Description
            </Label>
            <Textarea
              id="upload-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your content..."
              className="bg-muted/30 resize-none"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              rows={3}
              data-ocid="upload.textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">
                Category *
              </Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger
                  className="bg-muted/30"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  data-ocid="upload.select"
                >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent style={{ background: "oklch(0.12 0.04 295)" }}>
                  <SelectItem value="audiobook">Audio Book</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="movie">Movie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label
                className="text-sm text-muted-foreground"
                htmlFor="upload-duration"
              >
                Duration
              </Label>
              <Input
                id="upload-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 1h 30m"
                className="bg-muted/30"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
                data-ocid="upload.input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm text-muted-foreground">
              Media File * (audio or video)
            </span>
            <label
              htmlFor="upload-media"
              className="flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer border transition-colors hover:border-primary/50"
              style={dropzoneStyle(!!mediaFile)}
              data-ocid="upload.dropzone"
            >
              <input
                id="upload-media"
                type="file"
                accept="audio/*,video/*"
                className="hidden"
                onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)}
              />
              {mediaFile ? (
                <>
                  <CheckCircle2
                    className="w-5 h-5 shrink-0"
                    style={{ color: "oklch(0.82 0.17 82)" }}
                  />
                  <span className="text-sm text-foreground truncate">
                    {mediaFile.name}
                  </span>
                </>
              ) : (
                <>
                  <FileAudio className="w-5 h-5 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select audio/video file
                  </span>
                </>
              )}
            </label>
            {isPending && mediaProgress > 0 && (
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: "oklch(0.08 0.008 280)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${mediaProgress}%`,
                    background: "oklch(0.54 0.21 283)",
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-sm text-muted-foreground">
              Thumbnail Image (optional)
            </span>
            <label
              htmlFor="upload-thumb"
              className="flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer border transition-colors hover:border-primary/50"
              style={dropzoneStyle(!!thumbFile)}
              data-ocid="upload.upload_button"
            >
              <input
                id="upload-thumb"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
              />
              {thumbFile ? (
                <>
                  <CheckCircle2
                    className="w-5 h-5 shrink-0"
                    style={{ color: "oklch(0.82 0.17 82)" }}
                  />
                  <span className="text-sm text-foreground truncate">
                    {thumbFile.name}
                  </span>
                </>
              ) : (
                <>
                  <Image className="w-5 h-5 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select thumbnail image
                  </span>
                </>
              )}
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-full border-subtle"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              data-ocid="upload.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-full bg-primary text-primary-foreground glow-purple"
              data-ocid="upload.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Start Uploading
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
