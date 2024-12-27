import { Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-4 items-center cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full  dark:bg-neutral-700 relative ">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950" />
          </div>
          <span className="dark:text-white mr-4">{user.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div >
  );
}
