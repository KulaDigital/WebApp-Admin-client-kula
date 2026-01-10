import ClientSidebar from "./clientSidebar";
import ClientHeder from "./clientHeder";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-full bg-light">
            <ClientSidebar />

            <div className="ml-[280px] min-h-screen flex flex-col">
                <ClientHeder />
                <main className="bg-[#F6F9FC]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;