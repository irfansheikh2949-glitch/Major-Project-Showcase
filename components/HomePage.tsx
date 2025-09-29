import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-blue-500/10 rounded-full mr-4 flex-shrink-0">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 flex-grow">{children}</p>
  </div>
);

const ProductCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      <div className="flex items-center text-blue-400 mb-3">
        {icon}
        <h3 className="text-lg font-bold text-white ml-3">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{children}</p>
    </div>
);

const TimelineItem = ({ title, children, isLast = false }) => (
  <div className="relative pl-8">
    {!isLast && <div className="absolute left-[10px] top-[14px] w-0.5 h-full bg-gray-700"></div>}
    <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-8 ring-gray-900">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
    </div>
    <div className="mb-10">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-1 text-gray-400">{children}</p>
    </div>
  </div>
);


const HomePage: React.FC<{ onNavigateAdmin: () => void }> = ({ onNavigateAdmin }) => {
  return (
    <div className="animate-fadeIn">
      <section className="relative text-center py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')"}}>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            The Future of Insurance in <span className="text-blue-400">India</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Exploring the dynamic growth, increasing penetration, and innovative products shaping India's insurance landscape.
          </p>
          <button onClick={onNavigateAdmin} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
            View Project Showcase
          </button>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Our Core Insurance Products</h2>
            <p className="text-gray-400 mt-2">Comprehensive coverage for every aspect of life and business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <ProductCard icon={<i className="fas fa-user-shield fa-2x"></i>} title="Life Insurance">Secures your family's financial future with term plans, endowments, and ULIPs, providing peace of mind against life's uncertainties.</ProductCard>
              <ProductCard icon={<i className="fas fa-heartbeat fa-2x"></i>} title="Health Insurance">Covers medical expenses, hospitalization, and critical illnesses, ensuring you get the best care without financial strain.</ProductCard>
              <ProductCard icon={<i className="fas fa-car fa-2x"></i>} title="Motor Insurance">Protects your vehicle against accidents, theft, and third-party liabilities, with comprehensive and third-party options.</ProductCard>
              <ProductCard icon={<i className="fas fa-home fa-2x"></i>} title="Home Insurance">Safeguards your property and its contents from natural calamities, fire, theft, and other unforeseen damages.</ProductCard>
              <ProductCard icon={<i className="fas fa-briefcase fa-2x"></i>} title="Business Insurance">Offers a range of liability and property insurance to protect businesses from financial losses due to various operational risks.</ProductCard>
              <ProductCard icon={<i className="fas fa-ship fa-2x"></i>} title="Marine Insurance">Provides coverage against loss or damage of ships, cargo, terminals, and any transport by which property is transferred.</ProductCard>
              <ProductCard icon={<i className="fas fa-hard-hat fa-2x"></i>} title="Workmen Compensation">Covers employers' liability for compensation to employees for accidents or occupational diseases arising during employment.</ProductCard>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
                <p className="text-gray-400">And many more tailored solutions...</p>
              </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">The Impact of POSP on Insurance Penetration</h2>
            <p className="text-gray-400 mt-2">How Point of Sales Persons are revolutionizing insurance distribution in India.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard icon={<i className="fas fa-map-marked-alt text-blue-400 text-2xl"></i>} title="Expanded Distribution">POSPs bring insurance closer to customers, especially in rural, semi-urban, and tier-2/3 cities, making products more accessible to the masses.</InfoCard>
            <InfoCard icon={<i className="fas fa-users text-blue-400 text-2xl"></i>} title="Employment Opportunities">The POSP model creates income streams for students, homemakers, retirees, and small business owners, boosting financial literacy and awareness.</InfoCard>
            <InfoCard icon={<i className="fas fa-shield-alt text-blue-400 text-2xl"></i>} title="Boost to Micro-Insurance">POSPs are highly effective in selling low-ticket policies to first-time buyers. The simplified digital process leads to faster policy issuance.</InfoCard>
            <InfoCard icon={<i className="fas fa-robot text-blue-400 text-2xl"></i>} title="Future Outlook with AI">AI-powered platforms will provide POSPs with tools for risk profiling, digital KYC, and personalized product recommendations, accelerating penetration.</InfoCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
              <div className="grid md:grid-cols-3 gap-12 items-center">
                  <div className="md:col-span-1 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-white">AI Innovations in Our SDLC</h2>
                      <p className="text-gray-400 mt-2">We embed Artificial Intelligence across the System Development Life Cycle to build smarter, faster, and more reliable insurance platforms.</p>
                  </div>
                  <div className="md:col-span-2">
                      <div className="w-full">
                          <TimelineItem title="AI-Powered Planning & Analysis">Utilizing machine learning to analyze market data, predict trends, and define project requirements with greater accuracy, reducing ambiguity from day one.</TimelineItem>
                          <TimelineItem title="Intelligent Design & Development">Employing AI-driven code generation, automated refactoring, and intelligent suggestions to accelerate development, improve code quality, and ensure best practices.</TimelineItem>
                          <TimelineItem title="Automated Testing & Smart QA">Leveraging AI to generate comprehensive test cases, perform intelligent bug detection, and conduct visual regression testing, ensuring robust and error-free applications.</TimelineItem>
                          <TimelineItem title="Predictive Deployment & Operations" isLast={true}>Using AI for predictive monitoring, anomaly detection, and automated root cause analysis in production environments, ensuring high availability and proactive issue resolution.</TimelineItem>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Understanding the Indian Insurance Market</h2>
            <p className="text-gray-400 mt-2">Key insights into a rapidly evolving industry.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} title="Market Growth">
              India's insurance industry is on a steep growth trajectory, driven by a burgeoning middle class, increased financial literacy, and supportive government policies. The gross premium collection is expected to grow significantly in the coming decade.
            </InfoCard>
            <InfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} title="Insurance Penetration">
              Despite recent growth, insurance penetration remains relatively low compared to global averages, presenting a vast, untapped market. Digital distribution channels and micro-insurance products are key to reaching rural and semi-urban populations.
            </InfoCard>
            <InfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} title="Product Innovation">
              Insurtech is revolutionizing the industry with customized products like usage-based car insurance, wellness-linked health policies, and on-demand coverage. AI and data analytics are enabling more accurate risk assessment and personalized offerings.
            </InfoCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;