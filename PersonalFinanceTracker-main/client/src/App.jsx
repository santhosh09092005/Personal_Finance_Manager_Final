import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/authentication';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to='/' className="text-2xl font-bold">Dashboard</Link>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to='/auth' className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Sign In</Link>
            </SignedOut>
          </div>
        </nav>
      </header>

      <main className="py-6 px-4 container mx-auto">
        <FinancialRecordsProvider>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </FinancialRecordsProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
