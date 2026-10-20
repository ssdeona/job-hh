import { Tabs } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { CITIES } from '../../constants/cities';

export const CityTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const cityTabs = Object.entries(CITIES).map(([slug, label]) => ({
    value: slug,
    label: label,
  }));

  //
  const pathParts = location.pathname.split('/');
  const activeTab = pathParts[pathParts.length - 1] || 'moscow';

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    
    navigate({
      pathname: `/vacancies/${value}`,
      search: location.search, 
    });
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tabs.List>
        {cityTabs.map((city) => (
          <Tabs.Tab key={city.value} value={city.value}>
            {city.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};