
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Download, Users, CheckCircle, 
  Clock, AlertTriangle, ChevronLeft, ChevronRight, RefreshCw, FileCheck,
  Code, Database, Terminal, Copy, Check, Share2
} from 'lucide-react';

interface PrototypeProps {
  onBack: () => void;
}

// Raw data provided
const RAW_DATA_JSON = {
  "file_name": "IP_Registration_Data_500_Rows",
  "sheets": [
    {
      "name": "Registration_Data",
      "rows": [
        ["IP_Code", "IP_Name", "Date_of_Registration", "Time", "Source", "DOB", "PAN_Number", "Is_Verified", "Is_Certified", "PAN_Status", "KYC_Status", "Date_of_Certification", "Referral_Code"],
        ["IP40000", "Rohit Kumar", "2025-12-01", "18:15:00", "Web", "1980-12-21", "DRHLF5721K", "No", "Yes", "Pending", "Under Review", "2025-12-28", "IRM16250"],
        ["IP40001", "Anjali Reddy", "2025-11-15", "12:43:00", "Direct", "1983-12-21", "RBWDQ3368F", "Yes", "Yes", "Under Review", "Approved", "2025-11-24", "IRM30389"],
        ["IP40002", "Swati Bhat", "2025-11-02", "22:36:00", "Mobile", "1998-12-17", "XFFGG5202R", "No", "Yes", "Under Review", "Pending", "2025-11-23", "IRM12002"],
        ["IP40003", "Sneha Menon", "2025-11-30", "20:35:00", "Referral", "1967-12-25", "MPIHC5427M", "Yes", "Yes", "Under Review", "Pending", "2025-12-07", "IRM66741"],
        ["IP40004", "Arjun Singh", "2025-11-08", "18:32:00", "API", "1970-12-24", "IRBOG9147N", "No", "Yes", "Rejected", "Under Review", "2025-12-06", "IRM98174"],
        ["IP40005", "Deepika Chopra", "2025-10-07", "08:00:00", "Web", "1968-12-24", "WSKTB3242I", "Yes", "Yes", "Rejected", "Approved", "2025-10-28", "IRM46584"],
        ["IP40006", "Arun Patel", "2025-11-02", "09:46:00", "Email", "1979-12-22", "ZUJSK2073D", "Yes", "Yes", "Pending", "Under Review", "2025-11-17", "IRM70507"],
        ["IP40007", "Divya Rao", "2025-11-09", "14:19:00", "Mobile", "1985-12-20", "JBZZJ5853T", "Yes", "Yes", "Pending", "Rejected", "2025-11-12", "IRM34785"],
        ["IP40008", "Harish Chopra", "2025-09-30", "16:06:00", "API", "1957-12-27", "NENAU2720F", "No", "No", "Approved", "Under Review", "", "IRM41190"],
        ["IP40009", "Divya Patel", "2025-12-03", "16:47:00", "API", "1973-12-23", "MUWPV5626U", "Yes", "No", "Approved", "Pending", "", "IRM21779"],
        ["IP40010", "Manoj Gupta", "2025-11-25", "11:28:00", "Web", "1988-12-18", "QVWXP7934L", "No", "Yes", "Under Review", "Approved", "2025-12-04", "IRM55123"],
        ["IP40011", "Priya Singh", "2025-10-20", "13:54:00", "Partner", "1975-12-26", "LMKJH2156B", "Yes", "Yes", "Pending", "Pending", "2025-11-08", "IRM87654"],
        ["IP40012", "Ashok Sharma", "2025-12-05", "10:22:00", "Agent", "1965-12-29", "NOPQR4321S", "No", "No", "Rejected", "Rejected", "", "IRM32109"],
        ["IP40013", "Nikita Verma", "2025-11-18", "15:45:00", "Email", "1992-12-14", "STUVW5678T", "Yes", "Yes", "Approved", "Approved", "2025-12-01", "IRM76543"],
        ["IP40014", "Rahul Mishra", "2025-10-30", "09:30:00", "Web", "1981-12-19", "UVWXY8901U", "No", "Yes", "Pending", "Under Review", "2025-11-25", "IRM23456"],
        ["IP40015", "Ananya Nair", "2025-11-12", "17:18:00", "Mobile", "1987-12-16", "VWXYZ2345V", "Yes", "No", "Under Review", "Approved", "", "IRM65432"],
        ["IP40016", "Sanjay Reddy", "2025-09-22", "12:40:00", "Referral", "1969-12-28", "WXYZA3456W", "Yes", "Yes", "Rejected", "Pending", "2025-10-15", "IRM09876"],
        ["IP40017", "Shreya Bhat", "2025-11-28", "14:25:00", "API", "1994-12-12", "XYZAB4567X", "No", "Yes", "Approved", "Pending", "2025-12-08", "IRM54321"],
        ["IP40018", "Nitin Jain", "2025-10-14", "11:06:00", "Web", "1966-12-30", "YZABC5678Y", "Yes", "Yes", "Pending", "Approved", "2025-11-02", "IRM98765"],
        ["IP40019", "Riya Patel", "2025-11-21", "19:52:00", "Direct", "1991-12-15", "ZABCD6789Z", "No", "No", "Rejected", "Rejected", "", "IRM12345"],
        ["IP40020", "Karan Kumar", "2025-12-02", "08:33:00", "Email", "1976-12-25", "ABCDE7890A", "Yes", "Yes", "Under Review", "Pending", "2025-12-10", "IRM67890"],
        ["IP40021", "Pia Singh", "2025-10-26", "16:11:00", "Mobile", "1989-12-17", "BCDEF0123B", "No", "Yes", "Approved", "Under Review", "2025-11-20", "IRM34567"],
        ["IP40022", "Amitabh Rao", "2025-11-03", "13:27:00", "Partner", "1978-12-24", "CDEFG1234C", "Yes", "No", "Pending", "Approved", "", "IRM89012"],
        ["IP40023", "Ishita Gupta", "2025-09-28", "10:49:00", "Web", "1984-12-21", "DEFGH2345D", "Yes", "Yes", "Rejected", "Rejected", "", "IRM45678"],
        ["IP40024", "Varun Chopra", "2025-11-16", "15:33:00", "API", "1972-12-27", "EFGHI3456E", "No", "Yes", "Under Review", "Pending", "2025-12-05", "IRM01234"],
        ["IP40025", "Neha Saxena", "2025-10-09", "12:15:00", "Referral", "1986-12-19", "FGHIJ4567F", "Yes", "Yes", "Approved", "Approved", "2025-10-31", "IRM56789"],
        ["IP40026", "Rajesh Verma", "2025-11-30", "18:42:00", "Web", "1968-12-28", "GHIJK5678G", "No", "No", "Pending", "Under Review", "", "IRM23456"],
        ["IP40027", "Pooja Desai", "2025-10-18", "11:20:00", "Email", "1990-12-13", "HIJKL6789H", "Yes", "Yes", "Rejected", "Pending", "2025-11-10", "IRM78901"],
        ["IP40028", "Divyanshu Iyer", "2025-11-07", "14:47:00", "Mobile", "1974-12-26", "IJKLM7890I", "Yes", "No", "Under Review", "Approved", "", "IRM34567"],
        ["IP40029", "Samantha Menon", "2025-12-04", "09:58:00", "API", "1982-12-20", "JKLMN8901J", "No", "Yes", "Approved", "Rejected", "2025-12-09", "IRM89012"],
        ["IP40030", "Vikram Krishnan", "2025-10-31", "16:36:00", "Direct", "1977-12-23", "KLMNO9012K", "Yes", "Yes", "Pending", "Pending", "2025-11-28", "IRM45678"],
        ["IP40031", "Ritika Agarwal", "2025-11-22", "13:04:00", "Web", "1993-12-11", "LMNOP0123L", "No", "Yes", "Rejected", "Under Review", "2025-12-07", "IRM90123"],
        ["IP40032", "Suresh Pillai", "2025-10-05", "10:31:00", "Partner", "1970-12-22", "MNOPQ1234M", "Yes", "No", "Under Review", "Approved", "", "IRM01234"],
        ["IP40033", "Swati Verma", "2025-11-14", "15:18:00", "Email", "1988-12-14", "NOPQR2345N", "Yes", "Yes", "Approved", "Pending", "2025-12-02", "IRM56789"],
        ["IP40034", "Ashish Rao", "2025-09-25", "12:42:00", "Mobile", "1979-12-21", "OPQRS3456O", "No", "Yes", "Pending", "Approved", "2025-10-22", "IRM12345"],
        ["IP40035", "Chia Kumar", "2025-11-19", "19:15:00", "API", "1965-12-28", "PQRST4567P", "Yes", "Yes", "Rejected", "Rejected", "", "IRM67890"],
        ["IP40036", "Jasmine Singh", "2025-10-28", "11:49:00", "Referral", "1995-12-10", "QRSTU5678Q", "No", "No", "Under Review", "Pending", "", "IRM23456"],
        ["IP40037", "Darius Chopra", "2025-11-09", "14:22:00", "Web", "1980-12-18", "RSTUV6789R", "Yes", "Yes", "Approved", "Approved", "2025-11-30", "IRM78901"],
        ["IP40038", "Amina Patel", "2025-10-17", "09:34:00", "Email", "1989-12-16", "STUVW7890S", "Yes", "No", "Pending", "Under Review", "", "IRM34567"],
        ["IP40039", "Rohan Gupta", "2025-11-23", "16:08:00", "Mobile", "1977-12-24", "TUVWX8901T", "No", "Yes", "Rejected", "Pending", "2025-12-06", "IRM89012"],
        ["IP40040", "Leela Nair", "2025-10-12", "12:57:00", "API", "1984-12-22", "UVWXY9012U", "Yes", "Yes", "Under Review", "Approved", "2025-11-05", "IRM45678"],
        ["IP40041", "Aryan Reddy", "2025-11-06", "18:31:00", "Direct", "1975-12-27", "VWXYZ0123V", "No", "No", "Approved", "Rejected", "", "IRM90123"],
        ["IP40042", "Hermione Mishra", "2025-11-27", "13:19:00", "Web", "1992-12-13", "WXYZА1234W", "Yes", "Yes", "Pending", "Pending", "2025-12-08", "IRM01234"],
        ["IP40043", "Chetan Verma", "2025-10-08", "11:42:00", "Partner", "1968-12-26", "XYZAB2345X", "Yes", "No", "Rejected", "Approved", "", "IRM56789"],
        ["IP40044", "Meha Saxena", "2025-11-15", "15:26:00", "Email", "1987-12-17", "YZABC3456Y", "No", "Yes", "Under Review", "Under Review", "2025-12-04", "IRM12345"],
        ["IP40045", "Pranav Bhat", "2025-09-30", "10:11:00", "Mobile", "1979-12-20", "ZABCD4567Z", "Yes", "Yes", "Approved", "Pending", "2025-10-28", "IRM67890"],
        ["IP40046", "Vidya Iyer", "2025-11-18", "14:39:00", "API", "1993-12-12", "ABCDE5678A", "No", "Yes", "Pending", "Approved", "2025-12-03", "IRM23456"],
        ["IP40047", "Siddharth Kumar", "2025-10-24", "09:15:00", "Referral", "1981-12-19", "BCDEF6789B", "Yes", "No", "Rejected", "Rejected", "", "IRM78901"],
        ["IP40048", "Navya Pillai", "2025-11-11", "16:52:00", "Web", "1986-12-18", "CDEFG7890C", "Yes", "Yes", "Under Review", "Pending", "2025-12-01", "IRM34567"],
        ["IP40049", "Chirag Singh", "2025-10-03", "13:28:00", "Email", "1974-12-25", "DEFGH8901D", "No", "Yes", "Approved", "Approved", "2025-10-30", "IRM89012"],
        ["IP40050", "Diya Chopra", "2025-11-20", "11:47:00", "Mobile", "1990-12-14", "EFGHI9012E", "Yes", "Yes", "Pending", "Under Review", "2025-12-05", "IRM45678"]
      ]
    }
  ]
};

