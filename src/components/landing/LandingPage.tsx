import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'All-in-one workspace',
    description: 'Write, plan, and get organized in one place.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Simple and powerful',
    description: 'Focus on what matters most with a clean, distraction-free interface.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Customizable workflow',
    description: 'Build your perfect workflow with flexible tools.',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-black" />
              <span className="text-xl font-bold">Notion Clone</span>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <div className="relative pt-32 pb-16 sm:pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Your all-in-one workspace
              <br />
              <span className="text-blue-600">for better notes</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
              Simple, powerful, and beautiful. All your notes, tasks, and documents in one place.
            </p>
            <div className="mt-10">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Try Notion Clone free →
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80"
                alt="Notion Clone Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Beautiful and functional
                  </h3>
                  <p className="text-gray-200">
                    A clean, distraction-free interface that helps you focus on what matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="font-semibold">Notion Clone</span>
            </div>
            <p className="text-gray-500 text-sm">
              Built with ❤️ as a demo project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;