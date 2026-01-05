export type ChecklistItemDTO = {
  id: string;
  content: string;
  completed: boolean;
  checklistId: string;
};

export type ChecklistDTO = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  items: ChecklistItemDTO[];
};
