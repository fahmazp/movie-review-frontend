import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDownToDot, ArrowUpFromDot, FilmIcon, PartyPopper, StarIcon, UsersIcon } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const AdminDashboard = () => {

    const [stats, setStats] = useState([
      { id: 1, name: 'Total Users', stat: '0', icon: UsersIcon, change: '0', changeType: 'increase', path:'users'},
      { id: 2, name: 'Total Movies', stat: '0', icon: FilmIcon, change: '0', changeType: 'Decreased', path:'movies' },
      { id: 3, name: 'Total Reviews', stat: '0', icon: StarIcon, change: '0', changeType: 'increase', path:'reviews' },
    ]);
  
  const { isAdminAuth } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuth) {
      toast.error('Please login as admin!');
      navigate('/admin/login');
    } else {
      fetchStats();
    }
  }, [isAdminAuth]);

  const fetchStats = async () => {
    try {
      // TODO: Replace this with real API call later
      // const { data } = await axiosInstance.get('/admin/stats');
      // setStats([
      //   { id: 1, name: 'Total Users', stat: data.usersCount, icon: UsersIcon, change: '12', changeType: 'increase' },
      //   { id: 2, name: 'Total Movies', stat: data.moviesCount, icon: FilmIcon, change: '5', changeType: 'increase' },
      //   { id: 3, name: 'Total Reviews', stat: data.reviewsCount, icon: StarIcon, change: '18', changeType: 'increase' },
      // ]);

      setStats([
        { id: 1, name: 'Total Users', stat: '14', icon: UsersIcon, change: '10', changeType: 'increase', path:'users'},
        { id: 2, name: 'Total Movies', stat: '58', icon: FilmIcon, change: '4', changeType: 'Decreased', path:'movies' },
        { id: 3, name: 'Total Reviews', stat: '210', icon: StarIcon, change: '15', changeType: 'increase', path:'reviews'  },
      ]);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      toast.error('Failed to load dashboard stats.');
    }
  };


    return (
      <div className="mt-1">
        <h1 className="text-xl font-bold text-center italic">Welcome Admin 
          <PartyPopper className="w-5 h-5 inline-block ml-1.5" color="#F8B319"/>
        </h1>
        <p className="mt-2 text-gray-500 text-center">This is your dashboard overview.</p>
        {/* Later: add cards, charts, stats etc */}

        <dl className="mt-5 lg:md:ml-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-950 px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-full bg-amber-500 p-3">
                <item.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpFromDot aria-hidden="true" size={20} className="shrink-0 self-center text-green-500" />
                ) : (
                  <ArrowDownToDot aria-hidden="true" className="shrink-0 self-center text-red-500" />
                )}
                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-100 dark:bg-gray-900 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to={item.path} className="font-medium text-yellow-600 hover:text-indigo-500">
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>

      </div>
    );
  };
  