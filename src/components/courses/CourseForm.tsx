import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Course } from '../../types';
import { useToast } from '../../context/ToastContext';

interface CourseFormProps {
  course?: Course;
  onSubmit: (course: Course) => void;
  onCancel: () => void;
}

const DEFAULT_COURSE: Course = {
  id: '',
  title: '',
  shortDescription: '',
  longDescription: '',
  objectives: [''],
  deliveryMethod: 'In-person',
  createdAt: '',
  updatedAt: ''
};

const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Course>(
    course || { ...DEFAULT_COURSE, id: crypto.randomUUID() }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addToast } = useToast();
  
  const deliveryOptions = [
    { value: 'In-person', label: 'In-person' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Fully Online', label: 'Fully Online' },
    { value: 'Synchronous', label: 'Synchronous' },
    { value: 'Asynchronous', label: 'Asynchronous' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData({ ...formData, objectives: newObjectives });
  };
  
  const addObjective = () => {
    if (formData.objectives.length < 5) {
      setFormData({ ...formData, objectives: [...formData.objectives, ''] });
    } else {
      addToast({
        type: 'warning',
        title: 'Maximum Objectives Reached',
        message: 'You can add up to 5 learning objectives.'
      });
    }
  };
  
  const removeObjective = (index: number) => {
    const newObjectives = [...formData.objectives];
    newObjectives.splice(index, 1);
    setFormData({ ...formData, objectives: newObjectives });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length > 150) {
      newErrors.shortDescription = 'Short description must be 150 characters or less';
    }
    
    if (!formData.longDescription.trim()) {
      newErrors.longDescription = 'Long description is required';
    } else if (formData.longDescription.length > 1000) {
      newErrors.longDescription = 'Long description must be 1000 characters or less';
    }
    
    const nonEmptyObjectives = formData.objectives.filter(obj => obj.trim());
    if (nonEmptyObjectives.length === 0) {
      newErrors.objectives = 'At least one learning objective is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty objectives
      const filteredObjectives = formData.objectives.filter(obj => obj.trim());
      
      const now = new Date().toISOString();
      const updatedCourse: Course = {
        ...formData,
        objectives: filteredObjectives,
        createdAt: course ? course.createdAt : now,
        updatedAt: now
      };
      
      onSubmit(updatedCourse);
      addToast({
        type: 'success',
        title: course ? 'Course Updated' : 'Course Created',
        message: `"${formData.title}" has been ${course ? 'updated' : 'created'} successfully.`
      });
    }
  };
  
  return (
    <Card title={course ? 'Edit Course' : 'Create New Course'} className="border-0 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Course Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
            
            <TextArea
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              error={errors.shortDescription}
              helperText="Brief overview of the course (max 150 characters)"
              maxLength={150}
              counter
              required
              rows={2}
            />
            
            <TextArea
              label="Long Description"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              error={errors.longDescription}
              helperText="Detailed information about the course (max 1000 characters)"
              maxLength={1000}
              counter
              required
              rows={4}
            />
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Primary Learning Objectives
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={addObjective}
                  leftIcon={<Plus size={14} />}
                  disabled={formData.objectives.length >= 5}
                >
                  Add Objective
                </Button>
              </div>
              
              {errors.objectives && (
                <p className="text-sm text-red-600">{errors.objectives}</p>
              )}
              
              <div className="space-y-2 mt-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      value={objective}
                      onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      placeholder={`Learning objective ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(index)}
                      className="mt-1"
                      disabled={formData.objectives.length <= 1}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                ))}
                
                <p className="text-xs text-gray-500">
                  Add up to 5 learning objectives in bullet-point format
                </p>
              </div>
            </div>
            
            <Select
              label="Course Delivery Method"
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleChange}
              options={deliveryOptions}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {course ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CourseForm;