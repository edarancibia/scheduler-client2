
export interface ModalProps {
  data: {
    date: { start: string; end: string } | string;
    event?: {
      id: number;
      title: string;
      start: string;
      end: string;
      customerId: number;
    };
  };
  onClose: () => void;
  onSave: (event: any) => void;
  onDelete?: (id: number) => void;
}

