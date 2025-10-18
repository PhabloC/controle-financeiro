export interface EditMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeta: number;
  onSave: (novaMeta: number) => void;
}
