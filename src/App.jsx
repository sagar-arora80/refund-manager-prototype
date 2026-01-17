import React, { useState } from 'react';
import MobileContainer from './components/Layout/MobileContainer';
import TopTabs from './components/Layout/TopTabs';
import ConfigurationPage from './pages/ConfigurationPage';
import ActivityPage from './pages/ActivityPage';

function App() {
  const [activeTab, setActiveTab] = useState('config'); // 'config' or 'activity'

  return (
    <MobileContainer>
      <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ flex: 1 }}>
        {activeTab === 'config' && <ConfigurationPage />}
        {activeTab === 'activity' && <ActivityPage />}
      </main>
    </MobileContainer>
  );
}

export default App;
