import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header";
import TableCard from "@/components/shared/InvestorDashboard/TableCard";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";

// Fetcher function using the Fetch API
const fetcher = (url) => fetch(url).then(res => res.json());

function getOverviewData(data) {
  const totalRaised = data.reduce((total, cur) => {
    const business = cur.raise_campaign_id.business_id._id;
    const name = cur.raise_campaign_id.business_id.BusinessName;
    const amount = cur.amount;
    
    if (!total[business]) {
      total[business] = {
        name: name,
        totalRaised: 0,
        link: business,
        profile: cur.raise_campaign_id.business_id.profile,
        shared: cur.raise_campaign_id.shared_price,
        valuation: cur.raise_campaign_id.business_id.valuation,
      };
    }
    
    total[business].totalRaised += amount;
    return total;
  }, {});
  
  return Object.values(totalRaised);
}

function getPieChartData(data) {
  const totalRaised = data.reduce((total, cur) => {
    const business = cur.raise_campaign_id.business_id._id;
    const name = cur.raise_campaign_id.business_id.BusinessName;
    const amount = cur.amount;
    
    if (!total[business]) {
      total[business] = { business: name, raised: 0 };
    }
    
    total[business].raised += amount;
    return total;
  }, {});

  const chartData = Object.values(totalRaised);
  return chartData.map((item, index) => ({
    ...item,
    fill: `var(--color-chart${index % 5 + 1})`,
  }));
}

export default function Page({ params }) {
  const { id } = params;  // Extract business ID from params
  const { data: investment, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!investment) return <div>Loading...</div>;

  const overview = getOverviewData(investment.data);

  const data = investment.data.map((item, index) => [
    { value: new Date(item.created_at).toLocaleDateString(), type: "text" },
    { value: { src: item.raise_campaign_id.business_id.profile, text: item.raise_campaign_id.business_id.BusinessName }, type: "image" },
    { value: item.amount.toLocaleString(), type: "text" },
    { value: ((item.amount / item.raise_campaign_id.raised) * 100).toFixed(2).toLocaleString(), type: "text" },
    { value: (item.amount / item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type: "text" },
  ]);

  const headData = [
    { value: "Date", type: "text" },
    { value: "Business", type: "text" },
    { value: "Investment Money", type: "text" },
    { value: "Equity Stake", type: "text" },
    { value: "Shared receive", type: "text" },
  ];

  const pieChartdata = getPieChartData(investment.data);

  return (
    <div className="flex">
      <Sidenav />
      <div className="w-full">
        <Header title="Investment History" />
        <div className="ml-[6%] mt-10">
          <h1 className="font-bold text-3xl">Overview Investment</h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <div><OverviewChart chartData={pieChartdata} /></div>
            <div className='ml-5'>
              {overview.map((item, index) => (
                <InvestHistoryCard
                  key={index}
                  businessName={item.name}
                  businessImg={item.profile}
                  link={item.link}
                  valuation={item.valuation.toLocaleString()}
                  raised={item.totalRaised.toLocaleString()}
                  equityStake={((item.totalRaised / item.valuation) * 100).toFixed(2).toLocaleString()}
                  shared={(item.totalRaised / item.shared).toFixed(2).toLocaleString()}
                  className="relative py-2"
                />
              ))}
            </div>
          </div>
          
          <h1 className="font-bold mt-7 text-3xl">Invest History</h1>
          <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold' />
          
          <div className='mb-10'>
            {data.map((item, index) => (
              <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
