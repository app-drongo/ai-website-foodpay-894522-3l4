'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_REVIEWS = {
  title: 'What Our Customers Say',
  subtitle: 'Join thousands of satisfied customers who love our seamless food ordering experience',
  ctaText: 'Read All Reviews',
  ctaHref: '/reviews',
  reviews: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Food Enthusiast',
      rating: 5,
      comment:
        'The ordering process is incredibly smooth! I love how I can customize my meals and track everything in real-time. The food always arrives hot and fresh.',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      imageAlt: 'Sarah Chen profile photo',
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Busy Professional',
      rating: 5,
      comment:
        'Perfect for my hectic schedule. The app remembers my preferences and makes reordering a breeze. Customer service is top-notch too!',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      imageAlt: 'Marcus Rodriguez profile photo',
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Family Mom',
      rating: 5,
      comment:
        'Feeding a family of five has never been easier. The variety of options and dietary filters help me find something everyone loves. Highly recommended!',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      imageAlt: 'Emily Watson profile photo',
    },
  ],
  stats: {
    totalReviews: '12,000+',
    averageRating: '4.9',
    happyCustomers: '50,000+',
  },
} as const;

type ReviewsProps = Partial<typeof DEFAULT_REVIEWS>;

export default function Reviews(props: ReviewsProps) {
  const config = { ...DEFAULT_REVIEWS, ...props };
  const navigate = useSmartNavigation();

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="bg-background text-foreground py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 lg:mb-16">
          <div className="text-center bg-card text-card-foreground p-6 rounded-lg border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              <span data-editable="stats.totalReviews">{config.stats.totalReviews}</span>
            </div>
            <div className="text-muted-foreground">Total Reviews</div>
          </div>
          <div className="text-center bg-card text-card-foreground p-6 rounded-lg border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              <span data-editable="stats.averageRating">{config.stats.averageRating}</span>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center bg-card text-card-foreground p-6 rounded-lg border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              <span data-editable="stats.happyCustomers">{config.stats.happyCustomers}</span>
            </div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {config.reviews.map((review, idx) => (
            <Card
              key={review.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary mb-4" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">{renderStars(review.rating)}</div>

                {/* Comment */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  <span data-editable={`reviews[${idx}].comment`}>"{review.comment}"</span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={review.imageUrl}
                      alt={review.imageAlt}
                      fill
                      className="object-cover"
                      data-editable-src={`reviews[${idx}].imageUrl`}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      <span data-editable={`reviews[${idx}].name`}>{review.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`reviews[${idx}].role`}>{review.role}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCtaClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
