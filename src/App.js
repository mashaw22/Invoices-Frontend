import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Invoices from './user/pages/Invoices';
import NewInvoice from './invoices/pages/NewInvoice'
import EditInvoice from './invoices/pages/EditInvoice'
import ViewInvoice from './invoices/pages/ViewInvoice'
import Auth from './user/pages/Auth'
import { SubNavContext } from './shared/context/sub-nav-context';

const App = () => {
  const [isInvoicesListPage, setIsInvoicesListPage] = useState(false)

  const viewInvoiceNav = useCallback(() => {
    setIsInvoicesListPage(true)
  }, [])
  const viewOtherNav = useCallback(() => {
    setIsInvoicesListPage(false)
  }, [])

  return (
    <SubNavContext.Provider value={{
      isInvoicesListPage: isInvoicesListPage,
      viewInvoiceNav: viewInvoiceNav,
      viewOtherNav: viewOtherNav
    }}>
      <Router>
        <MainNavigation />
        <Switch>
          <Route exact path="/">
            <Invoices />
          </Route>

          <Route exact path="/:invoiceId/view">
            <ViewInvoice />
          </Route>

          <Route exact path="/invoices/new">
            <NewInvoice />
          </Route>

          <Route exact path="/:invoiceId/edit">
            <EditInvoice />
          </Route>

          <Route exact path="/auth">
            <Auth />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </SubNavContext.Provider>
  )
}

export default App;
