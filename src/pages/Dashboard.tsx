import React from 'react';
import { PlusCircle, TrendingUp, TrendingDown, ArrowRight, BookOpen, FileCheck, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockStats, mockActivities, mockCourses } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your courses today.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            leftIcon={<PlusCircle size={16} />}
          >
            Create Quiz
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<PlusCircle size={16} />}
          >
            New Course
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <Card key={index} className="border-0 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                
                {stat.change !== undefined && (
                  <div className="flex items-center mt-2">
                    {stat.change > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">+{stat.change} from last month</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-xs text-red-600">{stat.change} from last month</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Recent activity and quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent courses */}
        <Card title="Recent Courses" className="lg:col-span-1 border-0 shadow-sm">
          <div className="space-y-4">
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.deliveryMethod}</p>
                </div>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                  View
                </Button>
              </div>
            ))}
            
            <Button fullWidth variant="outline" className="mt-2">
              View All Courses
            </Button>
          </div>
        </Card>
        
        {/* Recent activity */}
        <Card title="Recent Activity" className="lg:col-span-2 border-0 shadow-sm">
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`
                  flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                  ${activity.type === 'course' ? 'bg-blue-100' : ''}
                  ${activity.type === 'quiz' ? 'bg-teal-100' : ''}
                  ${activity.type === 'student' ? 'bg-purple-100' : ''}
                  ${activity.type === 'system' ? 'bg-gray-100' : ''}
                `}>
                  {activity.type === 'course' && <BookOpen className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'quiz' && <FileCheck className="h-4 w-4 text-teal-600" />}
                  {activity.type === 'student' && <Users className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'system' && <span className="h-4 w-4 text-gray-600">⚙️</span>}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
            
            <Button fullWidth variant="outline" className="mt-2">
              View All Activities
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;