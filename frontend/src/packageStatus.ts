export const PackageStatus = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  EXPIRED: 'expired',
} as const;

export type PackageStatusType = typeof PackageStatus[keyof typeof PackageStatus];

export const PackageStatusLabel: Record<PackageStatusType, string> = {
  [PackageStatus.PENDING]: '待取件',
  [PackageStatus.PICKED_UP]: '已取件',
  [PackageStatus.EXPIRED]: '已过期',
};

export const PackageStatusBadgeClass: Record<PackageStatusType, string> = {
  [PackageStatus.PENDING]: 'badge badge-pending',
  [PackageStatus.PICKED_UP]: 'badge badge-picked',
  [PackageStatus.EXPIRED]: 'badge badge-overdue',
};

export const OVERDUE_DAYS = 3;

export const isValidStatus = (status: string): status is PackageStatusType => {
  return Object.values(PackageStatus).includes(status as PackageStatusType);
};

export const isPending = (status: string): boolean => {
  return status === PackageStatus.PENDING;
};

export const isPickedUp = (status: string): boolean => {
  return status === PackageStatus.PICKED_UP;
};

export const isExpired = (status: string): boolean => {
  return status === PackageStatus.EXPIRED;
};

export const overdueDays = (enteredAt: string): number => {
  const entered = new Date(enteredAt).getTime();
  const now = Date.now();
  return Math.floor((now - entered) / 86400000);
};

export const isOverdue = (enteredAt: string, status: string): boolean => {
  if (!isPending(status)) return false;
  return overdueDays(enteredAt) > OVERDUE_DAYS;
};

export const getStatusBadgeClass = (status: string): string => {
  if (isValidStatus(status)) {
    return PackageStatusBadgeClass[status];
  }
  return 'badge badge-pending';
};

export const getStatusLabel = (status: string): string => {
  if (isValidStatus(status)) {
    return PackageStatusLabel[status];
  }
  return '未知状态';
};

export const getOverdueBadge = (enteredAt: string, status: string): { className: string; text: string } => {
  if (isOverdue(enteredAt, status)) {
    const days = overdueDays(enteredAt);
    return { className: 'badge badge-overdue', text: `超时 ${days} 天` };
  }
  return { className: PackageStatusBadgeClass[PackageStatus.PENDING], text: PackageStatusLabel[PackageStatus.PENDING] };
};
