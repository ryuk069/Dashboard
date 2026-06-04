import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Zap,
  House,
  MessageSquareDot,
  IdCard,
  GlobeLock,
  Database,
  ChartSpline,
  DoorClosedLocked,
  ChevronRight,
  CalendarCheck2,
  Files,
  MessageSquareText,
  Power,
} from "lucide-react";
import { useEffect, useState } from "react";

type SidebarProps = {
  sbc: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const menuItems = [
  {
    id: "dashboard",
    icon: House,
    label: "My Dashboard",
    path: "/dashboard",
  },
  {
    id: "Application",
    icon: MessageSquareDot,
    label: "Applications",
    submenu: [
      {
        id: "todo",
        label: "ToDo",
        path: "/dashboard/application/todo",
        parent: "Application",
      },
      {
        id: "weather",
        label: "Weather App",
        path: "/dashboard/application/weather",
        parent: "Application",
      },
      {
        id: "tourism",
        label: "Tourism",
        path: "/dashboard/application/tourism",
        parent: "Application",
      },
      {
        id: "calender",
        label: "Calender",
        path: "/dashboard/application/calender",
        parent: "Application",
      },
      {
        id: "chat",
        label: "Chat app",
        path: "/dashboard/application/chat-app",
        parent: "Application",
      },
      {
        id: "Blog",
        label: "Blogs",
        path: "/dashboard/application/blog",
        parent: "Application",
      },
      {
        id: "Social",
        label: "Social App",
        path: "/dashboard/application/social-app",
        parent: "Application",
      },
      {
        id: "File-Manager",
        label: "File Manager",
        path: "/dashboard/application/file-manager",
        parent: "Application",
      },
      {
        id: "Contact",
        label: "Contacts",
        path: "/dashboard/application/contact",
        parent: "Application",
      },
    ],
  },
  {
    id: "Account",
    icon: IdCard,
    label: "Account",
    submenu: [
      {
        id: "settings",
        label: "Settings",
        path: "/dashboard/account/settings",
        parent: "Account",
      },
      {
        id: "Invoice",
        label: "Invoice List",
        path: "/dashboard/account/invoice",
        parent: "Account",
      },
      {
        id: "create-invoice",
        label: "Create Invoice",
        path: "/dashboard/account/create-invoice",
        parent: "Account",
      },
      {
        id: "Billing",
        label: "Billings",
        path: "/dashboard/account/billing",
        parent: "Account",
      },
    ],
  },
  {
    id: "domain",
    icon: GlobeLock,
    label: "Domains",
    path: "/dashboard/domain",
  },
  {
    id: "Databases",
    icon: Database,
    label: "Databases",
    path: "/dashboard/databases",
  },
  {
    id: "Metrics",
    icon: ChartSpline,
    label: "Metric",
    path: "/dashboard/metric",
  },
  {
    id: "Security",
    icon: DoorClosedLocked,
    label: "Security",
    path: "/dashboard/security",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ sbc }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string[]>(["dashboard"]);
  const [activeSubMenu, setActiveSubMenu] = useState<{
    parent: string;
    child: string;
  }>({ parent: "", child: "" });
  const { location } = useRouterState();

  const pathname = location.pathname.toLocaleLowerCase();

  useEffect(() => {
    console.log(pathname);
    let matched = false;
    for (const item of menuItems) {
      if (item.path === pathname) {
        setActiveMenu([item.id]);
        setActiveSubMenu({ parent: "", child: "" });
        matched = true;
        break;
      }

      if (item.submenu) {
        const sub = item.submenu.find((s) => s.path === pathname);
        if (sub) {
          setActiveMenu([item.id]);
          setActiveSubMenu({ parent: item.id, child: sub.id });
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      setActiveMenu([]);
      setActiveSubMenu({ parent: "", child: "" });
    }
  }, [pathname]);

  function handleMenu(item: any) {
    console.log("test 1");

    if (activeMenu.includes(item.id)) {
      console.log("test 2");
      if (item?.submenu && activeSubMenu.parent == item.id) {
        console.log("test 3");
        setActiveMenu([]);
      } else {
        if (item?.submenu) {
          console.log("test 4");
          setActiveMenu((prev) => prev.filter((element) => element != item.id));
        }
        return;
      }
    } else {
      console.log("test 5");
      if (item?.submenu) {
        console.log("test 6");
        setActiveMenu((prev) => [...prev, item.id]);
      } else {
        console.log("test 7");
        if (item.icon) {
          console.log("test 8");
          setActiveMenu([item.id]);
          setActiveSubMenu({ parent: "", child: "" });
          navigate({ to: item.path });
        } else {
          console.log("test 9");
          setActiveSubMenu({ parent: item.parent, child: item.id });
          setActiveMenu([item.parent]);
          navigate({ to: item.path });
        }
      }
    }
  }

  return (
    <div
      className={`${
        sbc ? "w-20" : "w-60"
      } flex flex-col relative z-10 border-slate-200 transition-all duration-300 ease-in-out`}
    >
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-linear-to-r from-blue-600  to-purple-600">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!sbc && (
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-800 dark:text-white/80 text-nowrap">
                Ryuk's Server
              </h1>
              <p className="text-xs text-slate-500 dark:text-gray-300">Admin</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-clip">
        {menuItems.map((item) => {
          return (
            <div
              key={item.id}
              className={`w-full relative border-b-2 dark:border-slate-400`}
            >
              <button
                className={`${
                  activeMenu.includes(item.id) ||
                  activeSubMenu.parent == item.id
                    ? "text-[#0ad793]"
                    : "dark:text-white hover:text-[#0ad793]"
                } w-full flex items-center gap-2 p-3 cursor-pointer`}
                onClick={() => handleMenu(item)}
              >
                <div>
                  <item.icon className="" />
                </div>
                {!sbc && <div className={`text-nowrap`}>{item.label}</div>}
                {item.submenu && !sbc && (
                  <div
                    className={`${
                      activeMenu.includes(item.id) ? "rotate-90" : ""
                    } absolute right-2`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </button>

              {activeMenu.includes(item.id) && item?.submenu && (
                <div
                  className={`${
                    sbc ? "hidden" : ""
                  } flex flex-col justify-around pb-3`}
                >
                  {item.submenu.map((submenuitem) => {
                    return (
                      <div key={submenuitem.id} className="flex pl-5 relative ">
                        <div className="border border-[#0ad793]"></div>
                        <ul
                          className={` ${
                            activeSubMenu.child == submenuitem.id
                              ? "text-[#0ad793]"
                              : ""
                          } flex-1 cursor-pointer mb-2 relative left-[13.5px]`}
                          onClick={() => handleMenu(submenuitem)}
                        >
                          <li
                            className={` ${
                              activeSubMenu.child == submenuitem.id
                                ? "list-disc"
                                : "hover:list-disc"
                            }`}
                          >
                            <p className="hover:text-[#0ad793]">
                              {submenuitem.label}
                            </p>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-1 border-t border-slate-200/50">
        <div className="flex items-center justify-center p-2 rounded-2xl">
          <ul
            className={`${
              sbc ? "flex-col gap-5" : ""
            } flex flex-1  items-center justify-around overflow-x-hidden dark:text-white dark:border-2 p-2 rounded-lg`}
          >
            <li>
              <CalendarCheck2 className=" text-[#0ad793] hover:text-amber-300" />
            </li>
            <li>
              <Files />
            </li>
            <li>
              <MessageSquareText />
            </li>
            <li>
              <Power />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
