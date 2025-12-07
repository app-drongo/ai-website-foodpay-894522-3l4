'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle: "Have questions about our food delivery service? We'd love to hear from you!",
  formTitle: 'Send us a Message',
  namePlaceholder: 'Your Name',
  emailPlaceholder: 'your@email.com',
  messagePlaceholder: 'Tell us how we can help you...',
  submitText: 'Send Message',
  contactInfo: [
    {
      icon: 'MapPin',
      label: 'Visit Us',
      value: '123 Food Street, Culinary District, FC 12345',
    },
    {
      icon: 'Phone',
      label: 'Call Us',
      value: '+1 (555) 123-FOOD',
    },
    {
      icon: 'Mail',
      label: 'Email Us',
      value: 'hello@fooddelivery.com',
    },
  ],
  hours: [
    { day: 'Monday - Friday', time: '9:00 AM - 10:00 PM' },
    { day: 'Saturday - Sunday', time: '10:00 AM - 11:00 PM' },
  ],
  successMessage: "Thank you! We'll get back to you within 24 hours.",
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="h-5 w-5" />;
      case 'Phone':
        return <Phone className="h-5 w-5" />;
      case 'Mail':
        return <Mail className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">
                <span data-editable="formTitle">{config.formTitle}</span>
              </h3>

              {isSubmitted ? (
                <div className="bg-accent text-accent-foreground p-6 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-3">
                      <Send className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-lg font-medium">
                    <span data-editable="successMessage">{config.successMessage}</span>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-form-id="6935b99e1e372c875e1553a0"
                >
                  <div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={config.namePlaceholder}
                      required
                      className="bg-background text-foreground border-border"
                      data-editable="namePlaceholder"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={config.emailPlaceholder}
                      required
                      className="bg-background text-foreground border-border"
                      data-editable="emailPlaceholder"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={config.messagePlaceholder}
                      required
                      rows={5}
                      className="bg-background text-foreground border-border resize-none"
                      data-editable="messagePlaceholder"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {config.contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="bg-primary text-primary-foreground rounded-full p-3 flex-shrink-0">
                    {getIcon(info.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      <span data-editable={`contactInfo[${idx}].label`}>{info.label}</span>
                    </h4>
                    <p>
                      <span data-editable={`contactInfo[${idx}].value`}>{info.value}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-secondary text-secondary-foreground rounded-full p-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-semibold">Business Hours</h4>
                </div>
                <div className="space-y-3">
                  {config.hours.map((schedule, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                    >
                      <span className="font-medium">
                        <span data-editable={`hours[${idx}].day`}>{schedule.day}</span>
                      </span>
                      <span className="text-muted-foreground">
                        <span data-editable={`hours[${idx}].time`}>{schedule.time}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
