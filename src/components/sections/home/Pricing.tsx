'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_PRICING = {
  title: 'Choose Your Perfect Plan',
  subtitle: 'Flexible pricing for restaurants of all sizes',
  billingToggleText: 'Monthly',
  billingToggleAltText: 'Annual',
  plans: [
    {
      name: 'Starter',
      icon: 'star',
      price: '29',
      originalPrice: '39',
      period: 'month',
      description: 'Perfect for small cafes and food trucks',
      badge: '',
      features: [
        'Up to 100 orders/month',
        'Basic menu management',
        'Payment processing',
        'Email support',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Professional',
      icon: 'zap',
      price: '79',
      originalPrice: '99',
      period: 'month',
      description: 'Ideal for growing restaurants and chains',
      badge: 'Most Popular',
      features: [
        'Unlimited orders',
        'Advanced analytics',
        'Multi-location support',
        'Priority support',
        'Custom integrations',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: 'crown',
      price: '199',
      originalPrice: '249',
      period: 'month',
      description: 'Complete solution for large restaurant groups',
      badge: 'Best Value',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom development',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
  guaranteeText: '30-day money-back guarantee',
  supportText: 'No setup fees • Cancel anytime',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isAnnual, setIsAnnual] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'crown':
        return <Crown className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const handlePlanSelect = (href: string) => {
    const url = isAnnual ? `${href}&billing=annual` : href;
    navigate(url);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggleText">{config.billingToggleText}</span>
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggleAltText">{config.billingToggleAltText}</span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Save 20%
                </Badge>
              )}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary shadow-md scale-105 bg-card'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  <span data-editable={`plans[${idx}].badge`}>{plan.badge}</span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  >
                    {getIcon(plan.icon)}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>

                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-4xl font-bold">
                      $
                      <span data-editable={`plans[${idx}].price`}>
                        {isAnnual ? Math.round(parseInt(plan.price) * 0.8) : plan.price}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                    </span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-muted-foreground line-through">
                      $
                      <span data-editable={`plans[${idx}].originalPrice`}>
                        {plan.originalPrice}
                      </span>
                      /month
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            <span data-editable="guaranteeText">{config.guaranteeText}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            <span data-editable="supportText">{config.supportText}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
