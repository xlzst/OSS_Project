import React, { useState, useEffect } from 'react';
//import Header from './component/Header';
//import VIPTable from './component/VIPTable';
//import ModalForm from './component/ModalForm';
//import Footer from './component/Footer';

export const fetchCourses = async () => {
    try {
      const response = await fetch('https://675ae1579ce247eb1934ea3d.mockapi.io/course/');
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

export const handleAddOrEdit = async (course) => {
    try {
      const method = course.id ? 'PUT' : 'POST';
      const url = course.id
        ? `https://675ae1579ce247eb1934ea3d.mockapi.io/course/${course.id}`
        : 'https://675ae1579ce247eb1934ea3d.mockapi.io/course/';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

export const handleDelete = async (id) => {
    try {
      await fetch(`https://675ae1579ce247eb1934ea3d.mockapi.io/course/${id}`, { method: 'DELETE' });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

export default App;
