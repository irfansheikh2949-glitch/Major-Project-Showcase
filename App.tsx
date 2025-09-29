
import React, { useState, useCallback } from 'react';
import { Page, Project } from './types';

import Header from './components/common/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ShowcasePage from './components/ShowcasePage';
import AuditPortal from './components/prototypes/AuditPortal';
import WinBackRenewals from './components/prototypes/WinBackRenewals';
import ServicePerformanceDashboard from './components/prototypes/ServicePerformanceDashboard';
import CustomerBook360 from './components/prototypes/CustomerBook360';
import PartnerPayoutDashboard from './components/prototypes/PartnerPayoutDashboard';
import Partner360 from './components/prototypes/Partner360';

const projects: Project[] = [
  { id: 'auditPortal', title: 'Audit Portal', description: 'A comprehensive portal for internal and external audits.' },
  { id: 'winbackRenewals', title: 'WinBack Renewals', description: 'Dashboard to track and manage renewal win-back campaigns.' },
  { id: 'servicePerformanceDashboard', title: 'Service Performance Dashboard', description: 'Visualizing key metrics for service performance.' },
  { id: 'customerBook360', title: 'Customer Book 360', description: 'A 360-degree view of the customer portfolio.' },
  { id: 'partnerPayoutDashboard', title: 'Partner Payout Dashboard', description: 'Manage and track payouts for partners and agents.' },
  { id: 'partner360', title: 'Partner 360', description: 'An all-in-one portal for managing partner relationships.' },
];

const PROTECTED_PAGES: Page[] = [
  'showcase',
  'auditPortal',
  'winbackRenewals',
  'servicePerformanceDashboard',
  'customerBook360',
  'partnerPayoutDashboard',
  'partner360'
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentPage('showcase');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  }, []);

  const renderContent = () => {
    if (PROTECTED_PAGES.includes(currentPage) && !isAuthenticated) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    const onBackToShowcase = () => handleNavigate('showcase');

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateAdmin={() => handleNavigate('login')} />;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'showcase':
        return <ShowcasePage projects={projects} onSelectProject={handleNavigate} />;
      case 'auditPortal':
        return <AuditPortal onBack={onBackToShowcase} />;
      case 'winbackRenewals':
        return <WinBackRenewals onBack={onBackToShowcase} />;
      case 'servicePerformanceDashboard':
        return <ServicePerformanceDashboard onBack={onBackToShowcase} />;
      case 'customerBook360':
        return <CustomerBook360 onBack={onBackToShowcase} />;
      case 'partnerPayoutDashboard':
        return <PartnerPayoutDashboard onBack={onBackToShowcase} />;
      case 'partner360':
        return <Partner360 onBack={onBackToShowcase} />;
      default:
        return <HomePage onNavigateAdmin={() => handleNavigate('login')} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
