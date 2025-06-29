
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PolicyDialogProps {
  trigger: React.ReactNode;
  title: string;
  dialogKey: string;
  activeDialog: string | null;
  setActiveDialog: (key: string | null) => void;
  children: React.ReactNode;
}

export const PolicyDialog = ({ 
  trigger, 
  title, 
  children, 
  dialogKey,
  activeDialog,
  setActiveDialog
}: PolicyDialogProps) => (
  <Dialog open={activeDialog === dialogKey} onOpenChange={(open) => setActiveDialog(open ? dialogKey : null)}>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="bg-black border-green-400 text-green-400 font-mono max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-green-400 font-mono text-xl">{title}</DialogTitle>
      </DialogHeader>
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </DialogContent>
  </Dialog>
);
