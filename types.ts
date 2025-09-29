
export type Page = 
  | 'home'
  | 'login'
  | 'showcase'
  | 'auditPortal'
  | 'winbackRenewals'
  | 'servicePerformanceDashboard'
  | 'customerBook360'
  | 'partnerPayoutDashboard'
  | 'partner360';

export interface Project {
  id: Page;
  title: string;
  description: string;
}
