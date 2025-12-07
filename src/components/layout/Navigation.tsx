'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingBag, CreditCard, Utensils } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'FoodFlow',
  brandIcon: 'utensils',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText: 'Order Now',
  ctaHref: '/order',
  mobileMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  const renderIcon = () => {
    switch (config.brandIcon) {
      case 'shopping-bag':
        return <ShoppingBag className="h-6 w-6" />;
      case 'credit-card':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <Utensils className="h-6 w-6" />;
    }
  };

  return (
    <section id="navigation">
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <div className="text-primary">{renderIcon()}</div>
              <span className="text-xl font-bold text-foreground" data-editable="brandName">
                {config.brandName}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex items-center space-x-6">
                {config.navItems.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium relative group"
                      data-editable-href={`navItems[${idx}].href`}
                      data-href={item.href}
                    >
                      <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                    </button>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleCtaClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground"
                    aria-label={config.mobileMenuLabel}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background text-foreground border-border w-80"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-border">
                      <div className="flex items-center space-x-2">
                        <div className="text-primary">{renderIcon()}</div>
                        <span
                          className="text-xl font-bold text-foreground"
                          data-editable="brandName"
                        >
                          {config.brandName}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-foreground hover:bg-accent hover:text-accent-foreground"
                        aria-label={config.closeMenuLabel}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 py-6">
                      <ul className="space-y-2">
                        {config.navItems.map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavClick(item.href)}
                              className="w-full text-left py-3 px-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                              data-editable-href={`navItems[${idx}].href`}
                              data-href={item.href}
                            >
                              <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile CTA */}
                    <div className="pt-6 border-t border-border">
                      <Button
                        onClick={handleCtaClick}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md"
                        data-editable-href="ctaHref"
                        data-href={config.ctaHref}
                      >
                        <span data-editable="ctaText">{config.ctaText}</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
