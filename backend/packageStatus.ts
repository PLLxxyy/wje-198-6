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

export const canPickup = (status: string): boolean => {
  return status === PackageStatus.PENDING;
};

export const isOverdue = (enteredAt: string, status: string): boolean => {
  if (status !== PackageStatus.PENDING) return false;
  const entered = new Date(enteredAt).getTime();
  const now = Date.now();
  const days = Math.floor((now - entered) / 86400000);
  return days > OVERDUE_DAYS;
};

export const overdueDays = (enteredAt: string): number => {
  const entered = new Date(enteredAt).getTime();
  const now = Date.now();
  return Math.floor((now - entered) / 86400000);
};

export const getNextStatusForPickup = (): PackageStatusType => {
  return PackageStatus.PICKED_UP;
};

export const getDefaultStatus = (): PackageStatusType => {
  return PackageStatus.PENDING;
};

export const getAllStatusValues = (): PackageStatusType[] => {
  return Object.values(PackageStatus);
};

export const SqlStatusCondition = {
  pending: `status = '${PackageStatus.PENDING}'`,
  pickedUp: `status = '${PackageStatus.PICKED_UP}'`,
  expired: `status = '${PackageStatus.EXPIRED}'`,
  notPickedUp: `status != '${PackageStatus.PICKED_UP}'`,
};

export const SqlOverdueCondition = `
  status = '${PackageStatus.PENDING}'
  AND julianday('now','localtime') - julianday(entered_at) > ${OVERDUE_DAYS}
`;
