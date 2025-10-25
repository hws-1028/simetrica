export const ContactStatusEnum = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type ContactStatus = typeof ContactStatusEnum[keyof typeof ContactStatusEnum];

export const ContactPriorityEnum = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type ContactPriority = typeof ContactPriorityEnum[keyof typeof ContactPriorityEnum];

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  priority: ContactPriority;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  readAt?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListResponse {
  success: boolean;
  data: Contact[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
