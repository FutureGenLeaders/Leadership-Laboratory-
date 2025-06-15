
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Star } from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  sessionType: string; // "Morning", "Afternoon", etc.
}

const CertificateModal: React.FC<CertificateModalProps> = ({ open, onClose, sessionType }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-yellow-100 via-white to-yellow-200 text-center shadow-lg animate-fade-in">
        <DialogTitle className="text-3xl font-extrabold flex items-center justify-center gap-2 mb-2 text-yellow-700">
          <Award className="w-7 h-7 text-yellow-500 mr-1" />
          Certificate of Completion
        </DialogTitle>
        <DialogDescription className="mb-4 text-gray-700">
          Congratulations! You've successfully completed your <span className="font-semibold">{sessionType}</span> Session.
        </DialogDescription>
        <div className="my-4 flex flex-col items-center gap-2">
          <Star className="text-yellow-400 w-10 h-10 animate-bounce" />
          <span className="block text-lg font-medium text-gray-700">Your dedication moves you closer to mastery.</span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="mx-auto">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
