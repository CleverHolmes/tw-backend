import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/RoutesWrapper/ProtectedRoute"
import PublicOnlyRoute from "./components/RoutesWrapper/PublicOnlyRoute"
import Clients from "./pages/company/clients/Index"
import KeyList from "./pages/company/clients/KeyList"
import PetList from "./pages/company/clients/PetList"
import VetList from "./pages/company/clients/VetList"
import Home from "./pages/company/Home"
import Logout from "./pages/company/Logout"
import Onboarding from "./pages/company/Onboarding"
import Signin from "./pages/company/Signin"
import Signup from "./pages/company/Signup"
import Invoicing from "./pages/company/Invoicing"
import Services from "./pages/company/services"
import AddService from "./pages/company/services/AddService"
import Packages from "./pages/company/services/packages"
import AddPackage from "./pages/company/services/packages/AddPackage"
import NoPage from "./pages/NoPage"
import Terms from "./pages/Terms"
import "bootstrap/dist/css/bootstrap.min.css"
import ClientsDetail from "./pages/company/clients/clientdetail"
import Create from "./pages/company/clients/create"
import Staff from "./pages/company/staff"
import Index from "./pages/company/staff/detail";
import ChatPage from "./pages/company/messages/Chat"
import Settings from "./pages/company/settings"

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<NoPage />} />

                <Route path="company">
                    <Route path="signup">
                        <Route index element={<PublicOnlyRoute Page={Signup} />} />
                        <Route path="onboarding" element={<Onboarding />} />
                    </Route>
                    <Route path="signin">
                        <Route index element={<PublicOnlyRoute Page={Signin} />} />
                    </Route>

                    <Route index element={<ProtectedRoute Page={Home} />} />

                    <Route path="clients">
                        <Route index element={<ProtectedRoute Page={Clients} />} />
                        <Route
                            path="new-client"
                            element={<ProtectedRoute Page={Create} />}
                        />
                        <Route
                            path="client-details/:clientId"
                            element={<ProtectedRoute Page={ClientsDetail} />}
                        />
                        <Route
                            path="pet-list"
                            element={<ProtectedRoute Page={PetList} />}
                        />
                        <Route
                            path="vet-list"
                            element={<ProtectedRoute Page={VetList} />}
                        />
                        <Route
                            path="key-list"
                            element={<ProtectedRoute Page={KeyList} />}
                        />
                    </Route>
                    <Route path="invoicing" element={<ProtectedRoute Page={Invoicing} />} />

                    <Route path="services">
                        <Route index element={<ProtectedRoute Page={Services} />} />
                        <Route path="add-service">
                            <Route index element={<ProtectedRoute Page={AddService} />} />
                            <Route path=":id" element={<ProtectedRoute Page={AddService} />} />
                        </Route>
                        <Route path="packages">
                            <Route index element={<ProtectedRoute Page={Packages} />} />

                            <Route path="add-package">
                                <Route index element={<ProtectedRoute Page={AddPackage} />} />
                                <Route path=":id" element={<ProtectedRoute Page={AddPackage} />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="staff">
                        <Route index element={<ProtectedRoute Page={Staff} />} />
                        <Route path=":id" element={<ProtectedRoute Page={Index} />} />
                    </Route>

                    <Route path="message">
                        <Route index element={<ProtectedRoute Page={ChatPage} />} />
                    </Route>

                    <Route path="settings" >
                        <Route index element={<ProtectedRoute Page={Settings} />} />
                    </Route>
                </Route>

                <Route path="logout" element={<ProtectedRoute Page={Logout} />} />
                <Route path="terms-and-conditions" element={<Terms />} />

                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    )
}

export default App
