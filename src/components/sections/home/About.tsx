'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Heart, Users, Clock, Award, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_ABOUT = {
  title: 'About Our Food Experience',
  subtitle: 'Bringing People Together Through Exceptional Food',
  description:
    "We're passionate about creating seamless dining experiences that connect food lovers with their favorite restaurants. Our platform makes ordering, paying, and enjoying great food effortless and delightful.",
  mission:
    'To revolutionize how people discover, order, and enjoy food by creating the most intuitive and reliable food delivery platform.',
  imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  imageAlt: 'Modern restaurant kitchen with chefs preparing fresh meals',
  stats: [
    { icon: 'Users', label: 'Happy Customers', value: '50K+' },
    { icon: 'ChefHat', label: 'Partner Restaurants', value: '500+' },
    { icon: 'Clock', label: 'Average Delivery', value: '25 min' },
  ],
  values: [
    {
      icon: 'Heart',
      title: 'Quality First',
      description:
        'We partner only with restaurants that meet our high standards for food quality and service.',
    },
    {
      icon: 'Utensils',
      title: 'Fresh & Fast',
      description:
        'Every meal is prepared fresh and delivered quickly to ensure the best dining experience.',
    },
    {
      icon: 'Award',
      title: 'Customer Focused',
      description: "Your satisfaction is our priority. We're here to make every order perfect.",
    },
  ],
  ctaText: 'Start Ordering',
  ctaHref: '/restaurants',
} as const;

type AboutProps = Partial<typeof DEFAULT_ABOUT>;

const iconMap = {
  Users,
  ChefHat,
  Clock,
  Heart,
  Utensils,
  Award,
};

export default function About(props: AboutProps) {
  const config = { ...DEFAULT_ABOUT, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="about" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center mb-16">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={config.imageUrl}
                alt={config.imageAlt}
                data-editable-src="imageUrl"
                width={600}
                height={400}
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span data-editable="mission">{config.mission}</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {config.stats.map((stat, idx) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <Card key={idx} className="bg-card text-card-foreground border-border">
                    <CardContent className="p-4 text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="font-bold text-lg">
                        <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={handleCTAClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-muted/50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">What We Stand For</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {config.values.map((value, idx) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap];
              return (
                <div key={idx} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">
                    <span data-editable={`values[${idx}].title`}>{value.title}</span>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`values[${idx}].description`}>{value.description}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
