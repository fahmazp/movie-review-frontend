import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ReviewDialog = ({ open, onOpenChange, review }) => {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Full Review by {review?.userId?.name || "You"}
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
          {review?.comment}
        </div>

        <div className="text-xs font-semibold text-gray-600 dark:text-gray-500 mt-1.5">
            <span className="pr-1">Rated on</span>
          {new Date(review?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
