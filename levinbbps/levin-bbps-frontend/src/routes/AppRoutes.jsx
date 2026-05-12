import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"

import MobileRechargePage from "../pages/MobileRechargePage"

import DthRechargePage from "../pages/DthRechargePage"

import ElectricityBillPage from "../pages/ElectricityBillPage"

import LoanRepaymentPage from "../pages/LoanRepaymentPage"

import EducationFeesPage from "../pages/EducationFeesPage"

import BroadbandPage from "../pages/BroadbandPage"

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/mobile-recharge"
          element={<MobileRechargePage />}
        />

        <Route
          path="/dth-recharge"
          element={<DthRechargePage />}
        />

        <Route
          path="/electricity-bill"
          element={<ElectricityBillPage />}
        />

        <Route
          path="/loan-repayment"
          element={<LoanRepaymentPage />}
        />

        <Route
          path="/education-fees"
          element={<EducationFeesPage />}
        />

        <Route
          path="/broadband"
          element={<BroadbandPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}