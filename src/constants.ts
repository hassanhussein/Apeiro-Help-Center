export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  content?: string;
  type: 'faq' | 'kb';
}

export const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New to Apeiro? Learn the basics and set up your workspace.",
    icon: "Rocket",
    articleCount: 12,
    updatedAt: "2 days ago",
  },
  {
    id: "billing",
    title: "Billing & Claims",
    description: "Manage your subscription, invoices, and refund requests.",
    icon: "CreditCard",
    articleCount: 8,
    updatedAt: "Today",
  },
  {
    id: "service-issues",
    title: "Service Issues",
    description: "Troubleshoot common problems and check system status.",
    icon: "Activity",
    articleCount: 15,
    updatedAt: "5 days ago",
  },
  {
    id: "account",
    title: "Account & Access",
    description: "Recover your password and manage team permissions.",
    icon: "UserCircle",
    articleCount: 9,
    updatedAt: "1 week ago",
  },
];

export const POPULAR_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Setting up your Track & Trace dashboard",
    description: "Learn how to customize your monitoring view and set up automatic alerts.",
    category: "getting-started",
    readingTime: "4 min read",
    type: 'kb',
    content: `
      <h2>Introduction</h2>
      <p>The Track & Trace dashboard is your central hub for monitoring all active shipments and logistics flows. Setting it up correctly ensures you never miss a critical update.</p>
      
      <div class="tip-box">
        <strong>Pro Tip:</strong> You can save multiple dashboard views for different regions or product lines to quickly switch context.
      </div>

      <h2>Step 1: accessing your workspace</h2>
      <p>Log in to your Apeiro account and navigate to the "Dashboard" tab in the left sidebar. If this is your first time, you will be prompted to choose a template.</p>
      
      <h2>Step 2: Adding Widgets</h2>
      <p>Click the "Add Widget" button in the top right corner. You can choose from several types of monitoring tools:</p>
      <ul>
        <li><strong>Real-time Map:</strong> Visualizes all active shipments globally.</li>
        <li><strong>KPI Counter:</strong> Shows total shipments, delays, and completed deliveries.</li>
        <li><strong>Alert Feed:</strong> A chronological list of system-generated notifications.</li>
      </ul>

      <h2>Step 3: Setting Up Alerts</h2>
      <p>To ensure proactive monitoring, you should set up threshold-based alerts. Go to Settings > Notifications and define your parameters (e.g., alert me if a shipment is delayed by more than 4 hours).</p>

      <blockquote>
        "Correct dashboard configuration has been shown to reduce response times to logistics delays by up to 35%."
        <cite>— Apeiro Logistics Report 2024</cite>
      </blockquote>
    `
  },
  {
    id: "2",
    title: "How to file a shipping claim",
    description: "Step-by-step guide on submitting claims for delayed or damaged packages.",
    category: "billing",
    readingTime: "6 min read",
    type: 'kb',
  },
  {
    id: "3",
    title: "Managing team member roles",
    description: "Understand the different permission levels available in Apeiro.",
    category: "account",
    readingTime: "3 min read",
    type: 'faq',
  },
  {
    id: "4",
    title: "Connecting Apeiro to your API",
    description: "Technical documentation for integrating our real-time data platform.",
    category: "getting-started",
    readingTime: "12 min read",
    type: 'kb',
    content: `
      <h2>API Overview</h2>
      <p>The Apeiro API allows you to programmatically access shipment data, manage team roles, and trigger system notifications. We use standard RESTful patterns and JSON for all responses.</p>
      
      <h2>Authentication</h2>
      <p>All requests must include an <code>Authorization</code> header with your Bearer token. You can generate tokens in the <strong>Developer Settings</strong> section of your dashboard.</p>
      <pre><code>curl -X GET https://api.apeiro.digital/v1/shipments \\
  -H "Authorization: Bearer YOUR_TOKEN"</code></pre>
    `
  },
  {
    id: "5",
    title: "Exporting usage reports for Compliance",
    description: "Generate and download detailed logs in CSV or PDF format.",
    category: "billing",
    readingTime: "5 min read",
    type: 'kb',
    content: `
      <h2>Reporting Basics</h2>
      <p>Compliance reporting is essential for businesses operating in regulated logistics sectors. Apeiro provides built-in tools to export your entire history with one click.</p>
      
      <h2>Available Formats</h2>
      <ul>
        <li><strong>CSV:</strong> Best for deep analysis in Excel or SQL.</li>
        <li><strong>PDF:</strong> Ready for presentation and audit submission.</li>
        <li><strong>JSON:</strong> For developers needing to import data into other systems.</li>
      </ul>

      <h2>Step-by-Step Export</h2>
      <ol>
        <li>Navigate to <strong>Reports</strong> in the main sidebar.</li>
        <li>Select the date range you need (default is last 30 days).</li>
        <li>Choose your filters (Region, Carrier, or Status).</li>
        <li>Click <strong>Generate Report</strong>.</li>
      </ol>

      <div class="tip-box">
        <strong>Note:</strong> Reports with more than 50,000 rows may take up to 2 minutes to generate. You will receive an email when it's ready.
      </div>
    `
  },
];

