import { Menu } from '@headlessui/react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useThemeStore } from '../store/theme';
import { cn } from '../lib/utils';

const themes = [
  { name: 'light', icon: <Sun className="w-4 h-4" /> },
  { name: 'dark', icon: <Moon className="w-4 h-4" /> },
  { name: 'nord', icon: <Palette className="w-4 h-4 text-[#88C0D0]" /> },
  { name: 'monokai', icon: <Palette className="w-4 h-4 text-[#FD971F]" /> },
] as const;

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
        {themes.find(t => t.name === theme)?.icon}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
        {themes.map((t) => (
          <Menu.Item key={t.name}>
            {({ active }) => (
              <button
                onClick={() => setTheme(t.name)}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-2 text-sm',
                  active && 'bg-gray-100 dark:bg-gray-700',
                  theme === t.name && 'text-blue-600 dark:text-blue-400'
                )}
              >
                {t.icon}
                <span className="capitalize">{t.name}</span>
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};