// Types based on the dataset
type IpRecord = {
  IP_Code: string;
  IP_Name: string;
  Date_of_Registration: string;
  Time: string;
  Source: string;
  DOB: string;
  PAN_Number: string;
  Is_Verified: string;
  Is_Certified: string;
  PAN_Status: string;
  KYC_Status: string;
  Date_of_Certification: string;
  Referral_Code: string;
};

const ITEMS_PER_PAGE = 15;

const StatusPill = ({ status, type }: { status: string, type: 'verified' | 'kyc' | 'pan' }) => {
  let colorClass = 'bg-gray-100 text-gray-800';
  const s = status?.toLowerCase() || '';

  if (s === 'yes' || s === 'approved') {
    colorClass = 'bg-green-100 text-green-800';
  } else if (s === 'no' || s === 'rejected') {
    colorClass = 'bg-red-100 text-red-800';
  } else if (s === 'pending' || s === 'under review') {
    colorClass = 'bg-yellow-100 text-yellow-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

// Simulated API Service
const IpApiService = {
  // Simulates a GET request like: GET /api/ip/:code
  getIpByCode: async (code: string): Promise<IpRecord | null> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const sheet = RAW_DATA_JSON.sheets[0];
        const headers = sheet.rows[0];
        // Clean input
        const cleanCode = code.trim().toUpperCase();
        
        // Find record
        const foundRow = sheet.rows.slice(1).find(row => 
          (row[0] || '').toUpperCase() === cleanCode
        );
        
        if (foundRow) {
           const record: any = {};
           headers.forEach((header, index) => {
             record[header] = foundRow[index] || '';
           });
           resolve(record as IpRecord);
        } else {
           resolve(null);
        }
      }, 800); 
    });
  }
};

