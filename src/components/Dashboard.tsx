import Sidebar from './Sidebar';
import Editor from './Editor';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Editor />
      </main>
    </div>
  );
};

export default Dashboard;