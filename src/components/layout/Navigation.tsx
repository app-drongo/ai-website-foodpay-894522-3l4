'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  X,
  ShoppingBag,
  CreditCard,
  Utensils,
  Star,
  Users,
  Award,
  ChefHat,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'FoodFlow',
  brandIcon: 'utensils',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText: 'Order Now',
  ctaHref: '/order',
  mobileMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
  aboutSection: {
    title: 'About FoodFlow',
    subtitle: 'Revolutionizing Your Dining Experience',
    description:
      'We believe that great food should come with great service. Our seamless ordering platform connects you with the best local restaurants, making every meal an extraordinary experience.',
    stats: [
      { icon: 'users', value: '50K+', label: 'Happy Customers' },
      { icon: 'chef-hat', value: '200+', label: 'Partner Restaurants' },
      { icon: 'award', value: '4.9', label: 'Average Rating' },
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
    imageAlt: 'Modern restaurant kitchen with chefs preparing food',
  },
  reviewsSection: {
    title: 'What Our Customers Say',
    subtitle: 'Real experiences from real food lovers',
    reviews: [
      {
        name: 'Sarah Johnson',
        role: 'Food Enthusiast',
        rating: 5,
        comment:
          'FoodFlow has completely changed how I order food. The interface is intuitive and the delivery is always on time!',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Mike Chen',
        role: 'Busy Professional',
        rating: 5,
        comment:
          'As someone who works long hours, FoodFlow is a lifesaver. Quick ordering, reliable delivery, and amazing food quality.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Emily Rodriguez',
        role: 'Family Mom',
        rating: 5,
        comment:
          'Perfect for family dinners! The variety of restaurants and easy payment system makes feeding everyone so much easier.',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
    ],
  },
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

  const renderIcon = (iconName: string, className = 'h-6 w-6') => {
    switch (iconName) {
      case 'shopping-bag':
        return <ShoppingBag className={className} />;
      case 'credit-card':
        return <CreditCard className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'chef-hat':
        return <ChefHat className={className} />;
      case 'award':
        return <Award className={className} />;
      default:
        return <Utensils className={className} />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <>
      {/* Navigation Header */}
      <section id="navigation">
        <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Brand */}
              <div className="flex items-center space-x-2">
                <div className="text-primary">{renderIcon(config.brandIcon)}</div>
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
                      <div className="flex items-center justify-between pb-6 border-b border-border">
                        <div className="flex items-center space-x-2">
                          <div className="text-primary">{renderIcon(config.brandIcon)}</div>
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

      {/* About Section */}
      <section id="about" className="bg-background text-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                  <span data-editable="aboutSection.title">{config.aboutSection.title}</span>
                </h2>
                <h3 className="text-xl sm:text-2xl text-primary font-semibold">
                  <span data-editable="aboutSection.subtitle">{config.aboutSection.subtitle}</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span data-editable="aboutSection.description">
                    {config.aboutSection.description}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {config.aboutSection.stats.map((stat, idx) => (
                  <div key={idx} className="text-center space-y-2">
                    <div className="flex justify-center text-primary">
                      {renderIcon(stat.icon, 'h-8 w-8')}
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      <span data-editable={`aboutSection.stats[${idx}].value`}>{stat.value}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`aboutSection.stats[${idx}].label`}>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={config.aboutSection.imageUrl}
                  alt={config.aboutSection.imageAlt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-[400px] sm:h-[500px]"
                  data-editable-src="aboutSection.imageUrl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-muted text-muted-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              <span data-editable="reviewsSection.title">{config.reviewsSection.title}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="reviewsSection.subtitle">{config.reviewsSection.subtitle}</span>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {config.reviewsSection.reviews.map((review, idx) => (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>

                  <blockquote className="text-foreground leading-relaxed">
                    "
                    <span data-editable={`reviewsSection.reviews[${idx}].comment`}>
                      {review.comment}
                    </span>
                    "
                  </blockquote>

                  <div className="flex items-center space-x-3 pt-4 border-t border-border">
                    <Image
                      src={review.avatar}
                      alt={`${review.name} avatar`}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      data-editable-src={`reviewsSection.reviews[${idx}].avatar`}
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        <span data-editable={`reviewsSection.reviews[${idx}].name`}>
                          {review.name}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span data-editable={`reviewsSection.reviews[${idx}].role`}>
                          {review.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
