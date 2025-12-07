'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, MapPin, Gift, Clock, Shield } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Everything You Need in One App',
  sectionSubtitle:
    'Stop switching between apps. FoodPay brings together food discovery, ordering, payment, and rewards in one seamless experience.',
  features: [
    {
      icon: 'Smartphone',
      title: 'Smart Food Discovery',
      description:
        'AI-powered recommendations based on your taste preferences, dietary restrictions, and mood.',
      badge: 'Personalized',
    },
    {
      icon: 'CreditCard',
      title: 'Instant Payment',
      description:
        'Secure one-tap payments with digital wallet integration and split bill features.',
      badge: 'Secure',
    },
    {
      icon: 'MapPin',
      title: 'Real-Time Tracking',
      description:
        'Track your order from kitchen to doorstep with live GPS updates and delivery notifications.',
      badge: 'Live Updates',
    },
    {
      icon: 'Gift',
      title: 'Rewards & Cashback',
      description:
        'Earn points on every order and unlock exclusive deals from your favorite restaurants.',
      badge: 'Earn More',
    },
    {
      icon: 'Clock',
      title: 'Schedule Orders',
      description:
        'Pre-order your meals for pickup or delivery at your preferred time, even days in advance.',
      badge: 'Plan Ahead',
    },
    {
      icon: 'Shield',
      title: 'Food Safety Guarantee',
      description:
        'Verified restaurants with hygiene ratings and contactless delivery options for peace of mind.',
      badge: 'Trusted',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const iconMap = {
      Smartphone,
      CreditCard,
      MapPin,
      Gift,
      Clock,
      Shield,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Smartphone;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to revolutionize your food experience?
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of food lovers who've already made the switch to our all-in-one
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge variant="outline" className="bg-background text-foreground border-border">
                🍕 50,000+ Restaurants
              </Badge>
              <Badge variant="outline" className="bg-background text-foreground border-border">
                ⚡ 15-min Average Delivery
              </Badge>
              <Badge variant="outline" className="bg-background text-foreground border-border">
                💰 Up to 20% Cashback
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
