export interface ModalProps {
  data: {
    type: 'create' | 'edit';
    date?: string;
    event?: {
      id: number;
      title: string;
      start: string;
      end?: string;
    };
  };
  onClose: () => void;
  onSave: (eventData: { id: number; title: string; date: string; endDate: string }) => void;
  onDelete?: (id: number) => void;
  children?: React.ReactNode;
}
