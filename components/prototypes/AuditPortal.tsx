import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface PrototypeProps {
  onBack: () => void;
}

// Icon Components (re-created from lucide-react SVGs to avoid dependency)
const ChevronUp = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 15-6-6-6 6"/></svg>);
const ChevronDown = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>);
const Filter = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const Sparkles = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>);
const FileText = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>);
const FileSpreadsheet = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 11h8v4H8z"/><path d="M8 15h8"/><path d="M12 11v4"/></svg>);
const XCircle = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>);
const Search = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);
const BarChart3 = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>);
const ListChecks = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>);
const UploadCloud = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>);
const ArrowLeft = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);

// @ts-nocheck
const AUDIT_STRUCTURE = {
  'A': { name: 'Quote Quality', weight: 0.20, parameters: [ { name: 'Premium Calculation Accuracy', criticality: 'High' }, { name: 'Application of Insurer UW Guidelines', criticality: 'High' }, { name: 'Mandatory Details Captured', criticality: 'High' }, { name: 'Clarity in Terms & Conditions', criticality: 'High' }, { name: 'Coverage Requested vs Quoted', criticality: 'High' } ] },
  'B': { name: 'Policy Data Entry Quality', weight: 0.20, parameters: [ { name: 'Insured Details Accuracy', criticality: 'High' }, { name: 'Sum Insured Accuracy', criticality: 'High' }, { name: 'Premium Accuracy', criticality: 'High' }, { name: 'Coverage & Occupancy Accuracy', criticality: 'High' }, { name: 'No Duplicate/Missing Values', criticality: 'High' } ] },
  'C': { name: 'System Updation', weight: 0.10, parameters: [ { name: 'Premium and related information', criticality: 'Medium' }, { name: 'Approvals & Documents Uploaded', criticality: 'Medium' }, { name: 'Status Updated Correctly', criticality: 'Medium' }, { name: 'Timely updation', criticality: 'Medium' } ] },
  'D': { name: 'Coverage Alignment', weight: 0.20, parameters: [ { name: 'Coverage Asked vs Provided', criticality: 'High' }, { name: 'Deviation Documented', criticality: 'High' }, { name: 'Insurer Approvals', criticality: 'High' }, { name: 'Endorsements Aligned with UW', criticality: 'High' } ] },
  'E': { name: 'Process & Compliance', weight: 0.20, parameters: [ { name: 'KYC/AML Checks', criticality: 'Critical' }, { name: 'Mandate Procurement & Upload', criticality: 'Critical' }, { name: 'Revenue & Deal Updation', criticality: 'Critical' }, { name: 'Reports Updation', criticality: 'Critical' } ] },
  'F': { name: 'Communication', weight: 0.10, parameters: [ { name: 'Called to Partner', criticality: 'Medium' }, { name: 'Professional Language', criticality: 'Medium' }, { name: 'Response Timeliness', criticality: 'Medium' }, { name: 'OTE Creation post discussion', criticality: 'Medium' } ] },
};

const PIE_COLORS = { 'Critical (<60%)': '#ef4444', 'Medium (60-74%)': '#f59e0b', 'High (>=75%)': '#22c55e' };

const MOCK_CASES = [
    { serialNo: '1', oteDate: '2023-10-01', oteNo: 'OTE-001', customerName: 'Innovate Inc.', product: 'Cyber Insurance', ebType: 'EB', assignedTo: 'John Doe', auditorName: 'Alice' },
    { serialNo: '2', oteDate: '2023-10-02', oteNo: 'OTE-002', customerName: 'Tech Solutions', product: 'Liability Insurance', ebType: 'NON EB', assignedTo: 'Jane Smith', auditorName: 'Alice' },
    { serialNo: '3', oteDate: '2023-10-03', oteNo: 'OTE-003', customerName: 'HealthFirst', product: 'Health Insurance', ebType: 'VPM', assignedTo: 'John Doe', auditorName: 'Bob' },
    { serialNo: '4', oteDate: '2023-10-04', oteNo: 'OTE-004', customerName: 'Auto World', product: 'Motor Insurance', ebType: 'EB', assignedTo: 'Peter Jones', auditorName: 'Bob' },
    { serialNo: '5', oteDate: '2023-10-05', oteNo: 'OTE-005', customerName: 'Innovate Inc.', product: 'Cyber Insurance', ebType: 'NON EB', assignedTo: 'Jane Smith', auditorName: 'Alice' },
];

