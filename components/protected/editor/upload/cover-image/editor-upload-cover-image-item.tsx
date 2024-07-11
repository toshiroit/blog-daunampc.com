import { DeleteCoverImage } from "@/actions/images/delete-cover-image";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { protectedEditorConfig } from "@/config/protected";
import { shimmer, toBase64 } from "@/lib/utils";
import { Loader2 as SpinnerIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface EditorUploadCoverImageItemProps {
  userId: string;
  postId: string;
  fileName: string;
  imageUrl: string;
}

const EditorUploadCoverImageItem: FC<EditorUploadCoverImageItemProps> = ({
  userId,
  postId,
  fileName,
  imageUrl,
}) => {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function deleteImage() {
    setIsDeleteLoading(!isDeleteLoading);
    const imageData = {
      userId: userId,
      postId: postId,
      fileName: fileName,
    };
    const response = await DeleteCoverImage(imageData);
    if (response) {
      setIsDeleteLoading(false);
      toast.success(protectedEditorConfig.successMessagesDeleteImage);
      router.refresh();
    } else {
      setIsDeleteLoading(false);
      toast.error(protectedEditorConfig.errorMessagesDeleteImage);
    }
  }
  return (
    <div className="col-span-full max-w-2xl">
      <Image
        src={imageUrl || imageUrl !== "" ? imageUrl : "/images/not-found.jpg"}
        className="mb-5 rounded-lg shadow-sm"
        alt="Cover image"
        height={400}
        width={600}
        priority
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 600))}`}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <TrashIcon className="mr-2 h-4 w-4" />
            {protectedEditorConfig.deleteImage}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="font-sans">
            <AlertDialogTitle>
              {protectedEditorConfig.deleteImageQuestion}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {protectedEditorConfig.deleteImageDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="font-sans">
            <AlertDialogCancel>
              {protectedEditorConfig.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteImage}>
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{protectedEditorConfig.cofirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditorUploadCoverImageItem;
