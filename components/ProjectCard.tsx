import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const imageSeeds = {
    auditPortal: 'audit,report',
    winbackRenewals: 'renewal,chart',
    servicePerformanceDashboard: 'dashboard,performance',
    customerBook360: 'customer,profile',
    partnerPayoutDashboard: 'money,payout',
    partner360: 'partner,network',
    ipData: 'database,registry',
  };

  const seed = imageSeeds[project.id] || project.id;

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-blue-500"
    >
      <div className="h-32 bg-gray-700 flex items-center justify-center">
         <img src={`https://picsum.photos/seed/${seed}/400/200`} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm">{project.description}</p>
        <div className="text-right mt-4">
          <span className="text-blue-500 group-hover:text-blue-400 font-semibold text-sm">
            View Prototype &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;