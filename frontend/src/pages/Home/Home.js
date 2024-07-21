import React, { useEffect } from 'react';
import { AllPage, HeroContainer } from './Styles';
import { useAuth } from '../../components/Auth';
import Cards from './Cards';

import sessionStoreCleaner from '../../components/sessionStoreCleaner';

const Home = () => {
  const authApi = useAuth();

  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
    if (localStorage.length > 0) {
      let myKey = localStorage.getItem('key');
      console.log(myKey);
      authApi.login('Michal', 'pssw');
    } else console.log('pusty localStorage');
  }, []);

  return (
    <>
      <AllPage>
        <HeroContainer>
          <Cards />
        </HeroContainer>
      </AllPage>
    </>
  );
};

export default Home;
