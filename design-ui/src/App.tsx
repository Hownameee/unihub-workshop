import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { AuthModal } from "@/components/layout/AuthModal"

import { HomePage } from "@/pages/HomePage"
import { WorkshopDetailPage } from "@/pages/WorkshopDetailPage"
import { AuthCallbackPage } from "@/pages/AuthCallbackPage"
import { RegisterPage } from "@/pages/RegisterPage"
import { MyRegistrationsPage } from "@/pages/MyRegistrationsPage"
import { TicketPage } from "@/pages/TicketPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage"
import { AdminWorkshopsPage } from "@/pages/admin/AdminWorkshopsPage"
import { AdminWorkshopFormPage } from "@/pages/admin/AdminWorkshopFormPage"
import { AdminWorkshopStatsPage } from "@/pages/admin/AdminWorkshopStatsPage"
import { CheckinPage } from "@/pages/CheckinPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { ErrorPage } from "@/pages/ErrorPage"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
          <Route path="/workshops/:id/register" element={<RegisterPage />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>

        <Route path="/my-registrations/:id/ticket" element={<TicketPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/checkin" element={<CheckinPage />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/workshops" element={<AdminWorkshopsPage />} />
          <Route path="/admin/workshops/new" element={<AdminWorkshopFormPage />} />
          <Route path="/admin/workshops/:id/edit" element={<AdminWorkshopFormPage />} />
          <Route path="/admin/workshops/:id/stats" element={<AdminWorkshopStatsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AuthModal />
    </>
  )
}
