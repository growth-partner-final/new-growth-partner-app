import React from 'react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  icon?: string;
  isActive?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigateToHub?: () => void;
  onNavigateToDashboard?: () => void;
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items,
  onNavigateToHub,
  onNavigateToDashboard,
  className = ''
}) => {
  // Build the complete list with Home (and optional Dashboard) as root if not already specified
  const fullItems: BreadcrumbItem[] = [];

  if (onNavigateToHub && (items.length === 0 || items[0].label !== 'Home')) {
    fullItems.push({
      label: 'Home',
      onClick: onNavigateToHub,
      icon: 'home'
    });
  }

  if (
    onNavigateToDashboard &&
    items.length > 0 &&
    items[0].label !== 'Dashboard' &&
    items[0].label !== 'Partner Portal' &&
    !items.some(i => i.label === 'Dashboard')
  ) {
    fullItems.push({
      label: 'Dashboard',
      onClick: onNavigateToDashboard,
      icon: 'space_dashboard'
    });
  }

  items.forEach(item => fullItems.push(item));

  if (fullItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center flex-wrap gap-1 text-xs text-[#594047] py-2 px-1 ${className}`}
    >
      {fullItems.map((item, index) => {
        const isLast = index === fullItems.length - 1 || item.isActive;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <span className="material-symbols-outlined text-[13px] text-[#8e4767]/40 select-none mx-0.5">
                chevron_right
              </span>
            )}
            {isLast || !item.onClick ? (
              <span 
                className="font-bold text-[#1c1c19] flex items-center gap-1 bg-[#f0ede9]/90 px-2 py-0.5 rounded-md border border-[#e5e2dd]/60"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.icon && (
                  <span className="material-symbols-outlined text-[13px] text-[#b1005e]">
                    {item.icon}
                  </span>
                )}
                <span className="truncate max-w-[140px] sm:max-w-xs">{item.label}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                }}
                className="hover:text-[#b1005e] hover:bg-[#f0ede9] px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 font-medium cursor-pointer border border-transparent hover:border-[#e5e2dd]/60"
              >
                {item.icon && (
                  <span className="material-symbols-outlined text-[13px] text-[#594047]">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
