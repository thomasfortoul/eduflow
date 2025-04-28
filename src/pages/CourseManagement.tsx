import React, { useState } from 'react';
import { PlusCircle, Search, Filter, SlidersHorizontal, FileEdit, Trash2, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockCourses } from '../services/mockData';
import { Course } from '../types';
import CourseForm from '../components/courses/CourseForm';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
    setIsCreatingCourse(false);
  };
  
  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditingCourse(null);
  };
  
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        <Button 
          variant="primary" 
          leftIcon={<PlusCircle size={16} />}
          onClick={() => setIsCreatingCourse(true)}
        >
          Create Course
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          className="flex-1"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-4 w-4 text-gray-400" />}
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<SlidersHorizontal size={16} />}
          >
            Sort
          </Button>
        </div>
      </div>
      
      {/* Course list or edit/create form */}
      {isCreatingCourse ? (
        <CourseForm onSubmit={handleCreateCourse} onCancel={() => setIsCreatingCourse(false)} />
      ) : editingCourse ? (
        <CourseForm 
          course={editingCourse} 
          onSubmit={handleUpdateCourse} 
          onCancel={() => setEditingCourse(null)} 
        />
      ) : (
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{course.shortDescription}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.deliveryMethod}
                      </span>
                      <span className="text-xs text-gray-500">
                        Updated {new Date(course.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<Eye size={16} />}
                      className="text-gray-600"
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<FileEdit size={16} />}
                      className="text-blue-600"
                      onClick={() => setEditingCourse(course)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<Trash2 size={16} />}
                      className="text-red-600"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => setIsCreatingCourse(true)}
              >
                Create a new course
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;