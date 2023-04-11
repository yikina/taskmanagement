import React from 'react';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import UnauthenticatedApp from 'unauthenticated-app';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageError } from 'components/Lib';



function App() {
  
  const{user}=useAuth();
  return (
    <ErrorBoundary fallbackRender={FullPageError}>
    <ConfigProvider
    theme={{
      token:{
        colorPrimary:'#0052cc',
        fontSize:16,

      }
    }}>
    <div className="App">
      {/* {user ? 
      <AuthenticatedApp/> : <UnauthenticatedApp/>} */}
      <AuthenticatedApp/>
    </div>
    </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