export const ALL_ARTICLES: Article[] = [
  ...POPULAR_ARTICLES,
  {
    id: "6",
    title: "Resetting your password",
    description: "How to regain access to your account if you've forgotten your logout credentials.",
    category: "account",
    readingTime: "2 min read",
    type: 'faq',
  },
  {
    id: "7",
    title: "Understanding invoice cycles",
    description: "Details on when and how your subscription is billed every month.",
    category: "billing",
    readingTime: "4 min read",
    type: 'faq',
  },
  {
    id: "8",
    title: "Integrating with Slack notifications",
    description: "Receive real-time alerts directly in your team's Slack channels.",
    category: "getting-started",
    readingTime: "7 min read",
    type: 'kb',
  },
  {
    id: "9",
    title: "Change your billing email",
    description: "Update the primary email address used for invoice notifications.",
    category: "billing",
    readingTime: "2 min read",
    type: 'faq',
  },
  {
    id: "10",
    title: "Customizing map markers",
    description: "How to change the icons and colors used on your tracking map.",
    category: "getting-started",
    readingTime: "5 min read",
    type: 'faq',
  },
  {
    id: "11",
    title: "Track your shipments in real-time",
    description: "Instructions on how to use the search bar to find live shipment location.",
    category: "getting-started",
    readingTime: "3 min read",
    type: 'faq',
  },
  {
    id: "12",
    title: "Resolving billing issues",
    description: "Common solutions for payment failures or incorrect invoice amounts.",
    category: "billing",
    readingTime: "4 min read",
    type: 'faq',
  },
  {
    id: "13",
    title: "Advanced API Authentication",
    description: "How to use OAuth2 for secure backend-to-backend integrations.",
    category: "service-issues",
    readingTime: "15 min read",
    type: 'kb',
  },
  {
    id: "14",
    title: "Data Backup and Recovery",
    description: "Ensuring your logistics history is safe and restorable.",
    category: "account",
    readingTime: "8 min read",
    type: 'kb',
  },
  {
    id: "15",
    title: "Updating user profile pictures",
    description: "A quick guide to personalizing your support agent avatar.",
    category: "account",
    readingTime: "1 min read",
    type: 'faq',
  },
  {
    id: "16",
    title: "Bulk export of shipment data",
    description: "Detailed guide on using filters to export thousands of records.",
    category: "service-issues",
    readingTime: "10 min read",
    type: 'kb',
  },
  {
    id: "17",
    title: "Mobile app installation",
    description: "How to set up the Apeiro mobile app on iOS and Android.",
    category: "getting-started",
    readingTime: "3 min read",
    type: 'faq',
  },
  {
    id: "18",
    title: "Configuring webhooks",
    description: "Get pushed data for every shipment milestone.",
    category: "service-issues",
    readingTime: "12 min read",
    type: 'kb',
  },
  {
    id: "19",
    title: "Troubleshooting login errors",
    description: "Common error codes (401, 403) and how to fix them.",
    category: "account",
    readingTime: "4 min read",
    type: 'faq',
  },
  {
    id: "20",
    title: "Yearly vs Monthly Billing",
    description: "Choosing the right cost structure for your business scale.",
    category: "billing",
    readingTime: "5 min read",
    type: 'faq',
  },
  {
    id: "21",
    title: "Custom Domain setup",
    description: "Host your support portal on your own subdomain.",
    category: "getting-started",
    readingTime: "10 min read",
    type: 'kb',
  },
  {
    id: "22",
    title: "SLA Policy Overview",
    description: "Understanding our guaranteed response times and availability.",
    category: "service-issues",
    readingTime: "6 min read",
    type: 'kb',
  },
];