const IpDataDashboard: React.FC<PrototypeProps> = ({ onBack }) => {
  const [currentTab, setCurrentTab] = useState<'registry' | 'lookup'>('registry');
  
  // Registry State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterKYC, setFilterKYC] = useState('All');
  const [filterVerified, setFilterVerified] = useState('All');

  // API Lookup State
  const [lookupIpCode, setLookupIpCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<IpRecord | null | 'not_found'>(null);
  
  // Developer Tools State
  const [activeRightTab, setActiveRightTab] = useState<'response' | 'snippets'>('response');
  const [snippetLang, setSnippetLang] = useState<'curl' | 'node' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  // Parse raw JSON into usable object array
  const ipData: IpRecord[] = useMemo(() => {
    const sheet = RAW_DATA_JSON.sheets[0];
    const headers = sheet.rows[0];
    const dataRows = sheet.rows.slice(1);

    return dataRows.map((row) => {
      const record: any = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || '';
      });
      return record as IpRecord;
    });
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return ipData.filter(item => {
      const matchesSearch = 
        item.IP_Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.IP_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.PAN_Number.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesKYC = filterKYC === 'All' || item.KYC_Status === filterKYC;
      const matchesVerified = filterVerified === 'All' || item.Is_Verified === filterVerified;

      return matchesSearch && matchesKYC && matchesVerified;
    });
  }, [ipData, searchTerm, filterKYC, filterVerified]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: ipData.length,
      verified: ipData.filter(i => i.Is_Verified === 'Yes').length,
      kycApproved: ipData.filter(i => i.KYC_Status === 'Approved').length,
      pending: ipData.filter(i => i.KYC_Status === 'Pending' || i.KYC_Status === 'Under Review').length
    };
  }, [ipData]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLookup = async () => {
    if (!lookupIpCode) return;
    setLookupLoading(true);
    setLookupResult(null);
    setActiveRightTab('response');
    
    try {
      const result = await IpApiService.getIpByCode(lookupIpCode);
      setLookupResult(result || 'not_found');
    } catch (e) {
      console.error(e);
      setLookupResult('not_found');
    } finally {
      setLookupLoading(false);
    }
  };

  const generateSnippet = (lang: 'curl' | 'node' | 'python', code: string) => {
    const targetCode = code || ':ip_code';
    const baseUrl = 'https://api.insurepro.demo/v1/ip';
    
    if (lang === 'curl') {
      return `curl -X GET "${baseUrl}/${targetCode}" \\
  -H "Authorization: Bearer <your_api_token>" \\
  -H "Accept: application/json"`;
    }
    if (lang === 'node') {
      return `const fetch = require('node-fetch');

const url = '${baseUrl}/${targetCode}';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer <your_api_token>'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`;
    }
    if (lang === 'python') {
      return `import requests

url = "${baseUrl}/${targetCode}"

headers = {
    "Accept": "application/json",
    "Authorization": "Bearer <your_api_token>"
}

response = requests.get(url, headers=headers)

print(response.json())`;
    }
    return '';
  };

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onBack} 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="Back to Showcase"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">IP Registration Registry</h1>
            <p className="text-gray-500 text-sm">Centralized database of Insurance Point of Sales Persons</p>
          </div>
        </div>
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
          <button 
            onClick={() => setCurrentTab('registry')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentTab === 'registry' ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Database className="inline-block w-4 h-4 mr-2" />
            Registry
          </button>
          <button 
            onClick={() => setCurrentTab('lookup')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentTab === 'lookup' ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Terminal className="inline-block w-4 h-4 mr-2" />
            API Lookup
          </button>
        </div>
      </div>

      {currentTab === 'registry' ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total IPs Registered" value={stats.total} icon={Users} color="bg-blue-500" />
            <StatCard title="Verified IPs" value={stats.verified} icon={CheckCircle} color="bg-green-500" />
            <StatCard title="KYC Approved" value={stats.kycApproved} icon={FileCheck} color="bg-indigo-500" />
            <StatCard title="Pending Review" value={stats.pending} icon={Clock} color="bg-yellow-500" />
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search by Name, IP Code or PAN..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold">KYC:</span>
                  <select 
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    value={filterKYC}
                    onChange={(e) => { setFilterKYC(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>
                <div className="relative w-full md:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold">Verified:</span>
                  <select 
                    className="w-full pl-16 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    value={filterVerified}
                    onChange={(e) => { setFilterVerified(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3">IP Code</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Registration</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Verified</th>
                    <th className="px-6 py-3">Certified</th>
                    <th className="px-6 py-3">PAN Status</th>
                    <th className="px-6 py-3">KYC Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-blue-600">{row.IP_Code}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{row.IP_Name}</td>
                        <td className="px-6 py-4">
                          <div>{row.Date_of_Registration}</div>
                          <div className="text-xs text-gray-400">{row.Time}</div>
                        </td>
                        <td className="px-6 py-4">{row.Source}</td>
                        <td className="px-6 py-4">
                          <StatusPill status={row.Is_Verified} type="verified" />
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill status={row.Is_Certified} type="verified" />
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill status={row.PAN_Status} type="pan" />
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill status={row.KYC_Status} type="kyc" />
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">View Details</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="h-12 w-12 text-yellow-400 mb-2" />
                          <p className="text-lg font-medium">No records found</p>
                          <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> of <span className="font-semibold">{filteredData.length}</span> entries
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                    }
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium ${
                          currentPage === pageNum 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* API Lookup View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-fade-in">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-indigo-600" />
                API Request Simulator
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Simulate a GET request to retrieve individual IP data by unique IP Code. 
                Use this tool to verify data before integrating.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Code Parameter</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="e.g. IP40001" 
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      value={lookupIpCode}
                      onChange={(e) => setLookupIpCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                    />
                    <button 
                      onClick={handleLookup}
                      disabled={lookupLoading || !lookupIpCode}
                      className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {lookupLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2"/> : <Search className="h-4 w-4 mr-2" />}
                      Fetch Data
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Try codes like: IP40001, IP40025, IP40050</p>
                </div>
              </div>
              
              {/* Share API Feature */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                 <div className="text-sm text-gray-600">
                    Need to share this API with external partners?
                 </div>
                 <button 
                    onClick={() => setActiveRightTab('snippets')}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                 >
                    <Share2 className="w-4 h-4 mr-1.5" />
                    Get Integration Code
                 </button>
              </div>
            </div>

            {lookupResult && lookupResult !== 'not_found' && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-green-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4">IP Profile Summary</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Name</p>
                      <p className="font-bold text-gray-900">{lookupResult.IP_Name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Code</p>
                      <p className="font-mono text-sm text-gray-900">{lookupResult.IP_Code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Status</p>
                      <StatusPill status={lookupResult.Is_Verified} type="verified" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Registered</p>
                      <p className="text-sm text-gray-900">{lookupResult.Date_of_Registration}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-700 h-full min-h-[450px] flex flex-col">
              
              {/* Fake Browser/Postman Header */}
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex flex-col space-y-3">
                 {/* URL Bar */}
                 <div className="flex items-center bg-slate-900 rounded-md border border-slate-600 p-1">
                    <span className="text-green-400 font-bold px-2 text-xs">GET</span>
                    <input 
                       readOnly 
                       className="bg-transparent border-none text-slate-300 text-sm flex-1 focus:ring-0 px-2 font-mono outline-none"
                       value={`https://api.insurepro.demo/v1/ip/${lookupIpCode || ':ip_code'}`}
                    />
                    <button 
                       className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition"
                       title="Copy Endpoint"
                       onClick={() => handleCopySnippet(`https://api.insurepro.demo/v1/ip/${lookupIpCode || ':ip_code'}`)}
                    >
                       {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                    </button>
                 </div>
                 
                 {/* Tabs */}
                 <div className="flex space-x-4 text-xs font-medium text-slate-400">
                    <button 
                       onClick={() => setActiveRightTab('response')} 
                       className={`hover:text-white border-b-2 py-1 transition-colors ${activeRightTab === 'response' ? 'border-blue-500 text-white' : 'border-transparent'}`}
                    >
                       Response Body
                    </button>
                    <button 
                       onClick={() => setActiveRightTab('snippets')} 
                       className={`hover:text-white border-b-2 py-1 transition-colors ${activeRightTab === 'snippets' ? 'border-blue-500 text-white' : 'border-transparent'}`}
                    >
                       Integration Code
                    </button>
                 </div>
              </div>

              {/* Content Area */}
              <div className="p-4 overflow-auto flex-1 font-mono text-sm custom-scrollbar relative">
                 {activeRightTab === 'response' ? (
                    <>
                    {lookupLoading ? (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        <div className="flex flex-col items-center">
                          <RefreshCw className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                          <p>Processing Request...</p>
                        </div>
                      </div>
                    ) : lookupResult ? (
                      lookupResult === 'not_found' ? (
                        <div className="text-red-400">
                          <span className="text-purple-400">Error 404</span>: IP Record Not Found
                          <br/><br/>
                          {`{`}
                          <br/>
                          &nbsp;&nbsp;<span className="text-blue-300">"error"</span>: <span className="text-green-300">"Record not found"</span>,
                          <br/>
                          &nbsp;&nbsp;<span className="text-blue-300">"code"</span>: <span className="text-yellow-300">"{lookupIpCode}"</span>
                          <br/>
                          {`}`}
                        </div>
                      ) : (
                        <div className="text-slate-300">
                          <span className="text-green-400">HTTP 200 OK</span>
                          <br/><br/>
                          {`{`}
                          {Object.entries(lookupResult).map(([key, value]) => (
                            <div key={key}>
                              &nbsp;&nbsp;<span className="text-blue-300">"{key}"</span>: <span className="text-orange-300">"{value}"</span>,
                            </div>
                          ))}
                          {`}`}
                        </div>
                      )
                    ) : (
                      <div className="text-slate-500 text-center mt-20">
                        <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Waiting for request...</p>
                        <p className="text-xs mt-2">Enter an IP Code and click Fetch to see the JSON response.</p>
                      </div>
                    )}
                    </>
                 ) : (
                    /* Integration Code Snippets View */
                    <div className="h-full flex flex-col">
                       <div className="flex space-x-2 mb-4">
                          {['curl', 'node', 'python'].map(lang => (
                             <button
                                key={lang}
                                onClick={() => setSnippetLang(lang as any)}
                                className={`px-3 py-1 rounded text-xs uppercase font-semibold ${snippetLang === lang ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                             >
                                {lang}
                             </button>
                          ))}
                       </div>
                       
                       <div className="flex-1 relative group">
                          <div className="text-slate-300 whitespace-pre-wrap break-all">
                             {generateSnippet(snippetLang, lookupIpCode)}
                          </div>
                          <button 
                             onClick={() => handleCopySnippet(generateSnippet(snippetLang, lookupIpCode))}
                             className="absolute top-0 right-0 p-2 bg-slate-800 rounded text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                             title="Copy Code"
                          >
                             {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                          </button>
                       </div>
                       
                       <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                          <p>Share this snippet with external developers to integrate IP verification into their systems.</p>
                       </div>
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IpDataDashboard;
