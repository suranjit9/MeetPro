import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface meetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText: string;
  handleClick: () => void;
  children?: React.ReactNode;
  image?: string;
  buttinIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
  image,
  buttinIcon,
}: meetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-between">
              <Image src={image} alt="add-meeting" width={72} height={72} />
            </div>
          )}
          <h1 className={cn(`text-2xl font-bold`, className)}>{title}</h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:right-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttinIcon && (
              <Image
                src={buttinIcon}
                alt="add-meeting"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
