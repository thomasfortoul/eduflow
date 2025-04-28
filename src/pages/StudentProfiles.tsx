import React, { useState } from 'react';
import { PlusCircle, Search, Filter, FileEdit, Trash2, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockStudents } from '../services/mockData';
import { Student } from '../types';
import StudentForm from '../components/students/StudentForm';

const StudentProfiles: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const filteredStudents = students.filter((student) => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
    setIsCreatingStudent(false);
  };
  
  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };
  
  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student profile?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };
  
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'High School':
        return 'bg-blue-100 text-blue-800';
      case 'Undergraduate':
        return 'bg-purple-100 text-purple-800';
      case 'Graduate':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Profiles</h1>
        <Button 
          variant="primary" 
          leftIcon={<PlusCircle size={16} />}
          onClick={() => setIsCreatingStudent(true)}
        >
          Add Student
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          className="flex-1"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-4 w-4 text-gray-400" />}
        />
        
        <Button 
          variant="outline" 
          leftIcon={<Filter size={16} />}
        >
          Filter
        </Button>
      </div>
      
      {/* Student list or edit/create form */}
      {isCreatingStudent ? (
        <StudentForm onSubmit={handleCreateStudent} onCancel={() => setIsCreatingStudent(false)} />
      ) : editingStudent ? (
        <StudentForm 
          student={editingStudent} 
          onSubmit={handleUpdateStudent} 
          onCancel={() => setEditingStudent(null)} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Card key={student.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getLevelBadgeColor(student.level)}`}>
                        {student.level}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                      {student.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Prerequisites</h4>
                    <ul className="mt-1 space-y-1">
                      {student.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Prior Knowledge</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{student.priorKnowledge}</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<Eye size={14} />}
                      className="text-gray-600"
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<FileEdit size={14} />}
                      className="text-blue-600"
                      onClick={() => setEditingStudent(student)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<Trash2 size={14} />}
                      className="text-red-600"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No students found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or add a new student</p>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => setIsCreatingStudent(true)}
              >
                Add a new student
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfiles;