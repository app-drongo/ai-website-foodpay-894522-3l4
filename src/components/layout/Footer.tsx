'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'FoodPay',
  description:
    'The ultimate food delivery and payment super app. Connecting food lovers with their favorite restaurants through seamless technology.',
  tagline: 'Order, Pay, Enjoy - All in One Seamless Food Experience',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],

  // Social Links
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com/foodpay', icon: 'facebook' },
    { platform: 'Twitter', href: 'https://twitter.com/foodpay', icon: 'twitter' },
    { platform: 'Instagram', href: 'https://instagram.com/foodpay', icon: 'instagram' },
  ],

  // Contact Info
  contactInfo: [
    { type: 'address', value: '123 Food Street, Delivery City, DC 12345', icon: 'mapPin' },
    { type: 'phone', value: '+1 (555) 123-FOOD', icon: 'phone' },
    { type: 'email', value: 'hello@foodpay.com', icon: 'mail' },
  ],

  copyright: '© 2024 FoodPay. All rights reserved.',

  // Newsletter
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest updates on new restaurants and exclusive offers.',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'mapPin':
        return <MapPin className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'mail':
        return <Mail className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              <span data-editable="companyName">{config.companyName}</span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              <span data-editable="description">{config.description}</span>
            </p>
            <p className="text-sm font-medium text-accent-foreground">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              {config.contactInfo.map((contact, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                  {renderIcon(contact.icon)}
                  <span data-editable={`contactInfo[${idx}].value`}>{contact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Follow us:</span>
            <div className="flex gap-3">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={social.platform}
                >
                  {renderIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
