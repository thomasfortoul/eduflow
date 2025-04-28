import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Student } from '../../types';
import { useToast } from '../../context/ToastContext';

interface StudentFormProps {
  student?: Student;
  onSubmit: (student: Student) => void;
  onCancel: () => void;
}

const DEFAULT_STUDENT: Student = {
  id: '',
  name: '',
  level: 'Undergraduate',
  prerequisites: [''],
  priorKnowledge: '',
  learningChallenges: ''
};

const StudentForm: React.FC<StudentFormProps> = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Student>(
    student || { ...DEFAULT_STUDENT, id: crypto.randomUUID() }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addToast } = useToast();
  
  const levelOptions = [
    { value: 'High School', label: 'High School' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handlePrerequisiteChange = (index: number, value: string) => {
    const newPrerequisites = [...formData.prerequisites];
    newPrerequisites[index] = value;
    setFormData({ ...formData, prerequisites: newPrerequisites });
  };
  
  const addPrerequisite = () => {
    setFormData({ ...formData, prerequisites: [...formData.prerequisites, ''] });
  };
  
  const removePrerequisite = (index: number) => {
    const newPrerequisites = [...formData.prerequisites];
    newPrerequisites.splice(index, 1);
    setFormData({ ...formData, prerequisites: newPrerequisites });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty prerequisites
      const filteredPrerequisites = formData.prerequisites.filter(prereq => prereq.trim());
      
      const updatedStudent: Student = {
        ...formData,
        prerequisites: filteredPrerequisites.length > 0 ? filteredPrerequisites : ['None']
      };
      
      onSubmit(updatedStudent);
      addToast({
        type: 'success',
        title: student ? 'Student Updated' : 'Student Added',
        message: `"${formData.name}" has been ${student ? 'updated' : 'added'} successfully.`
      });
    }
  };
  
  return (
    <Card title={student ? 'Edit Student Profile' : 'Add New Student Profile'} className="border-0 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Student Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            
            <Select
              label="Student Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={levelOptions}
              required
            />
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Prerequisites
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={addPrerequisite}
                  leftIcon={<Plus size={14} />}
                >
                  Add Prerequisite
                </Button>
              </div>
              
              <div className="space-y-2 mt-2">
                {formData.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      value={prerequisite}
                      onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                      placeholder={`Prerequisite ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePrerequisite(index)}
                      className="mt-1"
                      disabled={formData.prerequisites.length <= 1}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                ))}
                
                <p className="text-xs text-gray-500">
                  Add prerequisites in bullet-point format
                </p>
              </div>
            </div>
            
            <TextArea
              label="Expected Prior Knowledge"
              name="priorKnowledge"
              value={formData.priorKnowledge}
              onChange={handleChange}
              helperText="Describe what knowledge the student already has"
              rows={3}
            />
            
            <TextArea
              label="Known Learning Challenges"
              name="learningChallenges"
              value={formData.learningChallenges}
              onChange={handleChange}
              helperText="Describe any learning challenges or accommodations needed"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default StudentForm;