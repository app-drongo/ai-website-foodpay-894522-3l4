'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Clock, Shield, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Your Favorite Food, One Tap Away',
  subtitle:
    'Discover thousands of restaurants, order instantly, and pay seamlessly - all in one powerful app. No more juggling multiple apps or wallets.',
  description:
    'FoodPay combines the best food delivery experience with secure, lightning-fast payments. From local favorites to trending cuisines, get everything delivered hot and fresh to your doorstep.',
  primaryCtaText: 'Download App',
  primaryCtaHref: '/download',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
  heroImageAlt: 'Delicious food delivery spread',
  appBadge: 'New App',
  rating: '4.9',
  totalOrders: '2M+',
  deliveryTime: '25 min',
  features: ['Lightning-fast delivery', 'Secure payments', 'Real-time tracking'],
  trustIndicators: [
    { icon: 'Shield', text: 'Secure Payments' },
    { icon: 'Clock', text: 'Fast Delivery' },
    { icon: 'Star', text: 'Top Rated' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="h-5 w-5" />;
      case 'Clock':
        return <Clock className="h-5 w-5" />;
      case 'Star':
        return <Star className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <span data-editable="appBadge">{config.appBadge}</span>
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span data-editable="rating">{config.rating}</span>
                <span>•</span>
                <span data-editable="totalOrders">{config.totalOrders}</span>
                <span>orders</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span data-editable={`features[${idx}]`} className="text-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              {config.trustIndicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="text-primary">{renderIcon(indicator.icon)}</div>
                  <span data-editable={`trustIndicators[${idx}].text`}>{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Card className="bg-card border-border overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Overlay Stats */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <Card className="bg-background/95 backdrop-blur-sm border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              <span data-editable="deliveryTime">{config.deliveryTime}</span>
                              <span className="text-muted-foreground ml-1">avg delivery</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium" data-editable="rating">
                              {config.rating}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-bounce">
              <Smartphone className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
