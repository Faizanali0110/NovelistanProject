import React from 'react';
import { Link } from 'react-router-dom';
import { Book, PlusCircle, Library, Edit, Trash2 } from 'lucide-react';

const DashboardCard = ({ to, icon: Icon, title, description, color }) => (
  <Link 
    to={to} 
    className={`${color} p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center gap-4 group`}
  >
    <div className="p-4 bg-white bg-opacity-20 rounded-full">
      <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-white text-opacity-90 text-sm text-center">{description}</p>
  </Link>
);

const Dashboard = () => {
  const cards = [
    {
      to: "add-book",
      icon: PlusCircle,
      title: "Add New Book",
      description: "Add a new book to your library collection",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
    },
    {
      to: "view-books",
      icon: Library,
      title: "View Books",
      description: "Browse and search your entire collection",
      color: "bg-gradient-to-br from-yellow-600 to-yellow-800"
    },
    {
      to: "update-book",
      icon: Edit,
      title: "Update Book",
      description: "Modify details of existing books",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
    },
    {
      to: "delete-book",
      icon: Trash2,
      title: "Delete Book",
      description: "Remove books from your collection",
      color: "bg-gradient-to-br from-yellow-600 to-yellow-800"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDF5E6] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Book className="w-8 h-8 text-yellow-800" />
          <h2 className="text-3xl font-bold text-yellow-800">Author Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;