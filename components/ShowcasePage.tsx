
import React from 'react';
import { Page, Project } from '../types';
import ProjectCard from './ProjectCard';

interface ShowcasePageProps {
  projects: Project[];
  onSelectProject: (page: Page) => void;
}

const ShowcasePage: React.FC<ShowcasePageProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white">Project Showcase</h1>
        <p className="mt-2 text-lg text-gray-400">
          A collection of React prototypes for the insurance domain.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onSelectProject(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowcasePage;
