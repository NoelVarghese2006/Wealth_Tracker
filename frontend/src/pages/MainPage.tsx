import Sidebar from "@/components/Sidebar";
import { useUserStore } from "@/store/user"

const MainPage = () => {
  const { mainUser } = useUserStore();

  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
        <Sidebar />
        <div className="flex h-screen w-screen text-center justify-center items-center">Hello {mainUser.username}</div>
    </div>
  )
}

export default MainPage