const MOCK_HISTORY = [
    { id: 'h1', oteNo: 'OTE-101', customerName: 'Past Solutions', auditor: 'Alice', grandTotal: 85.5, timestamp: new Date('2023-09-15'), assignedTo: 'John Doe', isCommunicationNA: false, product: 'Cyber Insurance' },
    { id: 'h2', oteNo: 'OTE-102', customerName: 'Legacy Corp', auditor: 'Bob', grandTotal: 55.0, timestamp: new Date('2023-09-18'), assignedTo: 'Jane Smith', isCommunicationNA: true, product: 'Health Insurance' },
    { id: 'h3', oteNo: 'OTE-103', customerName: 'Future Gadgets', auditor: 'Alice', grandTotal: 72.3, timestamp: new Date('2023-09-20'), assignedTo: 'John Doe', isCommunicationNA: false, product: 'Liability Insurance' },
];

const AuditPortal: React.FC<PrototypeProps> = ({ onBack }) => {
  const [error, setError] = useState(null);
  const [view, setView] = useState('audit'); // 'audit', 'history', 'analytics'
  const [caseData, setCaseData] = useState(null);
  const [uploadedCases, setUploadedCases] = useState(MOCK_CASES);
  const [auditorName, setAuditorName] = useState('Demo Auditor');
  const [scores, setScores] = useState({});
  const [isCommunicationNA, setIsCommunicationNA] = useState(false);
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [auditedCaseMap, setAuditedCaseMap] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [geminiInsights, setGeminiInsights] = useState(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterProduct, setFilterProduct] = useState('');
  const [filterEbType, setFilterEbType] = useState('');
  const [filterAssignedTo, setFilterAssignedTo] = useState('');
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [selectedAssignedTo, setSelectedAssignedTo] = useState('');
  const [analyticsData, setAnalyticsData] = useState({ sectionAverages: [], scoreDistribution: [], auditorPerformance: [], monthlyAudits: [] });

  const Recharts = (window as any).Recharts;
  const { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts || {};

  const getEffectiveWeights = useMemo(() => {
    if (isCommunicationNA) {
      const remainingWeight = 1.0 - AUDIT_STRUCTURE['F'].weight;
      const otherSectionsTotalWeight = Object.values(AUDIT_STRUCTURE).filter(s => s.name !== 'Communication').reduce((sum, s) => sum + s.weight, 0);
      const effectiveWeights = {};
      for (const key in AUDIT_STRUCTURE) {
        effectiveWeights[key] = key === 'F' ? 0 : (AUDIT_STRUCTURE[key].weight / otherSectionsTotalWeight) * remainingWeight;
      }
      return effectiveWeights;
    } else {
      const weights = {};
      for (const key in AUDIT_STRUCTURE) {
        weights[key] = AUDIT_STRUCTURE[key].weight;
      }
      return weights;
    }
  }, [isCommunicationNA]);
  
  const calculateSectionTotal = useCallback((sectionId) => {
    const sectionData = AUDIT_STRUCTURE[sectionId];
    if (!sectionData) return 0;
    const sectionScores = scores[sectionId] || {};
    const scoredParameters = sectionData.parameters.filter(p => sectionScores[p.name] != null);
    if (scoredParameters.length === 0) return 0;
    const totalScore = scoredParameters.reduce((sum, p) => sum + (sectionScores[p.name] / 5) * 100, 0);
    return totalScore / scoredParameters.length;
  }, [scores]);
  
  const calculateWeightedScore = useCallback((sectionId) => {
    const sectionTotal = calculateSectionTotal(sectionId);
    return sectionTotal * (getEffectiveWeights[sectionId] || 0);
  }, [calculateSectionTotal, getEffectiveWeights]);
  
  const grandTotal = useMemo(() => {
    return Object.keys(AUDIT_STRUCTURE).reduce((total, sectionId) => total + calculateWeightedScore(sectionId), 0);
  }, [calculateWeightedScore]);

  const calculateAnalytics = useCallback((audits) => {
    if (audits.length === 0) {
      setAnalyticsData({ sectionAverages: [], scoreDistribution: [], auditorPerformance: [], monthlyAudits: [] });
      return;
    }
    const sectionTotals = {};
    const sectionCounts = {};
    const auditorTotals = {};
    const auditorCounts = {};
    
    audits.forEach(audit => {
      Object.keys(AUDIT_STRUCTURE).forEach(secKey => {
          const score = (audit.grandTotal || 75) + (Math.random() * 20 - 10);
          sectionTotals[secKey] = (sectionTotals[secKey] || 0) + score;
          sectionCounts[secKey] = (sectionCounts[secKey] || 0) + 1;
      });

      const auditor = audit.auditor || 'Unknown';
      auditorTotals[auditor] = (auditorTotals[auditor] || 0) + (audit.grandTotal || 0);
      auditorCounts[auditor] = (auditorCounts[auditor] || 0) + 1;
    });

    const sectionAverages = Object.keys(AUDIT_STRUCTURE).map(key => ({
      name: AUDIT_STRUCTURE[key].name,
      average: sectionCounts[key] > 0 ? sectionTotals[key] / sectionCounts[key] : 0,
    }));
    const scoreRanges = { 'Critical (<60%)': 0, 'Medium (60-74%)': 0, 'High (>=75%)': 0 };
    audits.forEach(audit => {
      if (audit.grandTotal >= 75) scoreRanges['High (>=75%)']++;
      else if (audit.grandTotal >= 60) scoreRanges['Medium (60-74%)']++;
      else scoreRanges['Critical (<60%)']++;
    });
    const scoreDistribution = Object.keys(scoreRanges).map(name => ({ name, value: scoreRanges[name] }));
    const auditorPerformance = Object.keys(auditorTotals).map(name => ({
      name,
      averageScore: auditorCounts[name] > 0 ? auditorTotals[name] / auditorCounts[name] : 0,
    }));

    setAnalyticsData({ sectionAverages, scoreDistribution, auditorPerformance, monthlyAudits: [] });
  }, []);

  useEffect(() => {
    const map = history.reduce((acc, audit) => {
      if (audit.oteNo) acc[audit.oteNo] = true;
      return acc;
    }, {});
    setAuditedCaseMap(map);
    calculateAnalytics(history);
  }, [history, calculateAnalytics]);

  const handleFileUpload = (e) => { /* Placeholder */ };

  const handleCaseSelection = (caseDetails) => {
    setCaseData(caseDetails);
    setScores({});
    setIsCommunicationNA(false);
    setGeminiInsights(null);
    setError(null);
    setAuditorName(caseDetails.auditorName || 'Demo Auditor');
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredCases = useMemo(() => uploadedCases.filter(c =>
    (!filterProduct || c.product === filterProduct) &&
    (!filterEbType || c.ebType === filterEbType) &&
    (!filterAssignedTo || c.assignedTo === filterAssignedTo)
  ), [uploadedCases, filterProduct, filterEbType, filterAssignedTo]);

  const sortedCases = useMemo(() => [...filteredCases].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey] || '';
    const bValue = b[sortKey] || '';
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  }), [filteredCases, sortKey, sortDirection]);

  const uniqueProducts = useMemo(() => [...new Set(uploadedCases.map(c => c.product))].filter(Boolean), [uploadedCases]);
  const uniqueEbTypes = useMemo(() => [...new Set(uploadedCases.map(c => c.ebType))].filter(Boolean), [uploadedCases]);
  const uniqueAssignedTosFromUpload = useMemo(() => [...new Set(uploadedCases.map(c => c.assignedTo))].filter(Boolean), [uploadedCases]);
  const uniqueAssignedTosFromHistory = useMemo(() => [...new Set(history.map(c => c.assignedTo))].filter(Boolean).sort(), [history]);
  
  const filteredHistory = useMemo(() => {
     let audits = history;
     if (selectedAssignedTo) {
       audits = audits.filter(audit => audit.assignedTo === selectedAssignedTo);
     }
     if (historySearchTerm) {
       const lowercasedTerm = historySearchTerm.toLowerCase();
       audits = audits.filter(audit =>
         audit.oteNo?.toLowerCase().includes(lowercasedTerm) ||
         audit.customerName?.toLowerCase().includes(lowercasedTerm)
       );
     }
     return audits;
  }, [history, selectedAssignedTo, historySearchTerm]);

  const handleScoreChange = (sectionId, parameterName, value) => {
    setScores(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [parameterName]: value === '' ? null : parseFloat(value) }
    }));
  };

  const getColorAndSmiley = (total) => {
    if (total >= 75) return { color: 'green-500', smiley: '😊' };
    if (total >= 60) return { color: 'amber-500', smiley: '😐' };
    return { color: 'red-500', smiley: '😞' };
  };
  const { color: totalColor, smiley: totalSmiley } = getColorAndSmiley(grandTotal);

  const handleSaveAudit = async () => {
    if (!auditorName || !caseData) { setError('Auditor name and case data are required.'); return; }
    setIsSaving(true);
    setError(null);
    
    setTimeout(() => {
        const newAudit = {
            ...caseData,
            id: `new-${Date.now()}`,
            auditor: auditorName,
            scores,
            grandTotal,
            isCommunicationNA,
            timestamp: new Date(),
        };
        setHistory(prev => [newAudit, ...prev]);
        setShowSuccessModal(true);
        setCaseData(null);
        setIsSaving(false);
    }, 1000);
  };

  const generateAuditInsights = async () => { /* Placeholder */ };
  
  const handleDownloadExcel = useCallback(() => {
    if (!selectedAssignedTo || filteredHistory.length === 0 || !(window as any).XLSX) return;
    const XLSX = (window as any).XLSX;
    const worksheet = XLSX.utils.json_to_sheet(filteredHistory.map(a => ({
        Date: new Date(a.timestamp).toLocaleDateString(),
        'OTE No.': a.oteNo,
        'Customer Name': a.customerName,
        Auditor: a.auditor,
        'Score (%)': a.grandTotal.toFixed(2)
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Audit History");
    XLSX.writeFile(workbook, `audit_history_${selectedAssignedTo}.xlsx`);
  }, [selectedAssignedTo, filteredHistory]);

  const handleDownloadPdf = useCallback(() => {
    if (!selectedAssignedTo || filteredHistory.length === 0 || !(window as any).jspdf) return;
    const jspdf = (window as any).jspdf;
    const doc = new jspdf.jsPDF();
    doc.text(`Audit History for ${selectedAssignedTo}`, 14, 16);
    doc.autoTable({
        startY: 20,
        head: [['Date', 'OTE No.', 'Customer Name', 'Auditor', 'Score']],
        body: filteredHistory.map(a => [new Date(a.timestamp).toLocaleDateString(), a.oteNo, a.customerName, a.auditor, `${a.grandTotal.toFixed(2)}%`]),
    });
    doc.save(`audit_history_${selectedAssignedTo}.pdf`);
  }, [selectedAssignedTo, filteredHistory]);

  return (
    <div className="font-sans text-gray-900">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 space-y-8 mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
                <button onClick={onBack} title="Back to Showcase" className="p-2 -ml-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="bg-purple-600 p-3 rounded-full">
                        <ListChecks className="text-white h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Quality Audit Portal</h1>
                      <p className="text-gray-500">A showcase of modern UI/UX for auditing processes.</p>
                    </div>
                </div>
            </div>
            <nav className="flex space-x-2 mt-4 sm:mt-0 bg-gray-200 p-1.5 rounded-full">
              {[
                {id: 'audit', label: 'Audit Desk', icon: ListChecks},
                {id: 'history', label: 'History', icon: FileText}, 
                {id: 'analytics', label: 'Analytics', icon: BarChart3}
              ].map(v => (
                <button key={v.id} onClick={() => setView(v.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${view === v.id ? 'bg-white text-purple-600 shadow-md' : 'text-gray-600 hover:bg-white/60'}`}>
                    <v.icon className="h-5 w-5" />
                    {v.label}
                </button>
              ))}
            </nav>
          </header>

          {error && (
            <div className="flex items-center justify-between p-4 bg-red-100 text-red-800 rounded-lg shadow-inner border border-red-200">
              <div className="flex items-center gap-3"><XCircle className="h-5 w-5" /><span className="font-medium">{error}</span></div>
              <button onClick={() => setError(null)} className="font-semibold hover:text-red-900 transition-colors duration-200">Dismiss</button>
            </div>
          )}

          {view === 'audit' && (
            <>
              {!caseData ? (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-bold text-gray-700">Select a Case to Audit</h2>
                        <p className="text-gray-500">Upload a CSV or select from the demo cases below. Audited cases are marked in gray.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label htmlFor="file-upload" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition duration-300 shadow">
                           <UploadCloud size={20} />
                          <span>Upload CSV</span>
                          <input id="file-upload" type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
                        </label>
                         <input type="text" placeholder="Auditor Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={auditorName} onChange={(e) => setAuditorName(e.target.value)} required />
                      </div>
                  </div>
                  {uploadedCases.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-gray-50 border">
                        <Filter className="text-gray-500" />
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}>
                                <option value="">All Products</option>
                                {uniqueProducts.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" value={filterEbType} onChange={(e) => setFilterEbType(e.target.value)}>
                                <option value="">All Types</option>
                                {uniqueEbTypes.map(eb => <option key={eb} value={eb}>{eb}</option>)}
                            </select>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" value={filterAssignedTo} onChange={(e) => setFilterAssignedTo(e.target.value)}>
                                <option value="">All Assignees</option>
                                {uniqueAssignedTosFromUpload.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-6 gap-4 bg-gray-100 text-gray-600 p-4 rounded-t-lg text-sm font-semibold min-w-[700px] border-b-2 border-gray-200">
                          {['oteDate', 'oteNo', 'customerName', 'product', 'assignedTo'].map(key => (
                            <span key={key} className="cursor-pointer flex items-center capitalize" onClick={() => handleSort(key)}>{key.replace(/([A-Z])/g, ' $1').trim()}{sortKey === key && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</span>
                          ))}
                          <span>Status</span>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto mt-2">
                          {sortedCases.length > 0 ? (
                            sortedCases.map((c, index) => (
                              <div key={index} className={`grid grid-cols-6 gap-4 p-4 rounded-lg shadow-sm text-sm cursor-pointer transition duration-200 min-w-[700px] border ${auditedCaseMap[c.oteNo] ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-purple-50 hover:border-purple-300'}`} onClick={() => !auditedCaseMap[c.oteNo] && handleCaseSelection(c)}>
                                <span className="truncate">{c.oteDate}</span>
                                <span className="truncate font-medium text-gray-800">{c.oteNo}</span>
                                <span className="truncate">{c.customerName}</span>
                                <span className="truncate">{c.product}</span>
                                <span className="truncate">{c.assignedTo}</span>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full text-center ${auditedCaseMap[c.oteNo] ? 'bg-gray-300 text-gray-700' : 'bg-green-100 text-green-800'}`}>{auditedCaseMap[c.oteNo] ? 'Audited' : 'Pending'}</span>
                              </div>
                            ))
                          ) : <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">No cases match filters.</div>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                 <div className="space-y-6">
                    <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-purple-800 mb-2">Auditing Case: {caseData.oteNo}</h3>
                                <p className="text-sm text-purple-700"><strong>Customer:</strong> {caseData.customerName} | <strong>Assigned To:</strong> {caseData.assignedTo}</p>
                            </div>
                            <input type="text" value={auditorName} onChange={(e) => setAuditorName(e.target.value)} placeholder="Auditor Name" className="w-1/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"/>
                        </div>
                    </div>
                    {Object.entries(AUDIT_STRUCTURE).map(([sectionId, { name, parameters }]) => (
                        <div key={sectionId} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                               <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                                {sectionId === 'F' && (
                                  <div className="flex items-center space-x-2 text-sm text-gray-600"><input type="checkbox" id="comm-na" checked={isCommunicationNA} onChange={(e) => setIsCommunicationNA(e.target.checked)} className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500" /><label htmlFor="comm-na">Mark as Not Applicable (N/A)</label></div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                {parameters.map(({ name: paramName }) => (
                                    <div key={paramName} className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-600 mb-1">{paramName}</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100" value={scores[sectionId]?.[paramName] ?? ''} onChange={(e) => handleScoreChange(sectionId, paramName, e.target.value)} disabled={isCommunicationNA && sectionId === 'F'}>
                                            <option value="" disabled>Select Score (0-5)</option>
                                            {[0, 1, 2, 3, 4, 5].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={`p-6 rounded-xl text-center border-2 ${totalColor === 'green-500' ? 'border-green-300 bg-green-50' : totalColor === 'amber-500' ? 'border-amber-300 bg-amber-50' : 'border-red-300 bg-red-50'}`}>
                        <h3 className="text-2xl font-bold text-gray-800">Grand Total Score: <span className={`text-${totalColor}`}>{grandTotal.toFixed(2)}% {totalSmiley}</span></h3>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                        <button onClick={handleSaveAudit} className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-md disabled:opacity-50" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Audit'}
                        </button>
                        <button onClick={generateAuditInsights} className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-lg font-bold text-lg hover:bg-indigo-600 transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50" disabled={isGeneratingInsights}><Sparkles size={20} />{isGeneratingInsights ? 'Generating...' : 'Generate AI Insights'}</button>
                        <button onClick={() => setCaseData(null)} className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition duration-300">Cancel</button>
                    </div>
                 </div>
              )}
            </>
          )}

          {view === 'history' && (
             <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-gray-700">Audit History & Reports</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 bg-gray-50 rounded-xl border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-600">Report for:</span>
                      <select className="flex-grow min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" value={selectedAssignedTo} onChange={(e) => setSelectedAssignedTo(e.target.value)}>
                        <option value="">Select Employee</option>
                        {uniqueAssignedTosFromHistory.map(auditor => <option key={auditor} value={auditor}>{auditor}</option>)}
                      </select>
                      <button onClick={handleDownloadExcel} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50" disabled={!selectedAssignedTo}><FileSpreadsheet size={16} /> Excel</button>
                      <button onClick={handleDownloadPdf} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-50" disabled={!selectedAssignedTo}><FileText size={16} /> PDF</button>
                    </div>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                       <input type="text" placeholder="Search by OTE No. or Customer..." value={historySearchTerm} onChange={(e) => setHistorySearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <div className="grid grid-cols-5 gap-4 bg-gray-100 text-gray-600 p-4 rounded-t-lg text-sm font-semibold min-w-[600px] border-b-2 border-gray-200">
                      <span>Date</span> <span>OTE No.</span> <span>Customer Name</span> <span>Auditor</span> <span>Score</span>
                    </div>
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto mt-2">
                       {filteredHistory.length > 0 ? (
                         filteredHistory.map(audit => (
                           <div key={audit.id} className="grid grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-sm text-sm min-w-[600px] border">
                             <span className="truncate">{new Date(audit.timestamp).toLocaleDateString()}</span>
                             <span className="truncate font-medium">{audit.oteNo}</span>
                             <span className="truncate">{audit.customerName}</span>
                             <span className="truncate">{audit.auditor}</span>
                             <span className={`font-semibold text-${getColorAndSmiley(audit.grandTotal).color}`}>{audit.grandTotal.toFixed(2)}%</span>
                           </div>
                         ))
                       ) : <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">No audit history found.</div>}
                    </div>
                 </div>
             </div>
          )}

          {view === 'analytics' && (
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-gray-700">Audit Analytics Dashboard</h2>
                 {!Recharts ? (
                    <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">Loading Charts...</div>
                 ) : history.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-6 bg-white rounded-xl shadow-lg border">
                          <h3 className="text-xl font-bold text-gray-700 mb-4">Score Distribution</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={analyticsData.scoreDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {analyticsData.scoreDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-lg border">
                          <h3 className="text-xl font-bold text-gray-700 mb-4">Auditor Performance</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analyticsData.auditorPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                                <Bar dataKey="averageScore" fill="#82ca9d" name="Average Score" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-lg border lg:col-span-2">
                          <h3 className="text-xl font-bold text-gray-700 mb-4">Average Scores by Section</h3>
                          <ResponsiveContainer width="100%" height={350}>
                             <BarChart data={analyticsData.sectionAverages} margin={{ top: 20, right: 30, left: 0, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                                <Bar dataKey="average" fill="#8884d8" name="Average Score" radius={[4, 4, 0, 0]} />
                             </BarChart>
                          </ResponsiveContainer>
                      </div>
                    </div>
                 ) : <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">No audit data available to generate analytics.</div>}
              </div>
          )}

        </div>
        
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm transform transition-all scale-100">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Audit Saved!</h3>
              <p className="mt-2 text-sm text-gray-600">The audit data has been successfully recorded in the history tab.</p>
              <button onClick={() => setShowSuccessModal(false)} className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md">OK</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default AuditPortal;