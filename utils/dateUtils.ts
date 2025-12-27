
export const getDaysRemaining = (endDateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(endDateStr);
  endDate.setHours(0, 0, 0, 0);
  
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusColor = (days: number) => {
  if (days <= 0) return 'text-red-600';
  if (days <= 10) return 'text-red-500';
  if (days <= 20) return 'text-yellow-500';
  if (days <= 30) return 'text-blue-500';
  return 'text-green-500';
};
